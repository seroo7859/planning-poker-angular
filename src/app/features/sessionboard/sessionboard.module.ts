import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionboardRoutingModule } from './sessionboard-routing.module';
import { SessionboardComponent } from './sessionboard.component';
import {
  NgbActiveOffcanvas,
  NgbCollapseModule,
  NgbDropdownModule,
  NgbOffcanvasModule,
  NgbPopoverModule,
  NgbToastModule,
  NgbTooltipModule
} from "@ng-bootstrap/ng-bootstrap";
import { CoreModule } from "../../core/core.module";
import { BacklogComponent } from './backlog/backlog.component';
import { EstimationComponent } from './estimation/estimation.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { JDENTICON_CONFIG, NgxJdenticonModule } from "ngx-jdenticon";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { NgChartsModule } from "ng2-charts";
import { QRCodeModule } from "angularx-qrcode";

@NgModule({
  declarations: [
    SessionboardComponent,
    BacklogComponent,
    EstimationComponent,
    DiscussionComponent
  ],
  imports: [
    CommonModule,
    SessionboardRoutingModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbToastModule,
    NgbCollapseModule,
    NgbOffcanvasModule,
    NgbPopoverModule,
    NgxJdenticonModule,
    NgChartsModule,
    CoreModule,
    FormsModule,
    SharedModule,
    NgChartsModule,
    QRCodeModule
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
    },
    NgbActiveOffcanvas
  ],
})
export class SessionboardModule { }
