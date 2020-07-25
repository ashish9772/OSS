import { Component, OnInit } from '@angular/core';
import { ProjectListService } from '../services/project-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projectList: any;
  constructor(private proService: ProjectListService, private router: Router) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.proService.getProjectList().subscribe(res => {
      this.projectList = res;
    })
  }


  redirectToProjectPage(id) {
    this.router.navigate(['stt/taskboard/' + id]);
  }
}
