import { ApiService } from './../../shared/api.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectMemberService {
  constructor(private apiService: ApiService) { }
  projectmembers = [{
    role: { label: 'UI', value: 'ui' },
    members: [{ name: 'Naman' }, { name: 'Asish' }, { name: 'Anuj' }, { name: 'Binu' }]
  }, {
    role: { label: 'Java', value: 'java' },
    members: [{ name: 'Surender' }, { name: 'Ravi' }]
  }, {
    role: { label: 'Back End', value: 'backend' },
    members: [{ name: 'Kishan' }, { name: 'Amit' }]
  }];

  projectTeamMembers = [{ membernmae: 'Asish', role: 'UI' },
  { membernmae: 'Naman', role: 'UI' },
  { membernmae: 'Binu', role: 'UI' }, { membernmae: 'Anuj', role: 'UI' },
  { membernmae: 'Surender', role: 'JAVA' },
  { membernmae: 'Ravi', role: 'JAVA' },
  { membernmae: 'Kishan', role: 'Back End' },
  { membernmae: 'Amit', role: 'Back End' }]

  getProjectMembers(): Observable<any> {
    return of(this.projectmembers);
  }
  getprojectTeamMembers(): Observable<any> {
    return of(this.projectTeamMembers);
  }

  insertProjectDetails(data): Observable<any> {
    return this.apiService.post('postProjects', data);
}


}
