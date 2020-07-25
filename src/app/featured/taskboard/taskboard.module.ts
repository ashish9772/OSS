import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TaskBoardService } from './services/taskboard.service';

const routes: Routes = [
  {
    path: '', component: TaskboardComponent
  }
];

@NgModule({
  declarations: [TaskboardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [TaskBoardService]
})
export class TaskboardModule { }
