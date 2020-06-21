import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  employeedetails: any[] = [
    { index: '1', empName: 'Naman', empProject: 'Auto fix', empIdea: 'insatll Node.js', empTech: 'Node.js' },
    { index: '2', empName: 'Asish', empProject: 'WFMT', empIdea: 'mongo DB', empTech: 'Node.js' },
    { index: '3', empName: 'Binu', empProject: 'Auto fix', empIdea: 'Learning', empTech: 'Angular2+' },
    { index: '4', empName: 'Anuj', empProject: 'Chat Bot', empIdea: 'Installing Chat Bot', empTech: 'Python' }
  ];
  constructor() { }
  getAllEmpIdea(): Observable<any> {
    return of(this.employeedetails);
  }
}
