import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamleadDetailsService {
  teamLeads = [{
    Leadname: 'Surender',
    // tslint:disable-next-line:max-line-length
    team: [{ name: 'Naman', task: '', workinghours: '', workingdetails: '' }, { name: 'Binu', workinghours: '', workingdetails: '', task: '' }],
    type: 'lead'
  },
  {
    Leadname: 'Ravi',
    // tslint:disable-next-line:max-line-length
    team: [{ name: 'Asish', workinghours: '', workingdetails: '', task: '' }, { name: 'Mayuri', workinghours: '', workingdetails: '', task: '' }],
    type: 'lead'
  }];
  projectDetails = [{
    projectId: 216056,
    projectname: 'Transformation',
    spoc: 'Surendra Yadav /Naman'
  }, {
    projectId: 217826,
    projectname: 'AUTOMATION',
    spoc: 'Sheik /Allah Rakha'
  }, {
    projectId: 216419,
    projectname: 'Rewrite',
    spoc: 'Ravisankar /Suvarna'
  }];
  // Chart Data
  pieChartdata = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [10, 25, 30],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ]
      }]
  };

  getAllteamDeatils(): Observable<any> {
    return of(this.teamLeads);
  }
  getAllProjectDetails(): Observable<any> {
    return of(this.projectDetails);
  }
  getPieChartData(): Observable<any> {
    return of(this.pieChartdata);
  }
  extractDetails(values) {
    let detailsResourseValue = [];
    for (let i = 0; i < this.teamLeads.length; i++) {
       this.teamLeads[i].team.filter(data => {
        if (data.name == values) {
          detailsResourseValue.push(data);
        }
      })
    }    
    return detailsResourseValue;
  }
  extractprojectDetails(details, value) {
    // tslint:disable-next-line:radix
    const values = parseInt(value);
    const detailsProjectValue = details.filter(data => {
      if (data.projectId === values) {
        return data;
      }
    });
    return detailsProjectValue;
  }
  constructor() { }
}
