import { TestBed } from '@angular/core/testing';

import { InstitutionDeleteService } from './institution-delete.service';

describe('InstitutionDeleteService', () => {
  let service: InstitutionDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
