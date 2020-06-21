import { ApiService } from './../../shared/api.service';
import { ProjectConfigService } from './../../core/services/project-config.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { timingSafeEqual } from 'crypto';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-project-config',
  templateUrl: './project-config.component.html',
  styleUrls: ['./project-config.component.scss']
})
export class ProjectConfigComponent implements OnInit {
  projectConfigForm: FormGroup;
  memberRoleForm: FormGroup;
  projectformConfigdata: any;
  submitted = false;
  roleBind: any;
  teammember: any;
  formJsonData = [];
  disable = false;
  allRoleData: any;
  memberFiterdata = [];
  extractedRole: any;
  multiselct: any = [];
  selectdrole: any = [];
  roleDetails = {};
  selected: string;
  role = [];
  stakeholders = '';
  count = 0;
  stackholderCountValue = []
  memberData = [];
  tableDisplay = false;
  constructor(private fb: FormBuilder, private apiservice: ApiService,private spinner: NgxSpinnerService, private routes: Router) {
    this.projectConfigForm = this.fb.group({
      projectid: ['', Validators.required],
      projectname: ['', Validators.required],
      projectmanager: ['', Validators.required],
      techarchitect: ['', Validators.required],
      stakeemail: ['', [Validators.required]],
      pstartdate: [null, Validators.required],
      penddate: ['', Validators.required],
      astartdate: [''],
      aenddate: [''],
      // developer: ['', Validators.required],
      notearea: ['']
    });

    this.memberRoleForm = this.fb.group({
      memderList: ['', Validators.required],
      teamRole: ['', Validators.required],
      multiRole: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.apiservice.getValue(environment.api_url + 'project/oss/member').subscribe(data => {
      this.teammember = data;
      this.spinner.hide();
    });
    this.spinner.show()
    this.apiservice.getValue(environment.api_url + 'project-util/roles').subscribe(data => {
      this.allRoleData = data;
      // this.allRoleData.stakeholders = ['stakeholders'];
      this.roleBind = Object.keys(data);
      this.spinner.hide()
    });
  }

  selectRole(value) {
    this.roleDetails = {};
    this.memberRoleForm.patchValue({ multiRole: '' });
    let data_form = this.memberRoleForm.controls['teamRole'].value;
    this.selected = data_form;
    this.extractedRole = this.allRoleData[data_form];
    this.selectdrole = [];
    this.multiselct = [];
    // tslint:disable-next-line:prefer-for-of
    for (let a = 0; a < this.extractedRole.length; a++) {
      const b = { label: this.extractedRole[a], value: this.extractedRole[a] };
      this.multiselct.push(b);
    }
  }

  getMemberDetails(data) {
    let data_form = this.memberRoleForm.controls['memderList'].value;

    this.teammember.forEach(x => {
      if (x.ein.indexOf(data_form) > -1) {
        x.projectID = this.projectConfigForm.get('projectid').value;
        // this.memberFiterdata.push(x);
        this.memberData = Object.assign({}, x);
      }
    });
  }

  get f() { return this.projectConfigForm.controls; }


  addValue() {
    this.roleDetails[this.selected] = this.memberRoleForm.controls['multiRole'].value;
  }

  addAllDetail() {
    this.memberFiterdata.push(this.memberData);
    this.tableDisplay = true;
    let sampleArr = [];
    let finalArr = []
    sampleArr.push(this.roleDetails);
    // tslint:disable-next-line:forin
    for (const property in sampleArr[0]) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < sampleArr[0][property].length; i++) {
        finalArr.push({
          groupName: property,
          roleDescription: sampleArr[0][property][i]
        });
      }
    }
    this.memberFiterdata[this.memberFiterdata.length - 1]['role'] = finalArr;

    if (this.memberRoleForm.controls['teamRole'].value === 'Technical') {
      if (this.memberRoleForm.controls['multiRole'].value.indexOf("Technical Architect") !== -1) {
        this.projectConfigForm.patchValue({ techarchitect: this.memberFiterdata[this.count]['name'] });
        this.allRoleData.Technical = this.allRoleData.Technical.filter((data) => {
          if (data === "Technical Architect") {
            return false;
          } else {
            return true;
          }
        });
      }
      if (this.memberRoleForm.controls['multiRole'].value.indexOf("Technical Manager") !== -1) {
        this.projectConfigForm.patchValue({ projectmanager: this.memberFiterdata[this.count]['name'] });

        this.allRoleData.Technical = this.allRoleData.Technical.filter((data) => {
          if (data === "Technical Manager") {
            return false;
          } else {
            return true;
          }
        });
      }
    } else if (this.memberRoleForm.controls['teamRole'].value === 'Stake Holder' ) {
      if (this.memberRoleForm.controls['multiRole'].value.indexOf("Stake Holder Member") !== -1) {
        this.stackholderCountValue.push(this.count);
        this.stakeholders = this.stakeholders + ',' + this.memberFiterdata[this.count]['email'];
        this.projectConfigForm.patchValue({ stakeemail: this.stakeholders })
      }

     
    }
    this.roleDetails = {};
    this.memberRoleForm.reset();
    this.count = this.count + 1;
  }

  submitForm() {
    let projectMembersData = [];
    const stackholderData = [];

    for (let i = 0; i < this.memberFiterdata.length; i++) {
      if (this.stackholderCountValue.indexOf(i) !== -1) {
        stackholderData.push(this.memberFiterdata[i]);
      } else {
        projectMembersData.push(this.memberFiterdata[i])
      }
    }
    const arr = [];
    this.submitted = true;
    if (this.projectConfigForm.invalid) {
      return;
    } else {
      const projectConfigJson = {
        projectID: this.projectConfigForm.controls['projectid'].value,
        projectName: this.projectConfigForm.controls['projectname'].value,
        projectTeamMember: {
          projectID: this.projectConfigForm.controls['projectid'].value,
          projectMembers: projectMembersData,
          stakeHolders: stackholderData
        },
        pStartDate: this.projectConfigForm.controls['pstartdate'].value,
        aStartDate: this.projectConfigForm.controls['astartdate'].value,
        aEndDate: this.projectConfigForm.controls['aenddate'].value,
        pEndDate: this.projectConfigForm.controls['penddate'].value,
        notes: this.projectConfigForm.controls['notearea'].value,
        status: ''
      };  
      this.spinner.show();
      this.apiservice.configProject(environment.api_url + 'project/config', projectConfigJson).subscribe(data => {
        
        let fragment = data['projectID'];
        alert('Project Configured Successfully!')
        this.memberRoleForm.reset();
        this.projectConfigForm.reset();
        this.spinner.hide();
        this.routes.navigate(['/projectcomp'], { fragment:  fragment});

      }, err=>{
        this.spinner.hide();
      });
    }
  }
}





// this.memberFiterdata[this.memberFiterdata.length - 1]['role'] = finalArr;
