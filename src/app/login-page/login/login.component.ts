import { ProjectConfigService } from './../../core/services/project-config.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../shared/api.service';
import { NgxSpinnerService } from "ngx-spinner";
//import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  conditon;
  successcredetial: any;
  showErrMsg = false;
  notMember = false;
  ErrorMsg: string = '';
  constructor(private auth: AuthService, private routes: Router, private config: ProjectConfigService, private apiservice: ApiService, private spinner: NgxSpinnerService) {
   }
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  onFormSubmit(event) {
    // this.apiservice.shareProjectData();
    this.spinner.show();
    let usrName = this.loginForm.get('username').value;
    let pass = this.loginForm.get('password').value;

    let credential = {
      'ein': usrName,
      'password': pass
    }
    this.apiservice.post('gswfmt/login', credential).subscribe(data => {
     
      if (data.jwttoken !== '' && data.jwttoken !== null && data.jwttoken !== undefined && data['message'].length === 0) {   
          
        this.showErrMsg = false;
        this.apiservice.token = data.jwttoken;
        localStorage.setItem('token', data.jwttoken);
        this.apiservice.EIN = usrName;
        // setTimeout(() => {
        //   this.routes.navigate(['/resoursedetails']);
        // }, 1000);
       
        this.spinner.hide();
        this.apiservice.loginGet('ngwfmt/resources/userdetails/data').subscribe(data => {
          if (usrName === data.USER_EIN) {
            localStorage.setItem('EINVALUE', data.USER_EIN);
            this.routes.navigate(['/resoursedetails']);
            this.spinner.hide();
          }
        }, err => {
          this.spinner.hide();
        });
      } else {
        if (data.message.indexOf('Invalid EIN') !== -1) {          
          this.showErrMsg = true;
          this.ErrorMsg = data.message;
          this.notMember = false;
          this.loginForm.reset();
        } else if(data.message.indexOf('You are not a member of OSS') !== -1){
          this.notMember = true;
          this.showErrMsg = false;
          this.loginForm.reset();
        }
        this.spinner.hide();
      }
    }, err => {
    
      this.spinner.hide();
    });
  }

  ngOnInit() {
    if (this.routes.url == '/login') {
      localStorage.removeItem('token');
      localStorage.removeItem('EINVALUE');
    }
  }
  resetErrStatus(){
    this.notMember = false;
    this.showErrMsg = false;
  }

}
