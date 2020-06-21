import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TaskDetailsServiceService } from '../../project-details/task-details-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-memberdash-highpriority',
  templateUrl: './memberdash-highpriority.component.html',
  styleUrls: ['./memberdash-highpriority.component.scss']
})
export class MemberdashHighpriorityComponent implements OnInit {
  addPriorityIssueForm: FormGroup;
  NoteMSG;
  modalReference;
  proId = [];
  clonedCars: { [s: string]: any; } = {};
  highPriorityIssue: any = [];
  date = new Date();
  month = this.date.getUTCMonth() + 1;
  today = this.date.getUTCDate() + '/' + this.month + '/' + this.date.getUTCFullYear();
  // tslint:disable-next-line:max-line-length
  constructor(private apiService: ApiService, private taskService: TaskDetailsServiceService, private spinner: NgxSpinnerService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.addPriorityIssueForm = new FormGroup({
      createdDate: new FormControl(this.today, Validators.required),
      status: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      owner: new FormControl('', Validators.required)
    });
    this.taskService.addMenberPriorityIssueFormData$.subscribe(data => {
      this.highPriorityIssue = data;
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
  openCreateTask(content) {
    this.modalReference = this.modalService.open(content);
    // this.newtaskcreate.controls['projectID'].setValue(this.taskService.taskPrjectID);
  }
  onRowEditInit(rowdata: any) {
    this.clonedCars[rowdata.issueId] = { ...rowdata };
  }
  onRowEditSave(rowdata: any) {
    delete this.clonedCars[rowdata.issueId];
  }
  onRowEditCancel(rowdata: any, index: number) {
    this.highPriorityIssue[index] = this.clonedCars[rowdata.issueId];
    delete this.clonedCars[rowdata.issueId];
  }
  submitHighPriorityIssue() {
    this.spinner.show();
    this.NoteMSG = '';
    const data = {
      projectID: this.proId[0],
      issueId: null,
      status: this.addPriorityIssueForm.controls['status'].value,
      createdBy: localStorage.getItem('EINVALUE'),
      createdDate: this.addPriorityIssueForm.controls['createdDate'].value,
      description: this.addPriorityIssueForm.controls['description'].value,
      owner: this.addPriorityIssueForm.controls['owner'].value
    }
    this.apiService.postNote(environment.api_url + 'project-util/issue', data).subscribe((res) => {
      this.apiService.getProjectId('//10.54.156.153:61001/oss/project-util/user-dashboard/' + localStorage.getItem('EINVALUE')).subscribe((res) => {
        this.taskService.addMenberPriorityIssueFormData.next(res['issues']);
      },err =>{
        this.spinner.hide();
      });
      console.log("response note data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      setTimeout(() => {
        this.NoteMSG = '';
        this.resetValue(['status', 'createdBy', 'description', 'owner'], this.addPriorityIssueForm)
        // this.addNoteForm.reset()
      }, 3000);
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
    });
   

  }
  updatehighPriorityDetails() {
    this.spinner.show();
    this.apiService.putMethod(environment.api_url + 'project-util/update-issue', this.highPriorityIssue).subscribe(data => {
      alert("success");
      this.spinner.hide();
    }, err=>{
      this.spinner.hide();
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
