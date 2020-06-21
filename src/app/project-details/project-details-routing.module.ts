import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjecttaskComponent } from './projecttask/projecttask.component';
import { RiskComponent } from './risk/risk.component';
import { TechnicalBlockerComponent } from './technical-blocker/technical-blocker.component';
import { DeffectsComponent } from './deffects/deffects.component';
import { HighpriorityissuesComponent } from './highpriorityissues/highpriorityissues.component';
import { NotesComponent } from './notes/notes.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { AuthguardService } from '../core/authguard/authguard.service';
import { ProjectDocumentsComponent } from './project-documents/project-documents.component';

const routes: Routes = [
  { path: '', component:  ProjectDetailsComponent,canActivate: [ AuthguardService ],
  children: [
    {path: 'task', component: ProjecttaskComponent},
    {path: 'risk', component: RiskComponent},
    {path: 'technicalBlocker', component: TechnicalBlockerComponent},
    {path: 'defects', component:DeffectsComponent},
    {path:'highPriorityIssues', component: HighpriorityissuesComponent},
    {path: 'notes', component: NotesComponent},
    {path: 'milestone', component: MilestoneComponent},
    {path:'documents', component: ProjectDocumentsComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailsRoutingModule { }
