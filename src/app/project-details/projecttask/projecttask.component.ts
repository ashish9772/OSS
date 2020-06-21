import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TaskDetailsServiceService } from './../task-details-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-projecttask',
  templateUrl: './projecttask.component.html',
  styleUrls: ['./projecttask.component.scss']
})
export class ProjecttaskComponent implements OnInit {
  newtaskcreate: FormGroup;
  modalReference: any;
  disabled = true;
  getTaskDetails: any = [];
  clonedCars: { [s: string]: any; } = {};
  commonValue = false;
  taskProjectID: string = ' ';
  taskProjectName : string = '';
  hideField = true;
  hideField1 = false; NoteMSG;
  bindName: string;
  assignName: any;
  minDateValue: any;
  ActualminDateValue;
  projectMinDate;

  constructor(private ApiService: ApiService, private taskService: TaskDetailsServiceService, private spinner: NgxSpinnerService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.spinner.show();
    this.taskService.eextracttaskDetails$.subscribe(data => {
      this.getTaskDetails = data;
    });
    this.taskService.taskPrjectI$.subscribe(data => {
      this.taskProjectID = data;
      console.log('dataTest', this.taskProjectID);
    });
    this.taskService.taskProjectName$.subscribe(data => {
      this.taskProjectName = data;
      console.log('task project Name', this.taskProjectName);
    });
    this.newtaskcreate = this.fb.group({
      projectName : [],
      projectID: [],
      taskId: [null],
      assignedTo: ['', Validators.required],
      assignName: [''],
      aStartDate: [''],
      aEndDate: [''],
      pStartDate: ['', Validators.required],
      pEndDate: ['', Validators.required],
      taskDescription: ['', Validators.required],
      status: ['New']
    });
    this.spinner.hide();
  }
  getAstartValue(date) {
    console.log('form value', date);
    this.ActualminDateValue = this.taskService.getStartValue(date);
  }
  getPstartValue(date) {
    this.projectMinDate = this.taskService.getStartValue(date);

  }
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
    this.modalReference = this.modalService.open(content);
    this.newtaskcreate.controls['projectID'].setValue(this.taskProjectID);
    this.newtaskcreate.controls['projectName'].setValue(this.taskProjectName);
  }
  upadteTaskDetails() {
    this.spinner.show();
 
    this.ApiService.putMethod(environment.api_url + 'project-util/update-task-details', this.getTaskDetails).subscribe(data => {
      this.ApiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.extracttaskDetails.next(res['taskDetails']);
        let data = [];
        data.push(res);
        this.taskService.allProjectdata.next(data[0]);
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });

      console.log('Success');
    }, err => {
      this.spinner.hide();
    });
    console.log('upadte', this.getTaskDetails);
  }
  taskCreateSubmit() {
    this.spinner.show();
    const name = this.taskService.getNameByEIN(this.newtaskcreate.controls['assignedTo'].value);
    this.newtaskcreate.patchValue({ assignName: name });
    console.log('form Submit', this.newtaskcreate.value);
    this.ApiService.postMileStoneData(environment.api_url + 'project-util/task-details', this.newtaskcreate.value).subscribe(data => {
      this.ApiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.extracttaskDetails.next(res['taskDetails']);
        let data = [];
        data.push(res);
        this.taskService.allProjectdata.next(data[0]);
        this.NoteMSG = 'Data Submitted Successfully';
        setTimeout(() => {
          this.NoteMSG = '';
          this.taskService.resetValue(['assignedTo', 'aStartDate',
            'aEndDate',
            'pStartDate',
            'pEndDate',
            'taskDescription'], this.newtaskcreate);
          // this.addNoteForm.reset()
        }, 3000);
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
    }, err => {
      this.spinner.hide();
    });

  }



  updateName(event) {

    console.log('event ;', event, 'hai ');

    this.hideField = false;
    this.hideField1 = true;

    const index = event.target['options'].selectedIndex;
    this.assignName = event.target['options'][index].text;

    let selectElementText = event.target['options']
    [event.target['options'].selectedIndex].text;


    this.bindName = selectElementText;
  }
  onReset() {
    this.taskService.resetValue(['assignedTo', 'aStartDate',
      'aEndDate',
      'pStartDate',
      'pEndDate',
      'taskDescription'], this.newtaskcreate);
  }

}
