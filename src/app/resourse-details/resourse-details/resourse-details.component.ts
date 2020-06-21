import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { TaskDetailsServiceService } from '../../project-details/task-details-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-resourse-details',
  templateUrl: './resourse-details.component.html',
  styleUrls: ['./resourse-details.component.scss']
})
export class ResourseDetailsComponent implements OnInit {
  memDefectsLength;
  tasksDataLength;
  memberIdeasDataLength;
  issuesDataLength;
  riskDataLength;
  blockerDataLength;
  memberstatuscount: any = [];

  constructor(public apiService: ApiService, private taskService: TaskDetailsServiceService, private spinner: NgxSpinnerService) {
    
  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.spinner.show();
    this.apiService.getProjectId1(environment.api_url + 'project-util/user-dashboard/' + localStorage.getItem('EINVALUE'))
      .subscribe(data => {
        if(data.status === 204){
            this.apiService.memberHaveProject = false;
          this.spinner.hide();
        } else {
          this.apiService.memberHaveProject = true;
          const body = data.body;
          console.log('memberdata', body);
          this.memberstatuscount = body['statusCounts'];
          console.log('statuscount', this.memberstatuscount);
          this.taskService.addMenberDefectsData.next(body['defects']);
          this.memDefectsLength = body['defects'].length;
  
          this.taskService.addMenberTasksData.next(body['tasks']);
          this.tasksDataLength = body['tasks'].length;
  
          this.taskService.addMenberIdeasData.next(body['ideas']);
          this.memberIdeasDataLength = body['ideas'].length;
  
          // this.taskService.addMenberMileStoneFormData.next(data['mileStones']);
  
          this.taskService.addMenberPriorityIssueFormData.next(body['issues']);
          this.issuesDataLength = body['issues'].length;
  
          this.taskService.addMenberRiskFormData.next(body['risks']);
          this.riskDataLength = body['risks'].length;
  
          this.taskService.addMenberTechnicalBlockerFormData.next(body['blockers']);
          this.blockerDataLength = body['blockers'].length;
          this.spinner.hide();
        }
      }, err => {
        this.spinner.hide();
      });

  }
}
