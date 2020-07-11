import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCreationComponent } from './profile-creation/profile-creation.component';
import { ProjectConfigurationComponent } from './project-configuration/project-configuration.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
const routes: Routes = [
  {
    path: 'profile', component: ProfileCreationComponent
  },
  { path: 'project', component: ProjectConfigurationComponent }
];

@NgModule({
  declarations: [
    ProfileCreationComponent, 
    ProjectConfigurationComponent
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatOptionModule,
    
  ]
})
export class ConfigurationModule { }
