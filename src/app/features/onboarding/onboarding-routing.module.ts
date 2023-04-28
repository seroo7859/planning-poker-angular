import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from "./onboarding.component";
import { CreateSessionComponent } from "./create-session/create-session.component";
import { JoinSessionComponent } from "./join-session/join-session.component";

const routes: Routes = [
  {
    path: '',
    component: OnboardingComponent,
    children: [
      {
        path: 'create-session',
        component: CreateSessionComponent
      },
      {
        path: 'join-session',
        component: JoinSessionComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
