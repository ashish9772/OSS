import { TestBed } from '@angular/core/testing';

import { TeamInformationService } from './team-information.service';

describe('TeamInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamInformationService = TestBed.get(TeamInformationService);
    expect(service).toBeTruthy();
  });
});
