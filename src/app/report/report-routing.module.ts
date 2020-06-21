import { ReportComponent } from './report.component';
import { EmailReportComponent } from './email-report/email-report.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadReportComponent } from './download-report/download-report.component';


const routes: Routes = [
    {
        path: '', 
        component: ReportComponent,
        children: [
          { path: 'download-report', component: DownloadReportComponent },
          { path: 'email-report', component : EmailReportComponent }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
