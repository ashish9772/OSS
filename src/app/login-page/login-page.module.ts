import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    LoginPageRoutingModule
  ]
})
export class LoginPageModule { }
