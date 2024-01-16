import { Injectable } from "@angular/core";
import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { faker } from "@faker-js/faker";
import { Institution } from "../../institution.model";

@Injectable({
  providedIn: "root",
})
export class InstitutionMockDataService implements InMemoryDbService {
  constructor() {}

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const institutions: Institution[] = Array.from(
      { length: 42 },
      (_, index) => ({
        id: index + 1,
        name: faker.company.name(),
      })
    );
    return { institutions };
  }

  genId(institutions: Institution[]): number {
    const max = Math.max(...institutions.map((x) => x.id));
    return max == 0 ? max + 1 : 22;
  }
}
