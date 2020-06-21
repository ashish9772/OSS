import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourseDetailsComponent } from './resourse-details/resourse-details.component';
import { MemberdashTaskComponent } from './memberdash-task/memberdash-task.component';
import { MemberdashRiskComponent } from './memberdash-risk/memberdash-risk.component';
import { MemberdashTechnicalblockerComponent } from './memberdash-technicalblocker/memberdash-technicalblocker.component';
import { MemberdashHighpriorityComponent } from './memberdash-highpriority/memberdash-highpriority.component';
import { MemberdashDefectsComponent } from './memberdash-defects/memberdash-defects.component';

const routes: Routes = [
  {
    path: '', component: ResourseDetailsComponent,
    children: [
      { path: 'membertask', component: MemberdashTaskComponent },
      { path: 'memberrisk', component: MemberdashRiskComponent },
      {path: 'membertechnicalBlocker', component: MemberdashTechnicalblockerComponent},
      {path: 'memberhighPriorityIssues', component: MemberdashHighpriorityComponent},
      {path: 'memberdefects', component: MemberdashDefectsComponent},      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourseDetailsRoutingModule { }
