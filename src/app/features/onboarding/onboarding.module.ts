import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { JoinSessionComponent } from './join-session/join-session.component';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../shared/shared.module";
import { CoreModule } from "../../core/core.module";


@NgModule({
  declarations: [
    OnboardingComponent,
    CreateSessionComponent,
    JoinSessionComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        OnboardingRoutingModule,
        NgbTooltipModule,
        SharedModule,
        CoreModule
    ]
})
export class OnboardingModule { }
