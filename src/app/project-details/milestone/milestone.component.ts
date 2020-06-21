import { ApiService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { TaskDetailsServiceService } from '../task-details-service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { BootstrapOptions } from '@angular/core/src/application_ref';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {
  selectedSubTaskId: any;
  selectedMileStoneId: any;
  taskProjectName: string;
  addMileStoneForm: FormGroup;
  addMileStoneTaskForm: FormGroup;
  addMileStoneSubTaskForm: FormGroup;

  // subTaskBtnEnable = false;

  editRowDataTask :any = [];
  taskWidthStyle = false;

  editRowDataSubTask: any =[];
  subtaskWidthStyle = false;

  showSubTaskTableData = [];
  // milestoneId = 'abcdef';
  actualMinDateValueTask;
  actualMinDateValueSubTask;
  projMinDateValueTask;
  projMinDateValueSubTask;

  NoteMSG;
  modalReference;
  mileStoneTaskShow = false;
  addMileStoneTask = false;
  mileStoneSubTaskStatus = false;
  subTaskShowStatus = false;
  milestoneData: any = [];
  mileStoneTaskData = [];
  clonedCars: { [s: string]: any; } = {};
  taskProjectID: any;
  date = new Date();
  month = this.date.getUTCMonth() + 1;
  today = this.date.getUTCDate() + '/' + this.month + '/' + this.date.getUTCFullYear();
  constructor(private ApiService: ApiService, private spinner: NgxSpinnerService, private taskService: TaskDetailsServiceService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.spinner.show();
    this.addMileStoneForm = new FormGroup({
      createdDate: new FormControl(this.today, Validators.required),
      notes: new FormControl('', Validators.required)
    });
    this.addMileStoneTaskForm = this.fb.group({
      mileStoneId: '',
      projectID: '',
      projectName : '',
      assignedTo: ['', Validators.required],
      assignName : '',
      aStartDate: [''],
      aEndDate: [''],
      pStartDate: ['', Validators.required],
      pEndDate: ['', Validators.required],
      taskDescription: ['', Validators.required],
      status: ['New']
    });
    this.addMileStoneSubTaskForm = this.fb.group({
      taskId: '',
      assignedTo: ['', Validators.required],
      assignName : '',
      aStartDate: [''],
      aEndDate: [''],
      pStartDate: ['', Validators.required],
      pEndDate: ['', Validators.required],
      description: ['', Validators.required],
      status: ['New'],
      name: ['']
    });


    this.taskService.milestone$.subscribe(data => {
      this.milestoneData = data;
      console.log('milestone', this.milestoneData);
    });
    this.taskService.taskPrjectI$.subscribe(data => {
      this.taskProjectID = data;
      console.log('dataTest', this.taskProjectID);
    });
    this.taskService.taskProjectName$.subscribe(data => {
      this.taskProjectName = data;
      console.log('task project Name', this.taskProjectName);
    });
    this.spinner.hide();
  }


  getAstartValueTask(date) {
    console.log('form value', date);
    this.actualMinDateValueTask = this.taskService.getStartValue(date);
  }
  getPstartValueTask(date) {
    this.projMinDateValueTask = this.taskService.getStartValue(date);
  }
  getAstartValueSubTask(date) {
    console.log('form value', date);
    this.actualMinDateValueSubTask = this.taskService.getStartValue(date);
  }
  getPstartValueSubTask(date) {
    this.projMinDateValueSubTask = this.taskService.getStartValue(date);
  }




  openCreateMileStone(content) {
    this.modalReference = this.modalService.open(content);
  }

  // openCreateTask(content, index, rowDataIndex) {
  //   // this.addMileStoneTaskForm.setValue['milestoneId'] = 'abc';

  //   setTimeout(() => {
  //     this.addMileStoneTaskForm.get('status').setValue('New');
  //     this.addMileStoneTaskForm.get('mileStoneId').setValue(this.milestoneData[index].mileStoneId);
  //     this.addMileStoneTaskForm.get('projectID').setValue(this.milestoneData[index].projectId);


  //     // this.addMileStoneTaskForm.value.milestoneId = this.milestoneData[0].mileStoneId;
  //     // console.log( this.addMileStoneTaskForm.value.milestoneId ,'abc')
  //   }, 1000);
  //   // this.addMileStoneTaskForm.value.milestoneId = 'abc'
  //   this.modalReference = this.modalService.open(content);
  //   // this.newtaskcreate.controls['projectID'].setValue(this.taskService.taskPrjectID);
  //   this.ApiService.getValue(environment.api_url + 'project-util/milestone-tasks/' + rowDataIndex).subscribe((data) => {
  //     this.mileStoneTaskData = data;
  //     console.log("success :", data);
  //   });
  // }
  showTask(index, rowDataIndex) {
    // this.addMileStoneTaskForm.setValue['milestoneId'] = 'abc';
    console.log("mile stone daata :",this.milestoneData);
    this.selectedMileStoneId = rowDataIndex;
    this.mileStoneTaskShow = true;
    this.addMileStoneTask = false;
    this.subTaskShowStatus = false
    this.mileStoneSubTaskStatus = false;
    setTimeout(() => {
      this.addMileStoneTaskForm.get('status').setValue('New');
      this.addMileStoneTaskForm.get('mileStoneId').setValue(this.milestoneData[index].mileStoneId);
      this.addMileStoneTaskForm.get('projectID').setValue(this.milestoneData[index].projectId);
      this.addMileStoneTaskForm.get('projectName').setValue(this.taskProjectName);
      // this.addMileStoneTaskForm.value.milestoneId = this.milestoneData[0].mileStoneId;
      // console.log( this.addMileStoneTaskForm.value.milestoneId ,'abc')
    }, 1000);
    // this.addMileStoneTaskForm.value.milestoneId = 'abc'
    // this.newtaskcreate.controls['projectID'].setValue(this.taskService.taskPrjectID);
    this.ApiService.getValue(environment.api_url + 'project-util/milestone-tasks/' + rowDataIndex).subscribe((data) => {
      this.mileStoneTaskData = data;
      console.log("success :", data);
    });
  }
  addMileStoneStatus() {
    this.addMileStoneTask = true;
    // this.showSubTaskTableData = false;
    this.subTaskShowStatus = false
    this.mileStoneSubTaskStatus = false
  }
  hideForm() {
    console.log("hide :")
    this.addMileStoneTask = false;
    this.mileStoneSubTaskStatus = false;
    this.subTaskShowStatus = false;
    this.taskService.resetValue(['assignedTo', 'aStartDate', 'aEndDate', 'pStartDate', 'taskDescription', 'pEndDate'], this.addMileStoneTaskForm);
    this.taskService.resetValue(['assignedTo', 'aStartDate', 'aEndDate', 'pStartDate', 'description', 'pEndDate'], this.addMileStoneSubTaskForm);
  }


  onRowEditInit(rowdata: any) {
 
    this.clonedCars[rowdata.mileStoneId] = { ...rowdata };
    console.log("consoling :",this.clonedCars)
  }

  onRowEditSave(rowdata: any) {
 
    delete this.clonedCars[rowdata.mileStoneId];
  }
  onRowEditCancel(rowdata: any, index: number) {
 
    this.milestoneData[index] = this.clonedCars[rowdata.mileStoneId];
    delete this.clonedCars[rowdata.mileStoneId];
  }

  onRowEditInitTask(rowdata: any) {
    this.editRowDataTask[rowdata.taskId] = { ...rowdata };
    this.taskWidthStyle = true;
  }
  onRowEditSaveTask(rowdata: any) {
    delete this.editRowDataTask[rowdata.taskId];
  }
  onRowEditCancelTask(rowdata: any, index: number) {
    this.mileStoneTaskData[index] = this.editRowDataTask[rowdata.taskId];
    delete this.editRowDataTask[rowdata.taskId];
  }

  onRowEditInitSubTask(rowdata: any) {
    this.editRowDataSubTask[rowdata.taskId] = { ...rowdata };
    this.subtaskWidthStyle = true;
  }
  onRowEditSaveSubTask(rowdata: any) {
    delete this.editRowDataSubTask[rowdata.taskId];
  }
  onRowEditCancelSubTask(rowdata: any, index: number) {
    this.showSubTaskTableData[index] = this.editRowDataSubTask[rowdata.taskId];
    delete this.editRowDataSubTask[rowdata.taskId];
  }

  
  submitMileStone() {
    this.spinner.show();
    this.NoteMSG = '';
    const data = {
      mileStoneId: null,
      projectId: this.taskProjectID,
      projectName : this.taskProjectName,
      notes: this.addMileStoneForm.controls['notes'].value,
      createdBy: localStorage.getItem('EINVALUE'),
      assignName: this.taskService.getNameByEIN(localStorage.getItem('EINVALUE')),
      createdDate: this.addMileStoneForm.controls['createdDate'].value,
      status: 'New'
    };

    this.ApiService.postMileStoneData(environment.api_url + 'project-util/mile-stone', data).subscribe((res) => {
      console.log("response mile stone data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      this.ApiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.addMileStoneFormData.next(res['mileStones']);
        let data = []
        data.push(res)
        this.taskService.allProjectdata.next(data[0])
        this.spinner.hide()
      }, err => {
        this.spinner.hide()
      });
      setTimeout(() => {
        this.NoteMSG = '';
        this.taskService.resetValue(['createdBy', 'notes'], this.addMileStoneForm);
        // this.addNoteForm.reset()
      }, 3000);
    }, err => {
      this.spinner.hide()
    });
    console.log('req body data : ', data);

  }

  submitMileStoneTask() {
    this.actualMinDateValueTask = '';
    this.projMinDateValueTask = '';
    const ein = this.addMileStoneTaskForm.controls['assignedTo'].value;
    this.addMileStoneTaskForm.get('assignName').setValue(this.taskService.getNameByEIN(ein));
       
    // tslint:disable-next-line:max-line-length
    this.ApiService.postMileStoneData(environment.api_url + 'project-util/milestone-tasks', [this.addMileStoneTaskForm.value]).subscribe((res) => {

      // tslint:disable-next-line:max-line-length
      this.ApiService.getValue(environment.api_url + 'project-util/milestone-tasks/' + this.addMileStoneTaskForm.controls['mileStoneId'].value).subscribe((data) => {
        this.mileStoneTaskData = data;
        console.log("success :", data);
        this.NoteMSG = 'Data Submitted Successfully';
        setTimeout(() => {
          this.addMileStoneTask = false;
          this.NoteMSG = '';
          // this.addMileStoneTaskForm.reset();
          // this.addMileStoneTaskForm.get('status').setValue('New');
          this.taskService.resetValue(['assignedTo', 'aStartDate', 'aEndDate', 'pStartDate', 'taskDescription', 'pEndDate'], this.addMileStoneTaskForm);
          // this.addNoteForm.reset()
        }, 3000);
      });

    });

  }

  updateMilestoneDetails() {
    this.spinner.show();
    this.ApiService.putMethod(environment.api_url + 'project-util/update-mile-stone', this.milestoneData).subscribe(data => {
      this.ApiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.addMileStoneFormData.next(res['mileStones']);
        let data = []
        data.push(res)
        this.taskService.allProjectdata.next(data[0])
        this.spinner.hide()
      }, err => {
        this.spinner.hide()
      });
      alert('Success');
    }, err => {
      this.spinner.hide()
    });
  }

  updateMilestoneTaskDetails(){
    this.spinner.show();
    this.ApiService.putMethod(environment.api_url + 'project-util/update-milestone-tasks', this.mileStoneTaskData).subscribe(data => {
      // this.milestoneData = data;
    alert("success");
      this.spinner.hide();
    }, err => {
      this.spinner.hide()
    });
  }
  updateMilestoneSubTaskDetails(){
    this.spinner.show();
    this.ApiService.putMethod(environment.api_url + 'project-util/update-sub-tasks', this.showSubTaskTableData).subscribe(data => {
      // this.milestoneData = data;
    alert("success");
      this.spinner.hide();
    }, err => {
      this.spinner.hide()
    });
  }

  addMileStoneSubTask(taskId) {
    
    this.mileStoneSubTaskStatus = true;
    this.addMileStoneTask = false;
    this.subTaskShowStatus = false;
    // this.mileStoneTaskShow = false;
    console.log("taskid", taskId)
    this.addMileStoneSubTaskForm.get('taskId').setValue(taskId);
  }

  showSubTask(taskId) {
    console.log("id ;",taskId)
    this.selectedSubTaskId = taskId;
    this.mileStoneSubTaskStatus = false;
    this.subTaskShowStatus = true;
    this.addMileStoneTask = false;
    this.ApiService.getValue(environment.api_url + 'project-util/sub-tasks/' + taskId).subscribe((data) => {
      // this.mileStoneTaskData = data;
      this.showSubTaskTableData = data;
      // this.subTaskBtnEnable = data.length > 0 ? true : false;
      console.log("success :", this.showSubTaskTableData);
    });

  }


  submitMileStoneSubTask() {
    this.actualMinDateValueSubTask = '';
    this.projMinDateValueSubTask = '';
    const ein = this.addMileStoneSubTaskForm.controls['assignedTo'].value;
    this.addMileStoneSubTaskForm.get('assignName').setValue(this.taskService.getNameByEIN(ein));


    this.ApiService.postMileStoneData(environment.api_url + 'project-util/sub-tasks', [this.addMileStoneSubTaskForm.value]).subscribe((res) => {

      this.ApiService.getValue(environment.api_url + 'project-util/sub-tasks/' + this.addMileStoneSubTaskForm.controls['taskId'].value).subscribe((data) => {
        // this.mileStoneTaskData = data;
        this.showSubTaskTableData = data;
        console.log("success :", data);
        this.NoteMSG = 'Data Submitted Successfully';
        setTimeout(() => {
          this.mileStoneSubTaskStatus = false;
          this.subTaskShowStatus = false;
          this.NoteMSG = '';
          // this.addMileStoneSubTaskForm.reset();
          // this.addMileStoneSubTaskForm.get('status').setValue('New');
          this.taskService.resetValue(['assignedTo', 'aStartDate', 'aEndDate', 'pStartDate', 'description', 'pEndDate'], this.addMileStoneSubTaskForm);
          // this.addNoteForm.reset()
        }, 3000);
      });

    });
  }

  // btnStatus(data): boolean {
  //   console.log("btn status :", data);
  //   if (data !== undefined || data !== null) {
  //     if (data.length > 0) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  onReset() {
    this.taskService.resetValue(['createdBy', 'notes'], this.addMileStoneForm);
  }


  // resetValue(value, formdata) {
  //   const exclude: string[] = value;
  //   Object.keys(formdata.controls).forEach(key => {
  //     if (exclude.findIndex(q => q === key) !== -1) {
  //       formdata.get(key).reset();
  //     }
  //   });
  // }

}
