import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCreationComponent } from './profile-creation/profile-creation.component';
import { ProjectConfigurationComponent } from './project-configuration/project-configuration.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'profile', component: ProfileCreationComponent
  },
  { path: 'project', component: ProjectConfigurationComponent }
];

@NgModule({
  declarations: [ProfileCreationComponent, ProjectConfigurationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class ConfigurationModule { }
