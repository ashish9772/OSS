import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskDetailsServiceService } from '../task-details-service.service';
import { ApiService } from '../../shared/api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.scss']
})
export class RiskComponent implements OnInit {
  taskProjectName: string;
  addRiskForm;
  NoteMSG;
  taskProjectID: any;
  modalReference: any;
  getRiskDetails: any = [];
  clonedCars: { [s: string]: any; } = {};
  date = new Date();
  month = this.date.getUTCMonth() + 1;
  today = this.date.getUTCDate() + '/' + this.month + '/' + this.date.getUTCFullYear();
  constructor(private taskService: TaskDetailsServiceService, private spinner: NgxSpinnerService, private apiService: ApiService, config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit() {
    this.spinner.show()
    this.addRiskForm = new FormGroup({
      createdDate: new FormControl(this.today, Validators.required),
      notes: new FormControl('', Validators.required)
    });
    this.taskService.riskObservable$.subscribe(data => {
      this.getRiskDetails = data;
    });

    this.taskService.taskPrjectI$.subscribe(data => {
      this.taskProjectID = data;
      console.log('dataTest', this.taskProjectID);
    });
    this.taskService.taskProjectName$.subscribe(data => {
      this.taskProjectName = data;
      console.log('risk project Name', this.taskProjectName);
    });
    this.spinner.hide()
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
    this.spinner.show()
    this.NoteMSG = '';
    const data = {
      projectId: this.taskProjectID,
      projectName : this.taskProjectName,
      notes: this.addRiskForm.controls['notes'].value,
      createdBy: localStorage.getItem('EINVALUE'),
      assignName: this.taskService.getNameByEIN(localStorage.getItem('EINVALUE')),
      createdDate: this.addRiskForm.controls['createdDate'].value,
      status: 'New'
    };
    this.apiService.postRiskData(environment.api_url + 'project-util/risk', data).subscribe((res) => {
      console.log("response Risk data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      this.apiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.addRiskFormData.next(res['risks']);
        let data = []
        data.push(res)
        this.taskService.allProjectdata.next(data[0])
        this.spinner.hide()
      }, err => {
        this.spinner.hide()
      });
      setTimeout(() => {
        this.NoteMSG = '';
        this.taskService.resetValue(['createdBy', 'notes'], this.addRiskForm)
        // this.addNoteForm.reset()
      }, 3000);
    }, err => {
      this.spinner.hide()
    });
    console.log('req body data : ', data);

  }

  openCreateTask(content) {
    this.modalReference = this.modalService.open(content);
    // this.newtaskcreate.controls['projectID'].setValue(this.taskService.taskPrjectID);
  }

  //.taskService resetValue(value, formdata) {
  //   const exclude: string[] = value;
  //   Object.keys(formdata.controls).forEach(key => {
  //     if (exclude.findIndex(q => q === key) !== -1) {
  //       formdata.get(key).reset();
  //     }
  //   });
  // }
  upadteRiskDetails() {
    this.spinner.show()
    this.apiService.putMethod(environment.api_url + 'project-util/update-risk-details', this.getRiskDetails).subscribe(data => {
      alert('success');
      this.apiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.addRiskFormData.next(res['risks']);
        let data = [];
        data.push(res);
        this.taskService.allProjectdata.next(data[0]);
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
      this.spinner.hide();
    })
  }
  onReset() {
    this.taskService.resetValue(['createdBy', 'notes'], this.addRiskForm);
  }

}
