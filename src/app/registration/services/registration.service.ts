import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators'

@Injectable()
export class RegistrationService {

  constructor() { }

  registerUser(): Observable<any>{
    return of({}).pipe(delay(500))
  }
}
