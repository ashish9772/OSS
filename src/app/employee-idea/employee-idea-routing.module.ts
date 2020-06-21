import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeasComponent } from './ideas/ideas.component';

const routes: Routes = [
  { path: '', component: IdeasComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeIdeaRoutingModule { }
