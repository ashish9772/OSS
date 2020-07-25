import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { ApiService } from 'src/app/core/services/api.service';
import { HttpParams } from '@angular/common/http';
@Injectable()
export class TaskBoardService {

  constructor(private apiService: ApiService) { }

  getProjectDetails(id): Observable<any> {
    return this.apiService.get('project-util/project/' + id);
  }
}
