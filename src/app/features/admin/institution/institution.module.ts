import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedComponentsModule } from "src/app/shared/components/shared-components.module";
import { InstitutionRoutingModule } from "./institution-routing.module";
import { InstitutionListComponent } from "./components/institution-list/institution-list.component";
import { InstitutionFormComponent } from "./components/institution-form/institution-form.component";
import { InstitutionMockDataService } from "./services/institution-mock-server/institution-mock-data.service";

@NgModule({
  declarations: [InstitutionListComponent, InstitutionFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forFeature(InstitutionMockDataService),
    NgxPaginationModule,
    NgxDatatableModule,
    InstitutionRoutingModule,
    SharedComponentsModule,
  ],
})
export class InstitutionModule {}
