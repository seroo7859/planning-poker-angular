import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BacklogService } from "../../core/services/backlog.service";
import { BacklogActions } from "../actions";
import { exhaustMap, of, withLatestFrom } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { SessionSelectors } from "../selectors";
import { saveAs } from "file-saver";
import { ToastService } from "../../core/services/toast.service";

@Injectable()
export class BacklogEffects {

  constructor(private actions$: Actions, private readonly store: Store, private backlogService: BacklogService, private toastService: ToastService) {}

  importBacklog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BacklogActions.importBacklog),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.backlogService.importBacklog(session.data!.id, action.backlogFile).pipe(
          map(backlog => BacklogActions.importBacklogSuccess({ backlog })),
          catchError(error => of(BacklogActions.importBacklogFailure({ error })))
        )
      )
    )
  );

  importBacklogSuccessToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.importBacklogSuccess),
      map(action => this.toastService.showSuccess({ text: `Import backlog successfully` }))
    );
  }, { dispatch: false });

  importBacklogFailureToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.importBacklogFailure),
      map(({ error }) => this.toastService.showError({ text: `Import backlog failed because it is ${error.statusText.toLowerCase()}` }))
    );
  }, { dispatch: false });

  backlogImportedToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.backlogImported),
      map(({ backlog }) => this.toastService.showInfo({ text: `Backlog '${backlog.name}' with ${backlog.items.length} items imported` }))
    );
  }, { dispatch: false });

  exportBacklog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BacklogActions.exportBacklog),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.backlogService.exportBacklog(session.data!.id).pipe(
          map(backlogExport => BacklogActions.exportBacklogSuccess({ backlogExport })),
          catchError(error => of(BacklogActions.exportBacklogFailure({ error })))
        )
      )
    )
  );

  exportBacklogSuccessSave$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.exportBacklogSuccess),
      map(({ backlogExport }) => saveAs(backlogExport.data, backlogExport.filename))
    );
  }, { dispatch: false });

  exportBacklogSuccessToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.exportBacklogSuccess),
      map(({ backlogExport }) => this.toastService.showSuccess({ text: `Export backlog successfully as ${backlogExport.filename}` }))
    );
  }, { dispatch: false });

  exportBacklogFailureToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.exportBacklogFailure),
      map(({ error }) => this.toastService.showError({ text: `Export backlog failed because it is ${error.statusText.toLowerCase()}` }))
    );
  }, { dispatch: false });

  renameBacklog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BacklogActions.renameBacklog),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.backlogService.renameBacklog(session.data!.id, action.name).pipe(
          map(backlog => BacklogActions.renameBacklogSuccess({ backlog })),
          catchError(error => of(BacklogActions.renameBacklogFailure({ error })))
        )
      )
    )
  );

  renameBacklogFailureToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.renameBacklogFailure),
      map(({ error }) => this.toastService.showError({ text: `Rename backlog failed because ${error.error.message.replace(/^name:/, "").toLowerCase()}`}))
    );
  }, { dispatch: false });

  backlogRenamedToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.backlogRenamed),
      map(({ name }) => this.toastService.showInfo({ text: `Backlog renamed to '${name.replaceAll(' ', '&nbsp;')}'` }))
    );
  }, { dispatch: false });

  clearBacklog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BacklogActions.clearBacklog),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.backlogService.clearBacklog(session.data!.id).pipe(
          map(() => BacklogActions.clearBacklogSuccess()),
          catchError(error => of(BacklogActions.clearBacklogFailure({ error })))
        )
      )
    )
  );

  clearBacklogSuccessToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.clearBacklogSuccess),
      map((action) => this.toastService.showSuccess({ text: `Clear backlog successfully` }))
    );
  }, { dispatch: false });

  backlogClearedToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.backlogCleared),
      map(({ backlog }) => this.toastService.showInfo({ text: 'All backlog items removed' }))
    );
  }, { dispatch: false });

  addBacklogItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BacklogActions.addBacklogItem),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.backlogService.addBacklogItem(session.data!.id, action.backlogItem).pipe(
          map(backlogItem => BacklogActions.addBacklogItemSuccess({ backlogItem })),
          catchError(error => of(BacklogActions.addBacklogItemFailure({ error })))
        )
      )
    )
  );

  backlogItemAddedToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.backlogItemAdded),
      map(({ backlogItem }) => this.toastService.showInfo({ text: `Backlog item '${backlogItem.number + ': ' + backlogItem.title}' added` }))
    );
  }, { dispatch: false });

  removeBacklogItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BacklogActions.removeBacklogItem),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.backlogService.removeBacklogItem(session.data!.id, action.backlogItemNumber).pipe(
          map(() => BacklogActions.removeBacklogItemSuccess({ backlogItemNumber: action.backlogItemNumber })),
          catchError(error => of(BacklogActions.removeBacklogItemFailure({ error })))
        )
      )
    )
  );

  backlogItemRemovedToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.backlogItemRemoved),
      map(({ backlogItem }) => this.toastService.showInfo({ text: `Backlog item '${backlogItem.number + ': ' + backlogItem.title}' removed` }))
    );
  }, { dispatch: false });

  updateBacklogItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BacklogActions.updateBacklogItem),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.backlogService.updateBacklogItem(session.data!.id, action.backlogItemNumber, action.backlogItem).pipe(
          map((backlogItem) => BacklogActions.updateBacklogItemSuccess({ backlogItem })),
          catchError(error => of(BacklogActions.updateBacklogItemFailure({ error })))
        )
      )
    )
  );

  backlogItemUpdatedToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.backlogItemUpdated),
      map(({ backlogItem }) => this.toastService.showInfo({ text: `Backlog item '${backlogItem.number + ': ' + backlogItem.title}' updated` }))
    );
  }, { dispatch: false });

  moveBacklogItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BacklogActions.moveBacklogItem),
      withLatestFrom(this.store.select(SessionSelectors.selectSession)),
      exhaustMap(([action, session]) =>
        this.backlogService.moveBacklogItem(session.data!.id, action.backlogItemNumber, action.newIndex).pipe(
          map((backlogItems) => BacklogActions.moveBacklogItemSuccess({ backlogItems })),
          catchError(error => of(BacklogActions.moveBacklogItemFailure({ error })))
        )
      )
    )
  );

  backlogItemMovedToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BacklogActions.backlogItemMoved),
      map(({ backlogItem }) => this.toastService.showInfo({ text: `Backlog item '${backlogItem.number + ': ' + backlogItem.title}' moved` }))
    );
  }, { dispatch: false });

}
