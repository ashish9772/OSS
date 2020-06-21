import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDetailsServiceService } from '../../project-details/task-details-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-memberdash-risk',
  templateUrl: './memberdash-risk.component.html',
  styleUrls: ['./memberdash-risk.component.scss']
})
export class MemberdashRiskComponent implements OnInit {

  addRiskForm;
  proId = [];
  NoteMSG;
  modalReference: any;
  getRiskDetails: any = [];
  clonedCars: { [s: string]: any; } = {};
  date = new Date();
  month = this.date.getUTCMonth() + 1;
  today = this.date.getUTCDate() + '/' + this.month + '/' + this.date.getUTCFullYear();
  // tslint:disable-next-line:max-line-length
  constructor(private taskService: TaskDetailsServiceService, private apiService: ApiService, config: NgbModalConfig, private modalService: NgbModal,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.addRiskForm = new FormGroup({      
      createdBy: new FormControl('', Validators.required),
      createdDate: new FormControl(this.today, Validators.required),
      notes: new FormControl('', Validators.required)
    });
    this.taskService.addMenberRiskFormData$.subscribe(data => {
      this.getRiskDetails = data;
    });
    this.apiService.getValue(environment.api_url + 'project-util/projects-by-ein/' + localStorage.getItem('EINVALUE')).subscribe(data => {
      console.log('data', data);
      this.proId = Object.keys(data)
      console.log('iddd', this.proId[0])
     // this.addRiskForm.controls['projectId'].setValue(this.proId[0])
      this.spinner.hide()
    },err=>{
      this.spinner.hide()
    })
  }
  onRowEditInit(rowdata: any) {
    this.clonedCars[rowdata.rsikID] = { ...rowdata };
  }
  onRowEditSave(rowdata: any) {
    delete this.clonedCars[rowdata.rsikID];
  }
  onRowEditCancel(rowdata: any, index: number) {
    this.getRiskDetails[index] = this.clonedCars[rowdata.rsikID];
    delete this.clonedCars[rowdata.rsikID];
  }
  submitAddRisk() {
    this.NoteMSG = '';
    const data = {
      projectId: this.proId[0],
      notes: this.addRiskForm.controls['notes'].value,
      createdBy: this.addRiskForm.controls['createdBy'].value,
      createdDate: this.addRiskForm.controls['createdDate'].value,
      status: 'New'
    };
    this.apiService.postRiskData(environment.api_url + 'project-util/risk', data).subscribe((res) => {
      this.spinner.show()
      this.apiService.getProjectId('//10.54.156.153:61001/oss/project-util/user-dashboard/' + localStorage.getItem('EINVALUE')).subscribe((res) => {
        this.taskService.addMenberRiskFormData.next(res['risks']);
        this.spinner.hide();
      },err=>{
        this.spinner.hide();
      });
      console.log("response Risk data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      setTimeout(() => {
        this.NoteMSG = '';
        this.resetValue(['createdBy', 'notes'], this.addRiskForm)
        // this.addNoteForm.reset()
      }, 3000);      
    },err =>{
      this.spinner.hide();
    });
    console.log('req body data : ', data);   
  }

  openCreateTask(content) {
    this.modalReference = this.modalService.open(content);
    // this.newtaskcreate.controls['projectID'].setValue(this.taskService.taskPrjectID);
  }

  resetValue(value, formdata) {
    const exclude: string[] = value;
    Object.keys(formdata.controls).forEach(key => {
      if (exclude.findIndex(q => q === key) !== -1) {
        formdata.get(key).reset();
      }
    });
  }
  upadteRiskDetails() {
    this.spinner.show();
    this.apiService.putMethod(environment.api_url + 'project-util/update-risk-details', this.getRiskDetails).subscribe(data => {
      alert('success');
      this.spinner.hide();
    }, err =>{
      this.spinner.hide();
    });
  }

}
