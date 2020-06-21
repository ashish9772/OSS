import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamInformationComponent } from './team-information/team-information.component';

const routes: Routes = [
  { path: '', component: TeamInformationComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamInformationRoutingModule { }
