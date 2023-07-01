import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionboardComponent } from "./sessionboard.component";
import { sessionGuard } from "../../core/guards/session.guard";

const routes: Routes = [
  {
    path: '',
    component: SessionboardComponent,
    pathMatch: 'full',
    canActivate: [sessionGuard]
  },
  {
    path: ':id',
    component: SessionboardComponent,
    canActivate: [sessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionboardRoutingModule { }
