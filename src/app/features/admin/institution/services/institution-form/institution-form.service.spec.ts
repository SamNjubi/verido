import { TestBed } from '@angular/core/testing';

import { InstitutionFormService } from './institution-form.service';

describe('InstitutionFormService', () => {
  let service: InstitutionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
