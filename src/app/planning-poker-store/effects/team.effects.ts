import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastService } from "../../core/services/toast.service";
import { TeamActions } from "../actions";
import { map } from "rxjs/operators";

@Injectable()
export class TeamEffects {

  constructor(private actions$: Actions, private toastService: ToastService) {}

  teamMemberJoined$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeamActions.teamMemberJoined),
      map(action => {
        this.toastService.showInfo({ text: `${action.teamMember.name} join the session` })
      })
    );
  }, { dispatch: false });

  teamMemberLeaved$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeamActions.teamMemberLeaved),
      map(action => {
        this.toastService.showInfo({ text: `${action.teamMember.name} leave the session` })
      })
    );
  }, { dispatch: false });

}
