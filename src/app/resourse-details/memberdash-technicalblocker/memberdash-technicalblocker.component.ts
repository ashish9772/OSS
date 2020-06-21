import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TaskDetailsServiceService } from '../../project-details/task-details-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-memberdash-technicalblocker',
  templateUrl: './memberdash-technicalblocker.component.html',
  styleUrls: ['./memberdash-technicalblocker.component.scss']
})
export class MemberdashTechnicalblockerComponent implements OnInit {

  addTechnicalBlockerForm: FormGroup;
  clonedCars: { [s: string]: any; } = {};
  date = new Date();
  modalReference;
  getTechBlockerDetails: any = [];
  month = this.date.getUTCMonth() + 1;
  NoteMSG;
  proId = [];
  today = this.date.getUTCDate() + '/' + this.month + '/' + this.date.getUTCFullYear();
  // tslint:disable-next-line:max-line-length
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private taskService: TaskDetailsServiceService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.spinner.show();
    this.addTechnicalBlockerForm = new FormGroup({
      description: new FormControl('', Validators.required),
      analysis: new FormControl('', Validators.required),
      fixDetail: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      owner: new FormControl('', Validators.required),
      date: new FormControl(this.today, Validators.required),
      area: new FormControl('', Validators.required),
      technicalBlokerNotes: new FormControl('', Validators.required)
    });
    this.taskService.addMenberTechnicalBlockerFormData$.subscribe(data => {
      this.getTechBlockerDetails = data;
    });
    this.apiService.getValue(environment.api_url + 'project-util/projects-by-ein/' + localStorage.getItem('EINVALUE')).subscribe(data => {
      console.log('data', data);
      this.proId = Object.keys(data)
      console.log('iddd', this.proId[0])
      //this.newtaskcreate.controls['projectID'].setValue(this.proId[0])
      this.spinner.hide()
    },err=>{
      this.spinner.hide()
    })
  }
  onRowEditInit(rowdata: any) {
    this.clonedCars[rowdata.techinicalBlockerId] = { ...rowdata };
  }
  onRowEditSave(rowdata: any) {
    delete this.clonedCars[rowdata.techinicalBlockerId];
  }
  onRowEditCancel(rowdata: any, index: number) {
    this.getTechBlockerDetails[index] = this.clonedCars[rowdata.techinicalBlockerId];
    delete this.clonedCars[rowdata.techinicalBlockerId];
  }
  submitTechnicalBlocker() {
    this.spinner.show();
    this.NoteMSG = '';
    const data = {
      techinicalBlockerId: null,
      projectId: this.proId[0],
      createdBy: localStorage.getItem('EINVALUE'),
      description: this.addTechnicalBlockerForm.controls['description'].value,
      analysis: this.addTechnicalBlockerForm.controls['analysis'].value,
      createdDate: this.addTechnicalBlockerForm.controls['date'].value,
      fixedDetails: this.addTechnicalBlockerForm.controls['fixDetail'].value,
      status: this.addTechnicalBlockerForm.controls['status'].value,
      owner: this.addTechnicalBlockerForm.controls['owner'].value,
      area: this.addTechnicalBlockerForm.controls['area'].value,
      technicalBlokerNotes: this.addTechnicalBlockerForm.controls['technicalBlokerNotes'].value
    };
    this.apiService.postNote(environment.api_url + 'project-util/blocker', data).subscribe((res) => {
      this.apiService.getProjectId('//10.54.156.153:61001/oss/project-util/user-dashboard/' + localStorage.getItem('EINVALUE')).subscribe((res) => {
        this.taskService.addMenberTechnicalBlockerFormData.next(res['blockers']);
      }, err =>{
        this.spinner.hide();
      });
      console.log("response note data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      setTimeout(() => {
        this.NoteMSG = '';
        this.resetValue(['description', 'analysis', 'fixDetail', 'status', 'owner', 'area', 'technicalBlokerNotes'], this.addTechnicalBlockerForm)
        // this.addNoteForm.reset()
      }, 3000);
      this.spinner.hide();
    },err =>{
      this.spinner.hide();
    });

   
  }

  openCreateTask(content) {
    this.modalReference = this.modalService.open(content);
    // this.newtaskcreate.controls['projectID'].setValue(this.taskService.taskPrjectID);
  }
  updatetechBlockerDetails() {
    this.apiService.putMethod(environment.api_url + 'project-util/update-blocker', this.getTechBlockerDetails).subscribe(data => {
      alert('success');
    });
  }
  resetValue(value, formdata) {
    const exclude: string[] = value;
    Object.keys(formdata.controls).forEach(key => {
      if (exclude.findIndex(q => q === key) !== -1) {
        formdata.get(key).reset();
      }
    });
  }

}
