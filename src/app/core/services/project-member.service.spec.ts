import { TestBed } from '@angular/core/testing';

import { ProjectMemberService } from './project-member.service';

describe('ProjectMemberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectMemberService = TestBed.get(ProjectMemberService);
    expect(service).toBeTruthy();
  });
});
