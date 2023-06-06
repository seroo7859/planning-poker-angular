import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { CoreModule } from "../../core/core.module";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbToastModule,
    CoreModule
  ]
})
export class DashboardModule { }
