import { TestBed } from '@angular/core/testing';

import { TaskDetailsServiceService } from './task-details-service.service';

describe('TaskDetailsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskDetailsServiceService = TestBed.get(TaskDetailsServiceService);
    expect(service).toBeTruthy();
  });
});
