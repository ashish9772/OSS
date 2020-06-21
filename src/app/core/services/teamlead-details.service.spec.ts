import { TestBed } from '@angular/core/testing';

import { TeamleadDetailsService } from './teamlead-details.service';

describe('TeamleadDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamleadDetailsService = TestBed.get(TeamleadDetailsService);
    expect(service).toBeTruthy();
  });
});
