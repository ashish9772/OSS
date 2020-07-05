import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { RegistrationService } from './registration.service';

@Injectable()
export class FormAsyncValService implements AsyncValidator {

  constructor(private apiService: ApiService, private registerService: RegistrationService) { }

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return of()
  }
}
