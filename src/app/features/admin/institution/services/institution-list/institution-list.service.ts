import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  InstitutionList,
  InstitutionPagination,
} from "../../components/institution-list/institution-list.model";
import { Institution } from "../../institution.model";

@Injectable()
export class InstitutionListService {
  private readonly api = "api/institutions/";

  constructor(private http: HttpClient) {}

  search(offset: number, limit: number): Observable<InstitutionList> {
    return this.http.get<Institution[]>(this.api).pipe(
      map((institutions) => {
        const data = institutions.slice(offset, (offset + 1) * limit);
        const pagination: InstitutionPagination = {
          offset,
          limit,
          count: institutions.length,
        };
        return { data, pagination };
      })
    );
  }
}
