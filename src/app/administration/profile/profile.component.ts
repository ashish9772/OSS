import { ApiService } from './../../shared/api.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  clickCreateUser = false;
  showUserDetails = false;
  submitted = false;
  submitMsg = '';
  createUserForm;
  submitNewUserForm;
  name;
  mangerName;
  email;
  otherSkill = false;
  showWarning = false;
  msg;
  showSubmit = true;
  constructor(private apiservice: ApiService) { }

  ngOnInit() {
    this.createUserForm = new FormGroup({
      ein: new FormControl()
    });
    this.submitNewUserForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      managerName: new FormControl(),
      skill: new FormControl('', Validators.required),
      others: new FormArray([])
    });
  }

  createUser() {
    this.clickCreateUser = true;
  }

  searchEin() {
    let data = {
      ein: this.createUserForm.controls['ein'].value
    }
    this.apiservice.getUserDetail('ngwfmt/resources/userdetails/userdetails', data).subscribe(data => {

      if (!data.Warning) {
        this.showUserDetails = true;
        this.showWarning = false;
        this.submitNewUserForm.controls['name'].setValue(data.NAME);
        this.submitNewUserForm.controls['email'].setValue(data.mail);
        this.submitNewUserForm.controls['managerName'].setValue(data.MANAGER_NAME);
        this.showSubmit = false;
      } else {
        this.showWarning = true;
        this.showUserDetails = false;
        this.msg = 'Warning ' + " " + data.Warning;
      }
    }
    );
  }

  submitOSS() {
    this.submitted = false;
    let skill = '';
    if (this.otherSkill === false) {
      skill = this.submitNewUserForm.controls['skill'].value;
    } else {
      skill = this.submitNewUserForm.controls['others'].value[0]['otherSkill'];
    }
    const data = {
      "ein": this.createUserForm.controls['ein'].value,
      "projectID": '',
      "name": this.submitNewUserForm.controls['name'].value,
      "email": this.submitNewUserForm.controls['email'].value,
      "skill": skill,
      "role": []
    };
    setTimeout(() => {

      this.showUserDetails = false;
      this.otherSkill = false;
      this.submitNewUserForm.controls.others.removeAt(0);
      this.submitNewUserForm.reset();
      this.createUserForm.reset();
      this.showSubmit = true;
    }, 2000);
    setTimeout(() => {
      this.submitMsg = '';
      this.submitted = false;
    }, 5000);

    this.apiservice.submitNewUserDetail(environment.api_url + 'project/oss/member', data).subscribe((datas) => {


      this.submitMsg = 'Data Submitted Successfully.';
      this.submitted = true;


    },
      error => {
        this.submitted = true;
        this.submitMsg = 'Something went wrong!' + error;
      });
  }
  onChangeValue() {
    if (this.submitNewUserForm.controls['skill'].value === 'others' && this.otherSkill === false) {
      this.otherSkill = true;
      this.submitNewUserForm.controls.others.push(new FormGroup({
        otherSkill: new FormControl('', Validators.required)
      }));
    } else if (this.otherSkill === true) {
      this.submitNewUserForm.controls.others.removeAt(0);
      this.otherSkill = false;
    }
  }

  onCancel() {
    this.showUserDetails = false;
    this.showSubmit = true;
    this.createUserForm.reset();
  }

}
