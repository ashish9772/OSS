import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProjectListService } from './services/project-list.service';

const routes: Routes = [
  {
    path: '', component: ProjectListComponent
  }
];

@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [ProjectListService]
})
export class ProjectListModule { }
