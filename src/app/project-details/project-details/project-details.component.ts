import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TeamleadDetailsService } from '../../core/services/teamlead-details.service';
import { ProjectMemberService } from '../../core/services/project-member.service';
import { DashboardService } from '../../core/services/dashboard.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as XLSX from 'ts-xlsx';
import { ApiService } from '../../shared/api.service';
import { EDITOR_VALUE_ACCESSOR } from 'primeng';
import { O_NONBLOCK } from 'constants';
import { TaskDetailsServiceService } from '../task-details-service.service';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  allProjectDetails: any;
  extractProjectDetails: any = [];
  teamMember: any[];
  membersName: any = [];
  memberDetails = {};
  projectteammember: any;
  modalReference: any;
  pieData: any = [];
  addNoteForm;
  pieTableHead: any[];
  pieTableFormat$: Observable<any>;
  hide = true;
  addPriorityIssueForm;
  NoteMSG;
  addMileStoneForm;
  addRiskForm;
  addDefects: FormGroup;
  addTechnicalBlockerForm;
  projectId = 3333;
  submitted = false;
  fileData = null;
  fileName: string = 'No file chosen';
  arrayBuffer: any;
  path: any = 'project-util/project-id';
  getTaskDetails: any = [];
  projectData: any = [];
  projectDocCount;
  // addNoteFormData;
  addPriorityIssueFormData;
  addPriorityIssueFormKeys;

  addTechnicalBlockerFormData;
  addTechnicalBlockerFormKeys;

  addMileStoneFormData;
  addMileStoneFormKeys;

  addRiskFormData;
  addRiskFormKeys;

  addDefectsData;
  addDefectsKeys;

  projectConfigData;
  selectedProjectID;

  projectNote: any;
  queryParamValue: any;

  date = new Date();
  month = this.date.getUTCMonth() + 1;
  today = this.date.getUTCDate() + '/' + this.month + '/' + this.date.getUTCFullYear();


  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    // tslint:disable-next-line:align
    private tslead: TeamleadDetailsService,
    private projectmem: ProjectMemberService,
    private pietable: DashboardService,
    private formBuilder: FormBuilder,
    // tslint:disable-next-line:max-line-length
    private apiService: ApiService, private taskService: TaskDetailsServiceService, private spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router) {
    config.backdrop = 'static';

    this.route.fragment.subscribe((fragment: string) => {
      console.log("My hash fragment is here => ", fragment);
      if (fragment !== null && fragment !== '' && fragment !== undefined) {
        this.selectedProjectID = fragment;
      }
    });
    this.route.queryParams.subscribe((data) => {
      this.queryParamValue = data['index'];
      console.log("index active item :", this.taskService.activeItem);
    });

  }

  ngOnInit() {
    this.spinner.show();
    // console.log(localStorage.getItem(key), 'dd')
    this.addNoteForm = new FormGroup({
      date: new FormControl(this.today, Validators.required),
      noteType: new FormControl('', Validators.required),
      createdBy: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required)
    });
    this.addPriorityIssueForm = new FormGroup({
      createdDate: new FormControl(this.today, Validators.required),
      createdBy: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      owner: new FormControl('', Validators.required)
    });
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
    this.addMileStoneForm = new FormGroup({
      createdDate: new FormControl(this.today, Validators.required),
      createdBy: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required)
    });

    this.addRiskForm = new FormGroup({
      createdBy: new FormControl('', Validators.required),
      createdDate: new FormControl(this.today, Validators.required),
      notes: new FormControl('', Validators.required)
    });

    this.tslead.getAllProjectDetails().subscribe(data => this.allProjectDetails = data);
    this.projectmem.getprojectTeamMembers().subscribe(data => this.projectteammember = data);
    this.tslead.getPieChartData().subscribe(data => this.pieData = data);

    this.addDefects = this.formBuilder.group({
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

    this.apiService.getProjectId(environment.api_url + 'project-util/project-id').subscribe((res) => {
      this.spinner.show();
      console.log('response proj details : ', res);
      this.allProjectDetails = res;
      // tslint:disable-next-line:max-line-length
      if (this.queryParamValue !== '' && this.queryParamValue !== undefined && this.queryParamValue !== null && this.selectedProjectID !== '' && this.selectedProjectID !== null && this.selectedProjectID !== undefined) {
        console.log('coming to this');
        this.getProjectDetails(this.selectedProjectID, this.queryParamValue);
      } else {
        if (this.allProjectDetails.length > 0) {
          if (this.allProjectDetails[0].projectId !== undefined && this.allProjectDetails[0].projectId !== '' && this.allProjectDetails[0].projectId !== null) {
            this.getProjectDetails(this.allProjectDetails[0].projectId, this.taskService.activeItem);
          }
        } else {
          this.router.navigate(['/administration']);
        }

      }
      this.spinner.hide();
    }, err =>{
      this.spinner.hide()
    });
    this.taskService.allProjectdata$.subscribe(data => {
      this.projectData = data;
    });
    this.taskService.totalNoteCount$.subscribe(data => {
      this.projectNote = data.length;
    });
    this.taskService.addProjectDocument$.subscribe(data => {
      this.projectDocCount = data.length;
    });
    this.spinner.hide();
  }
  getIndex(value) {
    console.log(value);
  }

  getProjectDetails(projectId, i?) {
    //this.taskService.extracttaskDetails = [];
    
    this.taskService.activeItem = i;
    console.log('projectId', projectId);
    console.log(i, ",,,,,,,,,,,,,,,,,,,,,,,");

    this.taskService.taskPrjectID.next(projectId);
    this.taskService.taskProjectName.next(this.allProjectDetails[i].projectName);
    // this.taskService.taskProjectName$.subscribe((data)=>{
    //   console.log("project name :",data);
    // });


    this.spinner.show();

    this.extractProjectDetails = [];
    this.apiService.getProjectId(environment.api_url + 'project-util/project/' + projectId).subscribe(data => {
      let projectdataDetails = [];
      projectdataDetails.push(data);
      console.log("project data details ", projectdataDetails);

      this.taskService.addDefectsData.next(data['defects']);
      // if (this.addDefectsData.length !== 0) {
      //   this.addDefectsKeys = Object.keys(this.addDefectsData[0]);
      // }

      this.taskService.addMileStoneFormData.next(data['mileStones']);
      // if (this.addMileStoneFormData.length !== 0) {
      //   this.addMileStoneFormKeys = Object.keys(this.addMileStoneFormData[0]);
      // }

      this.taskService.addPriorityIssueFormData.next(data['issues']);
      // if (this.addPriorityIssueFormData.length !== 0) {
      //   this.addPriorityIssueFormKeys = Object.keys(this.addPriorityIssueFormData[0]);
      // }

      this.taskService.addRiskFormData.next(data['risks']);
      console.log('risk dta', data['risks']);
      console.log('daaaaaaa', this.taskService.addRiskFormData);
      // if (this.addRiskFormData.length !== 0) {
      //   this.addRiskFormKeys = Object.keys(this.addRiskFormData[0]);
      // }

      this.taskService.addTechnicalBlockerFormData.next(data['blockers']);
      console.log('tech block dta', data['blockers']);
      // if (this.addTechnicalBlockerFormData.length !== 0) {
      //   this.addTechnicalBlockerFormKeys = Object.keys(this.addTechnicalBlockerFormData[0]);
      // }
      this.taskService.totalNoteCount.next(data['projectNotes']);
      this.taskService.addNotesForm.next(data['projectNotes']);
      this.projectConfigData = data['projectConfig'];
      console.log("response final : ", data);
      console.log("stringfy ;",JSON.stringify(data))
      this.extractProjectDetails.push(data);
     
      this.taskService.allProjectdata.next(projectdataDetails[0]);
      console.log('test', this.extractProjectDetails);
      console.log('vv', this.extractProjectDetails[0].projectConfig.projectName)
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
    this.apiService.getValue(environment.api_url + 'project-util/oss-member/' + projectId).subscribe(data => {
      this.spinner.show();
      this.taskService.teamMemberDetails = data;
      console.log('member', data);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

    this.apiService.getValue(environment.api_url + 'project-util/task-details').subscribe(data => {
      this.spinner.show();
      let arrayDetails = [];
      this.getTaskDetails = data;
      this.getTaskDetails.filter(x => {
        if (projectId === x.projectID) {
          console.log('success', x);
          arrayDetails.push(x);
        }
      });
      this.taskService.storeData(arrayDetails);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

    this.apiService.getValue(environment.api_url + 'project-util/file-details/' + projectId).subscribe(data => {
      this.projectDocCount = data.length;
      this.taskService.addProjectDocument.next(data);
      //console.log('get file', this.fileUploadDetails);
    });

  }

  openMemberDetails(content) {
    this.projectmem.getProjectMembers().subscribe(data => this.teamMember = data);
    if (this.teamMember.length > 0) {
      this.modalReference = this.modalService.open(content);
    }
  }
  getRoleDetails(rolevalue) {
    console.log(rolevalue.role.value)
    let getMember = this.getMembers(rolevalue.role.value);
    if (getMember.members !== []) {
      this.membersName = getMember[0].members;
      console.log(this.membersName);
    }
  }
  getMembers(rolevalue) {
    let val = [];
    let extractMembers: any = this.teamMember.filter(data => {
      if (data.role.value === rolevalue) {
        return data;
      }
    });
    return extractMembers;
  }
  onSubmit(member) {
    let roleDeatil = member.role.role.label;
    let name = member.membername.name;
    this.memberDetails = {
      role: roleDeatil,
      membername: name
    };
    this.modalReference.close();
  }


  get f() { return this.addDefects.controls; }

  onSubmitDetails() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addDefects.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addDefects.value))
  }

  tabularFormat() {
    if (this.hide) {
      this.hide = false;
    } else {
      this.hide = true;
    }
    this.pieTableHead = [
      { field: 'defectid', header: 'DEFECT ID' },
      { field: 'defectdes', header: 'DEFECT DESCRIPTION' },
      { field: 'eta', header: 'DELIVER DATE' },
      { field: 'priority', header: 'PRIORITY' },
      { field: 'status', header: 'CURRENT STATUS' },
    ]
    this.pieTableFormat$ = this.pietable.projectDefectStatus();
  }
  addNewDefects(newdefects) {
    this.modalReference = this.modalService.open(newdefects);
  }
  incomingfile(event) {

    this.fileData = event.target.files[0];

    const inputValue = (document.getElementById('file-upload') as HTMLInputElement).value;

    this.fileName = (inputValue.split('\\')).pop();

  }

  Upload() {

    if (this.fileName !== 'No file chosen') {

      const fileReader = new FileReader();

      fileReader.onload = (e) => {

        this.processFile(fileReader);

      };
      fileReader.readAsArrayBuffer(this.fileData);

    }

  }
  processFile(fileReader: FileReader) {

    this.arrayBuffer = fileReader.result;

    const data = new Uint8Array(this.arrayBuffer);

    const arr = new Array();

    for (let i = 0; i !== data.length; ++i) {

      arr[i] = String.fromCharCode(data[i]);

    }

    // tslint:disable-next-line:quotemark

    const bstr = arr.join("");

    const workbook = XLSX.read(bstr, { type: 'binary' });

    const firstSheetName = workbook.SheetNames[0];

    const firstWorkSheet = workbook.Sheets[firstSheetName];

    const uploadJSON = XLSX.utils.sheet_to_json(firstWorkSheet, { raw: true });
    console.log(uploadJSON)

    // const headerKey =  ['Site Name', '1141 Code', 'FastE forecast', 'GigE forecast', 'HE 10G forecast', 'BB 10G forecast'];

    // tslint:disable-next-line:max-line-length

    //   const headerKey =  ['Site Name', '1141 Code', 'FastE Ethernet', 'GigE Ethernet', '10G Ethernet', '10G Broadband', '10G WMC', '10G WMC-Apollo', '10G WMC-TEF', '10G HE', '10G Backhaul', '10G PRTC'];

    //   const keys  = Object.keys(uploadJSON[0]);

    //   this.showValidMsg = true;

    //   keys.forEach((da) => {

    //     if (headerKey.indexOf(da) === -1) {

    //       this.showValidMsg = false;

    //     }

    //   });
    //   // console.log(this.showValidMsg);

    //  // console.log(uploadJSON);

    //   const ext = this.fileData.name.split('.').pop();

    //   if (ext === 'csv' || ext === 'xlsx' || ext === 'xls')  {

    //     this.uploadData.next({ fileType: ext, data: uploadJSON });

    //     }

  }

  submitMileStone() {
    this.NoteMSG = '';
    const data = {
      projectId: this.projectId,
      notes: this.addMileStoneForm.controls['notes'].value,
      createdBy: this.addMileStoneForm.controls['createdBy'].value,
      createdDate: this.addMileStoneForm.controls['createdDate'].value
    };
    this.apiService.postMileStoneData(environment.api_url + 'project-util/mile-stone', data).subscribe((res) => {
      console.log("response mile stone data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      setTimeout(() => {
        this.NoteMSG = '';
        this.resetValue(['createdBy', 'notes'], this.addMileStoneForm)
        // this.addNoteForm.reset()
      }, 3000);
    });
    console.log('req body data : ', data);
  }

  submitTechnicalBlocker() {
    this.NoteMSG = '';
    const data = {
      projectId: this.projectId,
      createdBy: '',
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
      console.log("response note data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      setTimeout(() => {
        this.NoteMSG = '';
        this.resetValue(['description', 'analysis', 'fixDetail', 'status', 'owner', 'area', 'technicalBlokerNotes'], this.addTechnicalBlockerForm)
        // this.addNoteForm.reset()
      }, 3000);
    });
  }

  submitNote() {
    this.NoteMSG = '';
    const data = {
      projectID: this.projectId,
      notes: this.addNoteForm.controls['note'].value,
      createdBy: this.addNoteForm.controls['createdBy'].value,
      createdDate: this.addNoteForm.controls['date'].value,
      type: this.addNoteForm.controls['noteType'].value
    }
    this.apiService.postNote(environment.api_url + 'project-util/notes', data).subscribe((res) => {
      console.log("response note data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      setTimeout(() => {
        this.NoteMSG = '';
        this.resetValue(['noteType', 'createdBy', 'note'], this.addNoteForm)
        // this.addNoteForm.reset()
      }, 3000);
    });

  }

  submitHighPriorityIssue() {
    this.NoteMSG = '';
    const data = {
      projectID: this.projectId,
      status: this.addPriorityIssueForm.controls['status'].value,
      createdBy: this.addPriorityIssueForm.controls['createdBy'].value,
      createdDate: this.addPriorityIssueForm.controls['createdDate'].value,
      description: this.addPriorityIssueForm.controls['description'].value,
      owner: this.addPriorityIssueForm.controls['owner'].value
    }
    this.apiService.postNote(environment.api_url + 'project-util/issue', data).subscribe((res) => {
      console.log("response note data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      setTimeout(() => {
        this.NoteMSG = '';
        this.resetValue(['status', 'createdBy', 'description', 'owner'], this.addPriorityIssueForm)
        // this.addNoteForm.reset()
      }, 3000);
    });

  }
  submitAddDefectDetails() {
    this.NoteMSG = '';
    const data = [{
      defectID: '',
      projectID: this.projectId,
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
    }]
    this.apiService.postNote(environment.api_url + 'project-util/defects-data', data).subscribe((res) => {
      console.log("response note data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      setTimeout(() => {
        this.NoteMSG = '';
        // this.resetValue(['status', 'createdBy', 'description', 'owner'], this.addPriorityIssueForm)
        this.addDefects.reset();
      }, 3000);
    });

  }
  submitAddRisk() {
    this.NoteMSG = '';
    const data = {
      projectId: this.projectId,
      notes: this.addRiskForm.controls['notes'].value,
      createdBy: this.addRiskForm.controls['createdBy'].value,
      createdDate: this.addRiskForm.controls['createdDate'].value
    };
    this.apiService.postRiskData(environment.api_url + 'project-util/risk', data).subscribe((res) => {
      console.log("response Risk data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      setTimeout(() => {
        this.NoteMSG = '';
        this.resetValue(['createdBy', 'notes'], this.addRiskForm)
        // this.addNoteForm.reset()
      }, 3000);
    });
    console.log('req body data : ', data);
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

