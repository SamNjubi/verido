import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "institution",
    loadChildren: () =>
      import("./institution/institution.module").then(
        (m) => m.InstitutionModule
      ),
  },
  {
    path: "consultant",
    loadChildren: () =>
      import("./consultant/consultant.module").then((m) => m.ConsultantModule),
  },
  {
    path: "business-owner",
    loadChildren: () =>
      import("./business-owner/business-owner.module").then(
        (m) => m.BusinessOwnerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
