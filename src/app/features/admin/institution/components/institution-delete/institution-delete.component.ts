import { Component, Input, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { InstitutionDeleteService } from "../../services/institution-delete/institution-delete.service";

@Component({
  selector: "app-institution-delete",
  templateUrl: "./institution-delete.component.html",
  styleUrls: ["./institution-delete.component.scss"],
  providers: [InstitutionDeleteService],
})
export class InstitutionDeleteComponent implements OnDestroy {
  @Input() id: string;

  private subscription = new Subscription();

  constructor(
    private modal: NgbActiveModal,
    private institutionDeleteService: InstitutionDeleteService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  dismiss(): void {
    this.modal.dismiss();
  }

  remove(): void {
    this.subscription.add(
      this.institutionDeleteService
        .remove(this.id)
        .subscribe(() => this.modal.close())
    );
  }
}
