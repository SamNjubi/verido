import { TestBed } from "@angular/core/testing";

import { InstitutionMockServerService } from "./institution-mock-data.service";

describe("InstitutionMockServerService", () => {
  let service: InstitutionMockServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionMockServerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
