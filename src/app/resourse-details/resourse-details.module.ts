import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ResourseDetailsRoutingModule } from './resourse-details-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { ResourseDetailsComponent } from './resourse-details/resourse-details.component';
import { MemberdashTaskComponent } from './memberdash-task/memberdash-task.component';
import { MemberdashRiskComponent } from './memberdash-risk/memberdash-risk.component';
import { MemberdashTechnicalblockerComponent } from './memberdash-technicalblocker/memberdash-technicalblocker.component';
import { MemberdashHighpriorityComponent } from './memberdash-highpriority/memberdash-highpriority.component';
import { MemberdashDefectsComponent } from './memberdash-defects/memberdash-defects.component';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [ResourseDetailsComponent, MemberdashTaskComponent, MemberdashRiskComponent, MemberdashTechnicalblockerComponent, MemberdashHighpriorityComponent, MemberdashDefectsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    NgxSpinnerModule,
    TableModule,
    NgbModule,
    DropdownModule,
    InputTextareaModule,
    AccordionModule,
    TabViewModule,
    SidebarModule,
    ResourseDetailsRoutingModule
  ]
})
export class ResourseDetailsModule { }
