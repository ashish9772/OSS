import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { TaskDetailsServiceService } from '../task-details-service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-deffects',
  templateUrl: './deffects.component.html',
  styleUrls: ['./deffects.component.scss']
})
export class DeffectsComponent implements OnInit {
  taskProjectName: string;
  addDefects: FormGroup;
  modalReference;
  NoteMSG;
  defectDataKeys = [];
  defectdata: any = [];
  taskProjectID: any;
  clonedCars: { [s: string]: any; } = {};
  defectdataShows: any;
  constructor(private ApiService: ApiService, private taskService: TaskDetailsServiceService, private spinner: NgxSpinnerService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.spinner.show();
    this.addDefects = this.fb.group({
      Summary: ['', Validators.required],
      Status: ['New'],
      Severity: [''],
      RaisedOndate: [''],
      Priority: [''],
      Environment: [''],
      Functionalarea: [''],
      Type: [''],
      DetectedinRelease: [''],
      EstablishedRootCause: [''],
      Systemcomponent: [''],
      ActualFixDate: [''],
      AssignedTo: ['', Validators.required],
      PriAssignedToority: [''],
      BlockedTests: [''],
      Closedinphase: [''],
      ClosingDate: [''],
      Comments: ['', Validators.required],
      Description: ['', Validators.required],
      E2ERetestDate: [''],
      EstimatedFixDate: [''],
      FixRequiredBy: [''],
      ManDaysLost: [''],
      Modified: [''],
      ProductService: [''],
      Project: [''],
      RaisedBy: [''],
      ReOpenCount: [''],
      Reproducible: [''],
      Subject: [''],
      TestArea: [''],
      TestPhase: [''],
      TestType: [''],

    });
    this.taskService.addDefectdata$.subscribe(data => {
      this.defectdata = data;
    });
    this.taskService.taskPrjectI$.subscribe(data => {
      this.taskProjectID = data;
    });
    this.taskService.taskProjectName$.subscribe(data => {
      this.taskProjectName = data;
    });
    this.spinner.hide()
  }
  openCreateTask(content) {
    this.modalReference = this.modalService.open(content);
    // this.newtaskcreate.controls['projectID'].setValue(this.taskService.taskPrjectID);
  }
  onRowEditInit(rowdata: any) {
    this.clonedCars[rowdata.defectID] = { ...rowdata };
  }
  onRowEditSave(rowdata: any) {
    delete this.clonedCars[rowdata.defectID];
  }
  onRowEditCancel(rowdata: any, index: number) {
    this.defectdata[index] = this.clonedCars[rowdata.defectID];
    delete this.clonedCars[rowdata.defectID];
  }
  showDefectData(value, data) {
    this.defectDataKeys = [];
    this.removeBlankDataKeys(value);
    // this.defectDataKeys = Object.keys(this.defectdataShows);
    this.defectdataShows = value;
    this.modalReference = this.modalService.open(data);

  }
  removeBlankDataKeys(data) {
    for (let key in data) {
      if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
        this.defectDataKeys.push(key);
      }
    }
  }

  submitAddDefectDetails() {
    this.spinner.show();
    this.NoteMSG = '';
    const data = [{
      defectID: '',
      projectID: this.taskProjectID,
      projectName: this.taskProjectName,
      summary: this.addDefects.controls['Summary'].value,
      status: this.addDefects.controls['Status'].value,
      severity: this.addDefects.controls['Severity'].value,
      raisedOndate: this.addDefects.controls['RaisedOndate'].value,
      priority: this.addDefects.controls['Priority'].value,
      environment: this.addDefects.controls['Environment'].value,
      functionalarea: this.addDefects.controls['Functionalarea'].value,
      type: this.addDefects.controls['Type'].value,
      detectedinRelease: this.addDefects.controls['DetectedinRelease'].value,
      establishedRootCause: this.addDefects.controls['EstablishedRootCause'].value,
      systemcomponent: this.addDefects.controls['Systemcomponent'].value,
      actualFixDate: this.addDefects.controls['ActualFixDate'].value,
      assignedTo: this.addDefects.controls['AssignedTo'].value,
      assignName: this.taskService.getNameByEIN(this.addDefects.controls['AssignedTo'].value),
      priAssignedToority: this.addDefects.controls['PriAssignedToority'].value,
      blockedTests: this.addDefects.controls['BlockedTests'].value,
      closedinphase: this.addDefects.controls['Closedinphase'].value,
      closingDate: this.addDefects.controls['ClosingDate'].value,
      comments: this.addDefects.controls['Comments'].value,
      description: this.addDefects.controls['Description'].value,
      e2ERetestDate: this.addDefects.controls['E2ERetestDate'].value,
      estimatedFixDate: this.addDefects.controls['EstimatedFixDate'].value,
      fixRequiredBy: this.addDefects.controls['FixRequiredBy'].value,
      manDaysLost: this.addDefects.controls['ManDaysLost'].value,
      modified: this.addDefects.controls['Modified'].value,
      productService: this.addDefects.controls['ProductService'].value,
      project: this.addDefects.controls['Project'].value,
      raisedBy: this.addDefects.controls['RaisedBy'].value,
      reOpenCount: this.addDefects.controls['ReOpenCount'].value,
      reproducible: this.addDefects.controls['Reproducible'].value,
      subject: this.addDefects.controls['Subject'].value,
      testArea: this.addDefects.controls['TestArea'].value,
      testPhase: this.addDefects.controls['TestPhase'].value,
      testType: this.addDefects.controls['TestType'].value,
    }];
    this.ApiService.postNote(environment.api_url + 'project-util/defects-data', data).subscribe((res) => {
      console.log("response note data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      this.ApiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.addDefectsData.next(res['defects']);
        let data = [];
        data.push(res)
        this.taskService.allProjectdata.next(data[0])
        this.spinner.hide();
      }, err => {
        this.spinner.hide()
      });
      setTimeout(() => {
        this.NoteMSG = '';
        // this.resetValue(['status', 'createdBy', 'description', 'owner'], this.addPriorityIssueForm);
        // tslint:disable-next-line:max-line-length
        this.taskService.resetValue(['Summary', 'Severity', 'RaisedOndate', 'Priority', 'Environment', 'Functionalarea', 'Type', 'DetectedinRelease', 'EstablishedRootCause', 'Systemcomponent', 'ActualFixDate', 'AssignedTo', 'PriAssignedToority', 'BlockedTests', 'Closedinphase', 'ClosingDate', 'Comments', 'Description', 'E2ERetestDate', 'EstimatedFixDate', 'FixRequiredBy', 'ManDaysLost', 'Modified', 'ProductService', 'Project', 'RaisedBy', 'ReOpenCount', 'Reproducible', 'Subject', 'TestArea', 'TestPhase', 'TestType'], this.addDefects);
        // alert('Defect Data Submitted Successfully');
        this.addDefects.reset();
      }, 3000);
    }, err => {
      this.spinner.hide()
    });

  }
  upadteDefectDetails() {
    this.spinner.show();
    this.ApiService.putMethod(environment.api_url + 'project-util/update-defects-data', this.defectdata).subscribe(data => {
      this.ApiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
        this.taskService.addDefectsData.next(res['defects']);
        let data = [];
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

  onReset() {
    this.taskService.resetValue(['Summary', 'Severity', 'RaisedOndate', 'Priority', 'Environment', 'Functionalarea', 'Type', 'DetectedinRelease', 'EstablishedRootCause', 'Systemcomponent', 'ActualFixDate', 'AssignedTo', 'PriAssignedToority', 'BlockedTests', 'Closedinphase', 'ClosingDate', 'Comments', 'Description', 'E2ERetestDate', 'EstimatedFixDate', 'FixRequiredBy', 'ManDaysLost', 'Modified', 'ProductService', 'Project', 'RaisedBy', 'ReOpenCount', 'Reproducible', 'Subject', 'TestArea', 'TestPhase', 'TestType'], this.addDefects);
  }
}
