import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TeamInformationService } from '../../core/services/team-information.service';
import { TeamleadDetailsService } from '../../core/services/teamlead-details.service';
import {TabViewModule} from 'primeng/tabview';

@Component({
  selector: 'app-team-information',
  templateUrl: './team-information.component.html',
  styleUrls: ['./team-information.component.scss']
})
export class TeamInformationComponent implements OnInit {
  roles: any;
  teamDetails: any = [];
  cols: any = [];
  taskheader: any = [];
  teamleadinfo: any = [];
  teamLeads: any = [];
  teamtaskInfo: any = [];
  // Dynamic Header for Prime Ng
  getRoleValue(value) {
    console.log("value ======>", value);
    if (value === 'teamlead') {
      this.teamLeads = [{ name: 'Surenther', value: 'teamleadoss' }, {
        name: 'Ravi', value: 'teamleadauto'
      }];
    } else {
      this.teamLeads = [];
      this.teamDetails = [];
      this.teamtaskInfo = [];
    }
  }
  getteamleadValue(value) {
    if (value === 'teamleadoss') {
      this.cols = [
        { field: 'lead', header: 'Team Lead Name' },
        { field: 'team_name', header: 'Team Name' },
        { field: 'name', header: 'Developer Name' },
        { field: 'project', header: 'Project Name' },
        { field: 'workinghours', header: 'Working Hours' },
        { field: 'workingdetails', header: 'Working Details' },
        { field: 'date', header: 'Date' },
      ];
      // this.teamlead.getTeamLead().subscribe(data => this.teamleadinfo = data);
      this.teamlead.getAllteamdetails().subscribe(data => this.teamDetails = data);
    } else {
      this.teamDetails = [];
      this.teamtaskInfo = [];
    }
  }
  getPreviousDetauls(value, content) {

    if (value === "Binu") {
      this.taskheader = [
        { field: 'date', header: 'Date' },
        { field: 'task', header: 'Task' },
        { field: 'status', header: 'Status' }
      ];
      this.teamlead.getTeamDetails().subscribe(data => this.teamtaskInfo = data);
      this.modalService.open(content);
    }

  }
  constructor(config: NgbModalConfig, private teamlead: TeamInformationService, private teaminfo: TeamleadDetailsService, private modalService: NgbModal) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.teamlead.getAllteamRole().subscribe(data => this.roles = data);
  }

}
