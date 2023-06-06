import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from "./features.component";
import { authGuard } from "../core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        redirectTo: 'onboarding',
        pathMatch: 'full'
      },
      {
        path: 'onboarding',
        loadChildren: () => import('./onboarding/onboarding.module').then((mod) => mod.OnboardingModule),
        data: { preload: true }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule),
        data: { preload: true },
        canActivate: [authGuard]
      },
      {
        path: '**',
        redirectTo: 'onboarding',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
