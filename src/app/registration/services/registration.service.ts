import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { ApiService } from 'src/app/core/services/api.service';
import { Registeration } from '../../core/models';
@Injectable()
export class RegistrationService {

  constructor(private apiService: ApiService) { }

  registerUser(register: Registeration): Observable<any>{
    return this.apiService.post('/api/auth/register', register).pipe(
      tap( _ => console.log(_))
    );
  }
}
