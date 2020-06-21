import { FormsModule } from '@angular/forms';
import { ReportComponent } from './report.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {LayoutRoutingModule } from './report-routing.module';
import { EmailReportComponent } from './email-report/email-report.component';
import { DownloadReportComponent } from './download-report/download-report.component';

@NgModule({
  declarations: [ReportComponent, EmailReportComponent, DownloadReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    LayoutRoutingModule
  ]
})
export class ReportModule { }
