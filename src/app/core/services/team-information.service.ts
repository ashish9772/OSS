import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamInformationService {
  teamRole: any = [{
    label: 'Team Lead', value: 'teamlead'
  }, {
    label: 'Developer', value: 'developer'
  }, {
    label: 'Designer', value: 'designer'
  }];
  teamLeads = [{
    Leadname: 'Surender',
    // tslint:disable-next-line:max-line-length
    team: [{ name: 'Naman', workinghours: '8', workingdetails: 'Creating Page', futureworkingdetails: 'Login' }, { name: 'Binu', workinghours: '9', workingdetails: 'Create autofix design', futureworkingdetails: 'complete design' }],
    type: 'lead'
  },
  {
    Leadname: 'Ravi',
    // tslint:disable-next-line:max-line-length
    team: [{ name: 'Asish', workinghours: '9', workingdetails: 'Creating Page', futureworkingdetails: 'Login' }, { name: 'Mayuri', workinghours: '9', workingdetails: 'Create', futureworkingdetails: 'Create' }],
    type: 'lead'
  }];
  teamdetails: any = [{
    lead: 'team_lead_name',
    team_name: 'OSS',
    name: 'Binu',
    project: 'Core Srims',
    workinghours: '8',
    workingdetails: 'creating login page',
    date: '12/12/19'
  }, {
    lead: 'team_lead_name1',
    team_name: 'OSS',
    name: 'Asish',
    project: 'Core Srims',
    workinghours: '8',
    workingdetails: 'creating dummy Json page',
    date: '13/12/19'
  }, {
    lead: 'team_lead_name2',
    team_name: 'OSS',
    name: 'Naman',
    project: 'Core Srims',
    workinghours: '8',
    workingdetails: 'creating entire project flow page',
    date: '14/12/19'
  }];
  //Binu tasks
  tasks: any = [{
    date: '09/12/2019',
    task: 'Login Page',
    status: 'Completed'
  }, {
    date: '10/12/2019',
    task: 'Resourse Page',
    status: 'Completed'
  }, {
    date: '10/12/2019',
    task: 'Project Details Page',
    status: 'Completed'
  }, {
    date: '10/12/2019',
    task: 'Next',
    status: 'Completed'
  }, {
    date: '10/12/2019',
    task: 'None',
    status: 'Completed'
  }];
  constructor() { }
  getAllteamRole(): Observable<any> {
    return of(this.teamRole);
  }
  getAllteamdetails(): Observable<any> {
    return of(this.teamdetails);
  }
  getTeamDetails(): Observable<any> {
    return of(this.tasks);
  }
}
