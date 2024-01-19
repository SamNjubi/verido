import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  InstitutionList,
  InstitutionPagination,
  InstitutionSort,
} from "../../components/institution-list/institution-list.model";
import { Institution } from "../../institution.model";

@Injectable()
export class InstitutionListService {
  private readonly api = "api/institutions/";

  constructor(private http: HttpClient) {}

  search(
    offset: number,
    limit: number,
    sort: InstitutionSort[]
  ): Observable<InstitutionList> {
    return this.http.get<Institution[]>(this.api).pipe(
      map((institutions) => {
        const [{ dir: sortDir, prop: sortColumn }] = sort;
        const data = institutions
          .sort(
            (a, b) =>
              a[sortColumn].localeCompare(b[sortColumn]) *
              (sortDir === "asc" ? 1 : -1)
          )
          .slice(offset, (offset + 1) * limit);
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
