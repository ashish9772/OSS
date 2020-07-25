import { Component, OnInit } from '@angular/core';
import { TaskBoardService } from '../services/taskboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent implements OnInit {
  projectData: any;
  constructor(private taskService: TaskBoardService, private route: ActivatedRoute) {
    this.route.paramMap.pipe(
      switchMap(params => this.taskService.getProjectDetails(+ params.get('id')))
    ).subscribe(projectData => {
      this.projectData = projectData;
      console.log('this.projectData', JSON.stringify(this.projectData))
    }) 
   }

  ngOnInit(): void {

  }

}
