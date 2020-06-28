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
