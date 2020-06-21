import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { TaskDetailsServiceService } from '../task-details-service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-highpriorityissues',
  templateUrl: './highpriorityissues.component.html',
  styleUrls: ['./highpriorityissues.component.scss']
})
export class HighpriorityissuesComponent implements OnInit {
  taskProjectName: string;
  addPriorityIssueForm: FormGroup;
  NoteMSG;
  modalReference;
  clonedCars: { [s: string]: any; } = {};
  highPriorityIssue: any = [];
  date = new Date();
  taskProjectID: any;
  month = this.date.getUTCMonth() + 1;
  today = this.date.getUTCDate() + '/' + this.month + '/' + this.date.getUTCFullYear();
  constructor(private ApiService: ApiService, private taskService: TaskDetailsServiceService, private spinner: NgxSpinnerService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.spinner.show();
    this.addPriorityIssueForm = new FormGroup({
      createdDate: new FormControl(this.today, Validators.required),
      status: new FormControl('New'),
      description: new FormControl('', Validators.required),
      owner: new FormControl('', Validators.required)
    });
    this.taskService.highpriorityissue$.subscribe(data => {
      this.highPriorityIssue = data;
    });
    this.taskService.taskPrjectI$.subscribe(data => {
      this.taskProjectID = data;
      console.log('dataTest', this.taskProjectID);
    });
    this.taskService.taskProjectName$.subscribe(data => {
      this.taskProjectName = data;
      console.log('task project Name', this.taskProjectName);
    });
    this.spinner.hide()
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
    this.spinner.show()
    this.NoteMSG = '';
    const data = {
      projectID: this.taskProjectID,
      projectName : this.taskProjectName,
      issueId: null,
      status: this.addPriorityIssueForm.controls['status'].value,
      createdBy: localStorage.getItem('EINVALUE'),
      assignName: this.taskService.getNameByEIN(localStorage.getItem('EINVALUE')),
      createdDate: this.addPriorityIssueForm.controls['createdDate'].value,
      description: this.addPriorityIssueForm.controls['description'].value,
      owner: this.addPriorityIssueForm.controls['owner'].value,
      ownerName: this.taskService.getNameByEIN(this.addPriorityIssueForm.controls['owner'].value)
    }
    this.ApiService.postNote(environment.api_url + 'project-util/issue', data).subscribe((res) => {
      console.log("response note data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      this.ApiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.addPriorityIssueFormData.next(res['issues']);
        let data = []
        data.push(res)
        this.taskService.allProjectdata.next(data[0])
        this.spinner.hide()
      }, err => {
        this.spinner.hide()
      });
      setTimeout(() => {
        this.NoteMSG = '';
        this.taskService.resetValue([ 'description', 'owner'], this.addPriorityIssueForm);
        // this.addNoteForm.reset()
      }, 3000);
    }, err => {
      this.spinner.hide()
    });



  }
  updatehighPriorityDetails() {
    this.spinner.show()
    this.ApiService.putMethod(environment.api_url + 'project-util/update-issue', this.highPriorityIssue).subscribe(data => {
      this.ApiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.addPriorityIssueFormData.next(res['issues']);
        let data = []
        data.push(res)
        this.taskService.allProjectdata.next(data[0])
      }, err => {
        this.spinner.hide()
      });
      alert("success");
    }, err => {
      this.spinner.hide();
    });
  }
  // resetValue(value, formdata) {
  //   const exclude: string[] = value;
  //   Object.keys(formdata.controls).forEach(key => {
  //     if (exclude.findIndex(q => q === key) !== -1) {
  //       formdata.get(key).reset();
  //     }
  //   });
  // }
  onReset() {
    this.taskService.resetValue([ 'description', 'owner'], this.addPriorityIssueForm);
  }

}
