import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OssLayoutComponent } from './oss-layout/oss-layout.component';
import { SharedModule } from '../shared/shared.module';
const routes: Routes = [
  {
    path: '', component: OssLayoutComponent, children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'taskboard/:id',
        loadChildren: () => import('./taskboard/taskboard.module').then(m => m.TaskboardModule),
      },
      {
        path: 'project-list',
        loadChildren: () => import('./project-list/project-list.module').then(m => m.ProjectListModule),
      },
      {
        path: 'configuration',
        loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),
      }
    ]
  }
];

@NgModule({
  declarations: [OssLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeaturedModule { }
