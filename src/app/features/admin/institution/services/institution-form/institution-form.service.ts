import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Institution } from "../../institution.model";

@Injectable()
export class InstitutionFormService {
  private readonly api = "api/institutions/";

  constructor(private http: HttpClient) {}

  private add(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(this.api, institution);
  }

  private update(institution: Institution): Observable<Institution> {
    return this.http.put<Institution>(this.api + institution.id, institution);
  }

  get(id: string): Observable<Institution> {
    return this.http.get<Institution>(this.api + id);
  }

  save(institution: Institution): Observable<Institution> {
    return institution.id ? this.update(institution) : this.add(institution);
  }
}
