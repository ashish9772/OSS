import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../../core/services/dashboard.service';
import { ProjectConfigService } from '../../core/services/project-config.service';
import { ApiService } from '../../shared/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  header: any;
  data: any;
  status$: Observable<any>;
  projectsatus$: Observable<any>;
  tasks: any;
  ossData: any = [];
  skillCount$: Observable<any>
  blockersCount$: Observable<any>;
  defectCount$: Observable<any>;
  highPriorityIsuue$: Observable<any>;
  risks$: Observable<any>;
  status: any;

  skillCountStatus = false;
  blockersCountStatus = false;
  defectCountStatus = false;
  highPriorityIsuueStatus = false;
  riskStatus = false;

  constructor(private dashservice: DashboardService, private projectConfigService: ProjectConfigService, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getProjectId(environment.api_url + 'project-util/oss-dashboard-data').subscribe((res) => {
      
      this.ossData = res;
      this.dashservice.ossData = res;
      this.skillCount$ = this.dashservice.getSkillsetCount();
      this.blockersCount$ = this.dashservice.getTechnicalBlocker();
      this.defectCount$ = this.dashservice.getDefectdata();
      this.highPriorityIsuue$ = this.dashservice.getHighPriorityIssues();
      this.risks$ = this.dashservice.risks();
      this.skillCount$.subscribe((response) => {
        this.skillCountStatus = response.datasets[0].data.length > 0;
      });
      this.blockersCount$.subscribe((response) => {
        this.blockersCountStatus = response.datasets[0].data.length > 0;
      });
      this.defectCount$.subscribe((response) => {
        this.defectCountStatus = response.datasets[0].data.length > 0;
      });
      this.highPriorityIsuue$.subscribe((response) => {
        this.highPriorityIsuueStatus = response.datasets[0].data.length > 0;
      });
      this.risks$.subscribe((response)=>{
        this.riskStatus = response.datasets[0].data.length > 0;
      });
    });
    this.header = [{ field: 'projectname', header: 'Project Name' },
    { field: 'projectid', header: 'Project ID' },
    { field: 'projectstatus', header: 'Status' }];
    this.status$ = this.projectConfigService.getProjectList();
    this.status = [
      { label: 'Ongoing', value: 'Ongoing' },
      { label: 'Deliverd', value: 'Deliverd' },
      { label: 'Not Started', value: 'Not Started' }
    ];


    this.projectsatus$ = this.dashservice.getprojectDetails();
    this.tasks =
      {
        "data": [
          { "project": "WFMT", "taskDesc": 'State Management Issue', "status": "high" },
          { "project": "WFMT", "taskDesc": 'Automatic WorkFlow', "status": "high" },
          { "project": "WFMT", "taskDesc": 'NGRX Issues', "status": "medium" },
          { "project": "WFMT", "taskDesc": 'Tab Issues', "status": "high" },
          { "project": "Capacity Planning", "taskDesc": '3d Issues', "status": "low" },
          { "project": "Capacity Planning", "taskDesc": 'Unit Testing', "status": "low" },
          { "project": "Newtork Cloud", "taskDesc": 'Api Issues', "status": "medium" }
        ]
      };

 
  }

  onRowEditInit() {
  }

  onRowEditSave() {

  }

  onRowEditCancel() {

  }

}
