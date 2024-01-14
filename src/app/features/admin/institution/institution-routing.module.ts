import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotImplementedComponent } from "src/app/shared/components/page-not-implemented/page-not-implemented.component";
import { InstitutionListComponent } from "./components/institution-list/institution-list.component";

const routes: Routes = [
  {
    path: "",
    component: InstitutionListComponent,
  },
  {
    path: ":id",
    component: PageNotImplementedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionRoutingModule {}
