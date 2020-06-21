import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AccordionModule} from 'primeng/accordion';
import {TabViewModule} from 'primeng/tabview';
import {SidebarModule} from 'primeng/sidebar';
import { ProjecttaskComponent } from './projecttask/projecttask.component';
import { RiskComponent } from './risk/risk.component';
import { TechnicalBlockerComponent } from './technical-blocker/technical-blocker.component';
import { DeffectsComponent } from './deffects/deffects.component';
import { HighpriorityissuesComponent } from './highpriorityissues/highpriorityissues.component';
import { NotesComponent } from './notes/notes.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ProjectDocumentsComponent } from './project-documents/project-documents.component';
@NgModule({
  declarations: [ProjectDetailsComponent, ProjecttaskComponent, RiskComponent, TechnicalBlockerComponent, DeffectsComponent, HighpriorityissuesComponent, NotesComponent, MilestoneComponent, ProjectDocumentsComponent],
  imports: [
    CommonModule,
    NgbModule,
    TableModule,
    TabViewModule,
    NgxSpinnerModule,
    SidebarModule,
    ProjectDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChartModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    AccordionModule
  ],
  //exports: [NgbModule]
})
export class ProjectDetailsModule { }
