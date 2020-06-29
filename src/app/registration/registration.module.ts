import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { Routes, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  { path: '', component: RegistrationComponent }
];

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule
  ]
})
export class RegistrationModule { }
