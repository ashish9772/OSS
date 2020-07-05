import { TestBed } from '@angular/core/testing';

import { FormAsyncValService } from './form-async-val.service';

describe('FormAsyncValService', () => {
  let service: FormAsyncValService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAsyncValService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
