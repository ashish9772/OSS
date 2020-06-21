import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, MainLayoutComponent, LoginLayoutComponent],
  imports: [
    CommonModule,     
    NgxSpinnerModule, 
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
