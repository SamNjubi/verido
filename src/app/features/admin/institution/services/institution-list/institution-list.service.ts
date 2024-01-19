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
    sort: InstitutionSort[],
    search: string
  ): Observable<InstitutionList> {
    return this.http.get<Institution[]>(this.api).pipe(
      map((institutions) => {
        const [{ dir: sortDir, prop: sortColumn }] = sort;
        const filtered = institutions.filter((x) =>
          x.name.toLowerCase().startsWith(search.toLowerCase())
        );
        const sorted = filtered.sort(
          (a, b) =>
            a[sortColumn].localeCompare(b[sortColumn]) *
            (sortDir === "asc" ? 1 : -1)
        );
        const count = filtered.length;
        const sliced = sorted.slice(offset, (offset + 1) * limit);
        const pagination: InstitutionPagination = {
          offset,
          limit,
          count,
        };
        return { data: sliced, pagination };
      })
    );
  }
}
