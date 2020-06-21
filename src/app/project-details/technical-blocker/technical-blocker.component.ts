import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { TaskDetailsServiceService } from '../task-details-service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-technical-blocker',
  templateUrl: './technical-blocker.component.html',
  styleUrls: ['./technical-blocker.component.scss']
})
export class TechnicalBlockerComponent implements OnInit {
  taskProjectName: string;
  addTechnicalBlockerForm: FormGroup;
  clonedCars: { [s: string]: any; } = {};
  date = new Date();
  modalReference;
  getTechBlockerDetails: any = [];
  month = this.date.getUTCMonth() + 1;
  NoteMSG;
  taskProjectID: any;
  today = this.date.getUTCDate() + '/' + this.month + '/' + this.date.getUTCFullYear();
  constructor(private ApiService: ApiService, private taskService: TaskDetailsServiceService, private spinner: NgxSpinnerService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.spinner.show();
    this.addTechnicalBlockerForm = new FormGroup({
      description: new FormControl('', Validators.required),
      analysis: new FormControl('', Validators.required),
      fixDetail: new FormControl('', Validators.required),
      status: new FormControl('New'),
      owner: new FormControl('', Validators.required),
      date: new FormControl(this.today, Validators.required),
      area: new FormControl('', Validators.required),
      technicalBlokerNotes: new FormControl('', Validators.required)
    });
    this.taskService.technicalBlocker$.subscribe(data => {
      this.getTechBlockerDetails = data;
    });
    this.taskService.taskPrjectI$.subscribe(data => {
      this.taskProjectID = data;
      console.log('dataTest', this.taskProjectID)
    });
    this.taskService.taskProjectName$.subscribe(data => {
      this.taskProjectName = data;
      console.log('blocker project Name', this.taskProjectName);
    });
    this.spinner.hide()
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
    this.spinner.show()
    this.NoteMSG = '';
    const data = {
      techinicalBlockerId: null,
      projectId: this.taskProjectID,
      projectName : this.taskProjectName,
      createdBy: localStorage.getItem('EINVALUE'),
      assignName: this.taskService.getNameByEIN(localStorage.getItem('EINVALUE')),
      description: this.addTechnicalBlockerForm.controls['description'].value,
      analysis: this.addTechnicalBlockerForm.controls['analysis'].value,
      createdDate: this.addTechnicalBlockerForm.controls['date'].value,
      fixedDetails: this.addTechnicalBlockerForm.controls['fixDetail'].value,
      status: this.addTechnicalBlockerForm.controls['status'].value,
      owner: this.addTechnicalBlockerForm.controls['owner'].value,
      ownerName: this.taskService.getNameByEIN(this.addTechnicalBlockerForm.controls['owner'].value),
      area: this.addTechnicalBlockerForm.controls['area'].value,
      technicalBlokerNotes: this.addTechnicalBlockerForm.controls['technicalBlokerNotes'].value
    };
    this.ApiService.postNote(environment.api_url + 'project-util/blocker', data).subscribe((res) => {
      console.log("response note data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      this.ApiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.addTechnicalBlockerFormData.next(res['blockers']);
        let data = []
        data.push(res)
        this.taskService.allProjectdata.next(data[0])
        this.spinner.hide()
      }, err => {
        this.spinner.hide()
      });
      setTimeout(() => {
        this.NoteMSG = '';
        this.taskService.resetValue(['description', 'analysis', 'fixDetail', 'owner', 'area', 'technicalBlokerNotes'], this.addTechnicalBlockerForm)
        // this.addNoteForm.reset()
      }, 3000);
    }, err => {
      this.spinner.hide();
    });


  }

  openCreateTask(content) {
    this.modalReference = this.modalService.open(content);
    // this.newtaskcreate.controls['projectID'].setValue(this.taskService.taskPrjectID);
  }
  updatetechBlockerDetails() {
    this.spinner.show()
    this.ApiService.putMethod(environment.api_url + 'project-util/update-blocker', this.getTechBlockerDetails).subscribe(data => {
      this.ApiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.addTechnicalBlockerFormData.next(res['blockers']);
        let data = []
        data.push(res)
        this.taskService.allProjectdata.next(data[0])
        this.spinner.hide()
      }, err => {
        this.spinner.hide()
      });
      alert('success');
    }, err => {
      this.spinner.hide()
    });
  }
  //.taskService resetValue(value, formdata) {
  //   const exclude: string[] = value;
  //   Object.keys(formdata.controls).forEach(key => {
  //     if (exclude.findIndex(q => q === key) !== -1) {
  //       formdata.get(key).reset();
  //     }
  //   });
  // }

  onReset() {
    this.taskService.resetValue(['description', 'analysis', 'fixDetail', 'owner', 'area', 'technicalBlokerNotes'], this.addTechnicalBlockerForm);
  }

}
