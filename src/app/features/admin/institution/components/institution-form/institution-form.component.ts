import { Component, Input, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { InstitutionFormService } from "../../services/institution-form/institution-form.service";
import { Institution } from "../../institution.model";

@Component({
  selector: "app-institution-form",
  templateUrl: "./institution-form.component.html",
  styleUrls: ["./institution-form.component.scss"],
  providers: [InstitutionFormService],
})
export class InstitutionFormComponent implements OnDestroy {
  @Input()
  set id(value: string) {
    if (!value) {
      return;
    }
    this.isLoading = true;
    const subscription = this.institutionFormService
      .get(value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((institution) => this.form.patchValue(institution));
    this.subscription.add(subscription);
  }

  isLoading = false;
  isSaving = false;
  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });

  private subscription = new Subscription();

  constructor(
    private modal: NgbActiveModal,
    private institutionFormService: InstitutionFormService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return control.touched && control.invalid;
  }

  hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return control.errors[error];
  }

  dismiss(): void {
    this.modal.dismiss();
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.isSaving = true;
    const institution = this.form.value as Institution;
    const subscription = this.institutionFormService
      .save(institution)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe(() => this.modal.close(institution));
    this.subscription.add(subscription);
  }
}
