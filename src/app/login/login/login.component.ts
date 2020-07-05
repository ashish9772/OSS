import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });
  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private ac: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login() {
    const url = 'auth/login';
    const reqObj = {
      "deviceInfo": {
        "deviceId": "1234",
        "deviceType": "DEVICE_TYPE_ANDROID",
        "notificationToken": "testlogin"
      },
      "email": this.loginForm.get('email').value,
      "password": this.loginForm.get('password').value,
      "username": this.loginForm.get('email').value
    }
    this.loginService.login(url, reqObj).subscribe(res => {
      if (res.accessToken !== '') {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('userName', this.loginForm.get('email').value);
        this.router.navigate(['/stt/dashboard']);
      } else {
        
      }
    })

  }

}
