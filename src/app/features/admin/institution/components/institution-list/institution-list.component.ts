import { Component, OnDestroy, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subscription, Observable } from "rxjs";
import { filter, finalize, switchMap, tap } from "rxjs/operators";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { InstitutionFormComponent } from "../institution-form/institution-form.component";
import { InstitutionListService } from "../../services/institution-list/institution-list.service";
import { Institution } from "../../institution.model";
import {
  InstitutionList,
  InstitutionPagination,
} from "./institution-list.model";

@Component({
  selector: "app-institution-list",
  templateUrl: "./institution-list.component.html",
  styleUrls: ["./institution-list.component.scss"],
  providers: [InstitutionListService],
})
export class InstitutionListComponent implements OnDestroy {
  isLoading: boolean;
  rows: Institution[] = [];
  columns = [{ name: "Name" }];
  pagination = new InstitutionPagination();
  paginate = new EventEmitter<InstitutionPagination>();

  private modal: NgbModalRef;
  private subscription = new Subscription();
  private paginate$ = new BehaviorSubject<InstitutionPagination>(
    this.pagination
  );

  constructor(
    route: ActivatedRoute,
    private modalService: NgbModal,
    private institutionListService: InstitutionListService
  ) {
    this.subscription.add(
      this.paginate.subscribe((pagination) => this.paginate$.next(pagination))
    );
    this.subscription.add(
      this.paginate$
        .asObservable()
        .pipe(
          tap(() => (this.isLoading = true)),
          switchMap((page) => this.loadInstitutions(page))
        )
        .subscribe()
    );
    this.subscription.add(
      route.queryParamMap
        .pipe(filter((params) => params.has("modal")))
        .subscribe((params) => this.loadModal(params.get("modal")))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadModal(id?: string): void {
    this.modal && this.modal?.dismiss();
    this.modal = this.modalService.open(InstitutionFormComponent, {
      backdrop: "static",
      centered: true,
      fullscreen: "sm",
    });
    this.modal.componentInstance.id = id;
    this.subscription.add(this.modal.closed.subscribe((res) => {}));
  }

  private loadInstitutions(
    pagination: InstitutionPagination
  ): Observable<InstitutionList> {
    return this.institutionListService
      .search(pagination.offset, pagination.limit)
      .pipe(
        tap((result) => {
          this.rows = result.data;
          this.pagination = result.pagination;
        }),
        finalize(() => (this.isLoading = false))
      );
  }
}
