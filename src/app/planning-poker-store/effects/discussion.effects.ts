import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { DiscussionService } from "../../core/services/discussion.service";
import { DiscussionActions } from "../actions";
import { exhaustMap, of, withLatestFrom } from "rxjs";
import { SessionSelectors } from "../selectors";
import { catchError, map } from "rxjs/operators";
import { ToastService } from "../../core/services/toast.service";

@Injectable()
export class DiscussionEffects {

  constructor(
    private actions$: Actions,
    private readonly store: Store,
    private discussionService: DiscussionService,
    private toastService: ToastService
  ) {}

  startDiscussion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscussionActions.startDiscussion),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.discussionService.startDiscussion(session.data!.id, action.topic).pipe(
          map(discussion => DiscussionActions.startDiscussionSuccess({ discussion })),
          catchError(error => of(DiscussionActions.startDiscussionFailure({ error })))
        )
      )
    )
  );

  startDiscussionFailureToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiscussionActions.startDiscussionFailure),
      map(({ error }) => this.toastService.showError({ text: 'Start discussion failed' }))
    );
  }, { dispatch: false });

  endDiscussion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscussionActions.endDiscussion),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.discussionService.endDiscussion(session.data!.id).pipe(
          map(discussion => DiscussionActions.endDiscussionSuccess({ discussion })),
          catchError(error => of(DiscussionActions.endDiscussionFailure({ error })))
        )
      )
    )
  );

  endDiscussionFailureToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiscussionActions.endDiscussionFailure),
      map(({ error }) => this.toastService.showError({ text: 'End discussion failed' }))
    );
  }, { dispatch: false });

  createDiscussionPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscussionActions.createDiscussionPost),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.discussionService.createDiscussionPost(session.data!.id, action.discussionPost).pipe(
          map(discussionPost => DiscussionActions.createDiscussionPostSuccess({ discussionPost })),
          catchError(error => of(DiscussionActions.createDiscussionPostFailure({ error })))
        )
      )
    )
  );

  createDiscussionPostFailureToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DiscussionActions.createDiscussionPostFailure),
      map(({ error }) => this.toastService.showError({ text: 'Create discussion post failed' }))
    );
  }, { dispatch: false });

}
