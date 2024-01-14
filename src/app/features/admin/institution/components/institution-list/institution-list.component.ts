import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { InstitutionFormComponent } from "../institution-form/institution-form.component";

@Component({
  selector: "app-institution-list",
  templateUrl: "./institution-list.component.html",
  styleUrls: ["./institution-list.component.scss"],
})
export class InstitutionListComponent implements OnDestroy {
  private destroyed$ = new Subject();

  constructor(route: ActivatedRoute, private modalService: NgbModal) {
    route.queryParamMap
      .pipe(
        filter((params) => params.has("modal")),
        takeUntil(this.destroyed$)
      )
      .subscribe((params) => this.openModal(params.get("modal")));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private openModal(id?: string): void {
    const modal = this.modalService.open(InstitutionFormComponent, {
      backdrop: "static",
      centered: true,
      fullscreen: "sm",
    });
    modal.componentInstance.id = id;
    modal.closed.pipe(takeUntil(this.destroyed$)).subscribe((res) => {});
  }
}
