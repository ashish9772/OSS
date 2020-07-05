import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  memberworkDetails = { ein: '', tasks: [], defects: [], blockers: [], ideas: [], issues: [], risks: []};
  constructor(private dbService: DashboardService) { }

  ngOnInit(): void {
    this.getMemberWorkDetails();
  }

  getMemberWorkDetails() {
    const url = 'project-util/user-dashboard/';
    this.dbService.getMemberDashboardDetails(url).subscribe(res => {
      this.memberworkDetails = res;
    })
  }

}
