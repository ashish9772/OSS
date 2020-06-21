import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TaskDetailsServiceService } from '../../project-details/task-details-service.service';
import { ApiService } from '../../shared/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-memberdash-task',
  templateUrl: './memberdash-task.component.html',
  styleUrls: ['./memberdash-task.component.scss']
})
export class MemberdashTaskComponent implements OnInit {

  newtaskcreate: FormGroup;
  modalReference: any;
  disabled = true;
  getTaskDetails: any = [];
  clonedCars: { [s: string]: any; } = {};
  commonValue = false;
  taskProjectID = this.taskService.taskPrjectID;
  hideField = true;
  hideField1 = false;
  bindName: string;
  projectIdList = [];
  proId = [];
  assignto = []
  // tslint:disable-next-line:max-line-length
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private taskService: TaskDetailsServiceService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.spinner.show()
    this.newtaskcreate = this.fb.group({
      projectID: [''],
      taskId: [null],
      assignedTo: [''],
      aStartDate: [''],
      aEndDate: [''],
      pStartDate: [''],
      pEndDate: [''],
      taskDescription: [''],
      status: ['new']
    });
    this.taskService.addMenberTasksData$.subscribe(data => {
      this.projectIdList = data.map((val) => {
        return val.projectID;
      })
      this.getTaskDetails = data;
      console.log("data   :::: ", data);
    });
    this.apiService.getValue(environment.api_url + 'project-util/projects-by-ein/' + localStorage.getItem('EINVALUE')).subscribe(data => {
      console.log('data', data);
      this.proId = Object.keys(data)
      console.log('iddd', this.proId[0])
      this.newtaskcreate.controls['projectID'].setValue(this.proId[0])
      this.spinner.hide()
    }, err => {
      this.spinner.hide()
    })
  }
  // Edit Table
  onRowEditInit(rowdata: any) {
    this.clonedCars[rowdata.taskId] = { ...rowdata };
    this.commonValue = true;
  }
  onRowEditSave(rowdata: any) {
    delete this.clonedCars[rowdata.taskId];
  }
  onRowEditCancel(rowdata: any, index: number) {
    this.getTaskDetails[index] = this.clonedCars[rowdata.taskId];
    delete this.clonedCars[rowdata.taskId];
  }
  // Close
  openCreateTask(content) {
    this.spinner.show();
    this.modalReference = this.modalService.open(content);
    // this.newtaskcreate.controls['projectID'].setValue(this.taskService.taskPrjectID);
    this.apiService.getValue(environment.api_url + 'project-util/oss-member/' + this.proId).subscribe(data => {
      console.log("member", data);
      this.taskService.memberData = data;
      this.assignto = data
      this.spinner.hide()
    }, err => {
      this.spinner.hide()
    })
  }
  upadteTaskDetails() {
    this.spinner.show()
    this.apiService.putMethod(environment.api_url + 'project-util/update-task-details', this.getTaskDetails).subscribe(data => {
      console.log('Success');
    }, err => {
      this.spinner.hide()
    });
    console.log("upadte", this.getTaskDetails);
  }
  taskCreateSubmit() {
    this.spinner.show()
    console.log('form Submit', this.newtaskcreate.value);
    this.apiService.postMileStoneData(environment.api_url + 'project-util/task-details', this.newtaskcreate.value).subscribe(data => {

      this.apiService.getProjectId('//10.54.156.153:61001/oss/project-util/user-dashboard/' + localStorage.getItem('EINVALUE')).subscribe((res) => {
        this.taskService.addMenberTasksData.next(res['tasks']);
        this.spinner.hide()
      }, err => {
        this.spinner.hide()
      });
    }, err => {
      this.spinner.hide()
    });
  }

  updateName(name) {
    console.log("name :", name);
  }

}
