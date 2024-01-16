import { Institution } from "../../institution.model";

export class InstitutionPagination {
  offset: number = 0;
  limit: number = 10;
  count: number;
}

export interface InstitutionList {
  pagination: InstitutionPagination;
  data: Institution[];
}
