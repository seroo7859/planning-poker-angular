import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { JoinSessionComponent } from './join-session/join-session.component';


@NgModule({
  declarations: [
    OnboardingComponent,
    CreateSessionComponent,
    JoinSessionComponent
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule
  ]
})
export class OnboardingModule { }
