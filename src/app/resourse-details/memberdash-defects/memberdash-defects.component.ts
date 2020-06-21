import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TaskDetailsServiceService } from '../../project-details/task-details-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-memberdash-defects',
  templateUrl: './memberdash-defects.component.html',
  styleUrls: ['./memberdash-defects.component.scss']
})
export class MemberdashDefectsComponent implements OnInit {
  addDefects: FormGroup;
  modalReference;
  NoteMSG;
  defectdata: any = [];
  proId:any =[];
  clonedCars: { [s: string]: any; } = {};
  // tslint:disable-next-line:max-line-length
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private taskService: TaskDetailsServiceService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.addDefects = this.fb.group({
      Summary: ['', Validators.required],
      Status: ['', Validators.required],
      Severity: ['', Validators.required],
      RaisedOndate: ['', Validators.required],
      Priority: ['', Validators.required],
      Environment: ['', Validators.required],
      Functionalarea: ['', Validators.required],
      Type: ['', Validators.required],
      DetectedinRelease: ['', Validators.required],
      EstablishedRootCause: ['', Validators.required],
      Systemcomponent: ['', Validators.required],
      ActualFixDate: ['', Validators.required],
      AssignedTo: ['', Validators.required],
      PriAssignedToority: ['', Validators.required],
      BlockedTests: ['', Validators.required],
      Closedinphase: ['', Validators.required],
      ClosingDate: ['', Validators.required],
      Comments: ['', Validators.required],
      Description: ['', Validators.required],
      E2ERetestDate: ['', Validators.required],
      EstimatedFixDate: ['', Validators.required],
      FixRequiredBy: ['', Validators.required],
      ManDaysLost: ['', Validators.required],
      Modified: ['', Validators.required],
      ProductService: ['', Validators.required],
      Project: ['', Validators.required],
      RaisedBy: ['', Validators.required],
      ReOpenCount: ['', Validators.required],
      Reproducible: ['', Validators.required],
      Subject: ['', Validators.required],
      TestArea: ['', Validators.required],
      TestPhase: ['', Validators.required],
      TestType: ['', Validators.required],

    });
    this.taskService.addMenberDefectsData$.subscribe(data => {
      this.defectdata = data;
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
    this.clonedCars[rowdata.defectID] = { ...rowdata };
  }
  onRowEditSave(rowdata: any) {
    delete this.clonedCars[rowdata.defectID];
  }
  onRowEditCancel(rowdata: any, index: number) {
    this.defectdata[index] = this.clonedCars[rowdata.defectID];
    delete this.clonedCars[rowdata.defectID];
  }
  submitAddDefectDetails() {
    this.spinner.show();
    this.NoteMSG = '';
    const data = [{
      defectID: '',
      projectID: this.proId[0],
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
    this.apiService.postNote(environment.api_url + 'project-util/defects-data', data).subscribe((res) => {
      this.apiService.getProjectId('//10.54.156.153:61001/oss/project-util/user-dashboard/' + localStorage.getItem('EINVALUE')).subscribe((res) => {
        this.taskService.addMenberDefectsData.next(res['defects']);
      },err=>{
        this.spinner.hide();
      });
      console.log("response note data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      setTimeout(() => {
        this.NoteMSG = '';
        // this.resetValue(['status', 'createdBy', 'description', 'owner'], this.addPriorityIssueForm)
        this.addDefects.reset();
      }, 3000);
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
    });

    
  }
  upadteDefectDetails() {
    this.spinner.show();
    this.apiService.putMethod(environment.api_url + 'project-util/update-defects-data', this.defectdata).subscribe(data => {
      console.log('success');
      this.spinner.hide();
    });
  }

}
