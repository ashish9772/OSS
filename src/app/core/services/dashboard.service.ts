import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  ossData;
  defectsdata = [{ defectid: '1', defectdes: 'Alert is not working', eta: '21/12/2019', priority: 'High', status: 'Open' }, {
    defectid: '2', defectdes: 'Data is not visible in dashboard', eta: '23/12/2019', priority: 'High', status: 'In Progress'
  }, {
    defectid: '3', defectdes: '404 error in resourse page', eta: '25/12/2019', priority: 'Medium', status: 'Closed'
  }, {
    defectid: '4', defectdes: 'Calander is not alligned', eta: '30/12/2019', priority: 'Low', status: 'Open'
  }];
  projectDetails = [{ project_name: 'Auto Fix', project_id: '25678', status: 'Not Started' },
  { project_name: 'WFMT Automation', project_id: '25679', status: 'Ongoing' },
  { project_name: 'OpenReach', project_id: '25670', status: 'Ongoing' },
  { project_name: 'OpenReach', project_id: '25670', status: 'Ongoing' },
  { project_name: 'Plus Net', project_id: '25670', status: 'Success' }];
  data = {
    datasets: [{
      data: [
        20,
        20,
        10,
        10,
        16
      ],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#f70d1a',
        '#36A2EB'
      ],
      label: 'My dataset'
    }],
    labels: [
      'FRONT END DEVELOPER',
      'BACK END DEVELOPER',
      'INFRA',
      'AUTOMATION TESTER',
      'MANUAL TESTER'
    ]
  };

  constructor() { }
  // getDefectdata(): Observable<any> {
  //   return of(this.projectDetails);
  // }
  getprojectDetails(): Observable<any> {
    return of(this.data);
  }
  projectDefectStatus(): Observable<any> {
    return of(this.defectsdata);
  }
  getSkillsetCount() {
    let skillCountLabel = Object.keys(this.ossData.skillOssMemberCount);
    let skillCountValue = Object.values(this.ossData.skillOssMemberCount)
    let skillCountData = {
      datasets: [{
        data: skillCountValue,
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#f70d1a',
          '#36A2EB'
        ],
        label: 'My dataset'
      }],
      labels: skillCountLabel
    };
    return of(skillCountData)
  }

  getTechnicalBlocker() {
    let skillCountLabel = Object.keys(this.ossData.blockers);
    let skillCountValue = Object.values(this.ossData.blockers);
    let skillCountData = {
      datasets: [{
        data: skillCountValue,
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#f70d1a',
          '#36A2EB'
        ],
        label: 'My dataset'
      }],
      labels: skillCountLabel
    };
    return of(skillCountData)
  }
  getHighPriorityIssues() {
    let skillCountLabel = Object.keys(this.ossData.issues);
    let skillCountValue = Object.values(this.ossData.issues);
    let skillCountData = {
      datasets: [{
        data: skillCountValue,
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#f70d1a',
          '#36A2EB',
          '#0080ff',
          '#00ff00',
          '#ffff00',
          '#ff6699',
          '#ff6666'
        ],
        label: 'My dataset'
      }],
      labels: skillCountLabel
    };
    return of(skillCountData)
  }
  getDefectdata() {
    let skillCountLabel = Object.keys(this.ossData.defects);
    let skillCountValue = Object.values(this.ossData.defects);
    let skillCountData = {
      datasets: [{
        data: skillCountValue,
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#f70d1a',
          '#36A2EB'
        ],
        label: 'My dataset'
      }],
      labels: skillCountLabel
    };
    return of(skillCountData)
  }
  risks() {
    let skillCountLabel = Object.keys(this.ossData.risks);
    let skillCountValue = Object.values(this.ossData.risks);
    let skillCountData = {
      datasets: [{
        data: skillCountValue,
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#f70d1a',
          '#36A2EB'
        ],
        label: 'My dataset'
      }],
      labels: skillCountLabel
    };
    return of(skillCountData)
  }

}
