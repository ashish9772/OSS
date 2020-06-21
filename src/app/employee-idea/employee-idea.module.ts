import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { EmployeeIdeaRoutingModule } from './employee-idea-routing.module';
import { IdeasComponent } from './ideas/ideas.component';

@NgModule({
  declarations: [IdeasComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    EmployeeIdeaRoutingModule
  ]
})
export class EmployeeIdeaModule { }
