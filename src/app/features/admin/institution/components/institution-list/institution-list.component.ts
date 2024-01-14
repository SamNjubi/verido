import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { filter, takeUntil, tap } from "rxjs/operators";
import { Subject } from "rxjs";
import { InstitutionFormComponent } from "../institution-form/institution-form.component";

@Component({
  selector: "app-institution-list",
  templateUrl: "./institution-list.component.html",
  styleUrls: ["./institution-list.component.scss"],
})
export class InstitutionListComponent implements OnDestroy {
  private destroyed$ = new Subject();
  private modal: NgbModalRef;

  constructor(route: ActivatedRoute, private modalService: NgbModal) {
    route.queryParamMap
      .pipe(
        filter((params) => params.has("modal")),
        takeUntil(this.destroyed$)
      )
      .subscribe((params) => this.loadModal(params.get("modal")));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private loadModal(id?: string): void {
    this.modal && this.modal?.dismiss();
    this.modal = this.modalService.open(InstitutionFormComponent, {
      backdrop: "static",
      centered: true,
      fullscreen: "sm",
    });
    this.modal.componentInstance.id = id;
    this.modal.closed.pipe(takeUntil(this.destroyed$)).subscribe((res) => {});
  }
}
