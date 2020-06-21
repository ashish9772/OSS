import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AdminEditAddRoutingModule } from './admin-edit-add-routing.module';
import { ProjectConfigComponent } from './project-config/project-config.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgxSpinnerModule } from "ngx-spinner"

@NgModule({
  declarations: [ProjectConfigComponent],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    CalendarModule,
    PanelModule,
    InputTextareaModule,
    MultiSelectModule,
    AdminEditAddRoutingModule
  ]
})
export class AdminEditAddModule { }
