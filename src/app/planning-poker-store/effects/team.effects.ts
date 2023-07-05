import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastService } from "../../core/services/toast.service";
import { TeamActions } from "../actions";
import { catchError, map } from "rxjs/operators";
import { exhaustMap, of, withLatestFrom } from "rxjs";
import { SessionSelectors, UserSelectors } from "../selectors";
import { Store } from "@ngrx/store";
import { TeamService } from "../../core/services/team.service";

@Injectable()
export class TeamEffects {

  constructor(
    private actions$: Actions,
    private readonly store: Store,
    private teamService: TeamService,
    private toastService: ToastService
  ) {}

  renameTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.renameTeam),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.teamService.renameTeam(session.data!.id, action.name).pipe(
          map(team => TeamActions.renameTeamSuccess({ team })),
          catchError(error => of(TeamActions.renameTeamFailure({ error })))
        )
      )
    )
  );

  renameTeamFailureToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeamActions.renameTeamFailure),
      map(({ error }) => this.toastService.showError({ text: `Rename team failed because ${error.error.message.replace(/^name:/, "").toLowerCase()}`}))
    );
  }, { dispatch: false });

  teamRenamedToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeamActions.teamRenamed),
      map(({ name }) => this.toastService.showInfo({ text: `Team renamed to '${name.replaceAll(' ', '&nbsp;')}'` }))
    );
  }, { dispatch: false });

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
      withLatestFrom(this.store.select(UserSelectors.selectUser)),
      map(([{ teamMember }, currentUser]) => {
        if(teamMember.name === currentUser?.name) {
          return;
        }
        this.toastService.showInfo({ text: `${teamMember.name} leave the session` })
      })
    );
  }, { dispatch: false });

}
