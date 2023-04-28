import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OnboardingComponent} from "../onboarding/onboarding.component";
import {CreateSessionComponent} from "../onboarding/create-session/create-session.component";
import {JoinSessionComponent} from "../onboarding/join-session/join-session.component";
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
