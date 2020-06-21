
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AuthguardService } from '../core/authguard/authguard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthguardService],
    children: [
      { path: 'dashboard', loadChildren: '../pages/pages.module#PagesModule' },
      { path: 'projectcomp', loadChildren: '../project-details/project-details.module#ProjectDetailsModule' },
      { path: 'adminedit', loadChildren: '../admin-edit-add/admin-edit-add.module#AdminEditAddModule' },
      { path: 'resoursedetails', loadChildren: '../resourse-details/resourse-details.module#ResourseDetailsModule' },
      { path: 'teaminfo', loadChildren: '../team-information/team-information.module#TeamInformationModule' },
      { path: 'recruitment', loadChildren: '../recruitment/recruitment.module#RecruitmentModule' },
      { path: 'ideas', loadChildren: '../employee-idea/employee-idea.module#EmployeeIdeaModule' },
      { path: 'administration', loadChildren: '../administration/administration.module#AdministrationModule' },
      { path: 'report', loadChildren :'../report/report.module#ReportModule'}
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', loadChildren: '../login-page/login-page.module#LoginPageModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
