import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgbCollapseModule, NgbToastModule, NgbTooltipModule  } from "@ng-bootstrap/ng-bootstrap";
import { CoreModule } from "../../core/core.module";
import { BacklogComponent } from './backlog/backlog.component';
import { EstimateComponent } from './estimate/estimate.component';
import { DiscussComponent } from './discuss/discuss.component';
import { JDENTICON_CONFIG, NgxJdenticonModule } from "ngx-jdenticon";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    DashboardComponent,
    BacklogComponent,
    EstimateComponent,
    DiscussComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbTooltipModule,
        NgbToastModule,
        NgbCollapseModule,
        NgxJdenticonModule,
        CoreModule,
        FormsModule,
        SharedModule
    ],
  providers: [
    {
      // Custom identicon style
      // https://jdenticon.com/icon-designer.html?config=864444000141321e24501448
      provide: JDENTICON_CONFIG,
      useValue: {
        lightness: {
          color: [0.37, 0.81],
          grayscale: [0.20, 0.72]
        },
        saturation: {
          color: 0.51,
          grayscale: 0.30
        },
        backColor: "#0000"
      },
    }
  ],
})
export class DashboardModule { }
