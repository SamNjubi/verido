import {
  Component,
  OnDestroy,
  EventEmitter,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import {
  BehaviorSubject,
  Subscription,
  Observable,
  race,
  combineLatest,
} from "rxjs";
import { filter, finalize, startWith, switchMap, tap } from "rxjs/operators";
import { ColumnMode, TableColumn } from "@swimlane/ngx-datatable";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { InstitutionFormComponent } from "../institution-form/institution-form.component";
import { InstitutionListService } from "../../services/institution-list/institution-list.service";
import { Institution } from "../../institution.model";
import {
  InstitutionList,
  InstitutionPagination,
  InstitutionSort,
} from "./institution-list.model";

@Component({
  selector: "app-institution-list",
  templateUrl: "./institution-list.component.html",
  styleUrls: ["./institution-list.component.scss"],
  providers: [InstitutionListService],
})
export class InstitutionListComponent implements AfterViewInit, OnDestroy {
  isLoading: boolean;
  rows: Institution[] = [];
  columns: TableColumn[];
  columnMode = ColumnMode;
  pagination = new InstitutionPagination();
  paginate = new EventEmitter<InstitutionPagination>();
  sort = new EventEmitter<any>();
  search = new FormControl();

  @ViewChild("statusCell") statusTemplateRef: TemplateRef<any>;
  @ViewChild("actionsCell") actionsTemplateRef: TemplateRef<any>;

  private modal: NgbModalRef;
  private subscription = new Subscription();
  private paginate$ = new BehaviorSubject<InstitutionPagination>(
    this.pagination
  );
  private sort$ = new BehaviorSubject<InstitutionSort[]>([
    new InstitutionSort(),
  ]);

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
    private institutionListService: InstitutionListService
  ) {
    this.subscription
      .add(this.sort.subscribe((sort) => this.sort$.next(sort)))
      .add(
        this.paginate.subscribe((pagination) => this.paginate$.next(pagination))
      )
      .add(
        combineLatest([
          this.paginate$.asObservable(),
          this.sort$.asObservable(),
          this.search.valueChanges.pipe(startWith("")),
        ])
          .pipe(
            tap(() => (this.isLoading = true)),
            switchMap(([page, sort, search]) =>
              this.loadInstitutions(page, sort, search)
            )
          )
          .subscribe()
      )
      .add(
        route.queryParamMap
          .pipe(filter((params) => params.has("modal")))
          .subscribe((params) => this.loadModal(params.get("modal")))
      );
  }

  ngAfterViewInit(): void {
    this.columns = [
      {
        name: "Name",
        flexGrow: 4,
      },
      {
        name: "Status",
        flexGrow: 2,
        cellTemplate: this.statusTemplateRef,
      },
      {
        name: "Actions",
        flexGrow: 1,
        sortable: false,
        headerClass: "text-center",
        cellClass: "text-center",
        cellTemplate: this.actionsTemplateRef,
      },
    ];
    this.ref.detectChanges();
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
    this.subscription.add(
      race(this.modal.closed, this.modal.dismissed).subscribe((res) =>
        this.router.navigateByUrl("/admin/institution")
      )
    );
  }

  private loadInstitutions(
    pagination: InstitutionPagination,
    sort: InstitutionSort[],
    search: string
  ): Observable<InstitutionList> {
    return this.institutionListService
      .search(pagination.offset, pagination.limit, sort, search)
      .pipe(
        tap((result) => {
          this.rows = result.data;
          this.pagination = result.pagination;
        }),
        finalize(() => (this.isLoading = false))
      );
  }
}
