import { TestBed } from '@angular/core/testing';

import { InstitutionListService } from './institution-list.service';

describe('InstitutionListService', () => {
  let service: InstitutionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
