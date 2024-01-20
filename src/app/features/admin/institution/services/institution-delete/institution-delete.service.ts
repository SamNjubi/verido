import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class InstitutionDeleteService {
  private readonly api = "api/institutions/";

  constructor(private http: HttpClient) {}

  remove(id: string): Observable<void> {
    return this.http.delete<void>(this.api + id);
  }
}
