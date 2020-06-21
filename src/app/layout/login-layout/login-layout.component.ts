import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {

  constructor(private authservice: AuthService) { 
    //this.authservice.isloggedIn = false;
  }

  ngOnInit() {
  }

}
