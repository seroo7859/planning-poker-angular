import { createAction, props } from '@ngrx/store';
import { ActionTypes } from "./planning-poker-store.actions";
import { HttpErrorResponse } from "@angular/common/http";
import {
  BacklogExportModel,
  BacklogItemAddModel,
  BacklogItemModel,
  BacklogItemUpdateModel,
  BacklogModel
} from "../../core/models/backlog.model";


// Import Backlog Actions

export const importBacklog = createAction(
  ActionTypes.ImportBacklog,
  props<{ backlogFile: File }>()
);

export const importBacklogSuccess = createAction(
  ActionTypes.ImportBacklogSuccess,
  props<{ backlog: BacklogModel }>()
);

export const importBacklogFailure = createAction(
  ActionTypes.ImportBacklogFailure,
  props<{ error: HttpErrorResponse }>()
);

export const backlogImported = createAction(
  ActionTypes.BacklogImported,
  props<{ backlog: BacklogModel }>()
);


// Export Backlog Actions

export const exportBacklog = createAction(
  ActionTypes.ExportBacklog
);

export const exportBacklogSuccess = createAction(
  ActionTypes.ExportBacklogSuccess,
  props<{ backlogExport: BacklogExportModel }>()
);

export const exportBacklogFailure = createAction(
  ActionTypes.ExportBacklogFailure,
  props<{ error: HttpErrorResponse }>()
);


// Rename Backlog Actions

export const renameBacklog = createAction(
  ActionTypes.RenameBacklog,
  props<{ name: string }>()
);

export const renameBacklogSuccess = createAction(
  ActionTypes.RenameBacklogSuccess,
  props<{ backlog: BacklogModel }>()
);

export const renameBacklogFailure = createAction(
  ActionTypes.RenameBacklogFailure,
  props<{ error: HttpErrorResponse }>()
);

export const backlogRenamed = createAction(
  ActionTypes.BacklogRenamed,
  props<{ name: string }>()
);


// Clear Backlog Actions

export const clearBacklog = createAction(
  ActionTypes.ClearBacklog
);

export const clearBacklogSuccess = createAction(
  ActionTypes.ClearBacklogSuccess
);

export const clearBacklogFailure = createAction(
  ActionTypes.ClearBacklogFailure,
  props<{ error: HttpErrorResponse }>()
);

export const backlogCleared = createAction(
  ActionTypes.BacklogCleared,
  props<{ backlog: BacklogModel }>()
);


// Add Backlog Item Actions

export const addBacklogItem = createAction(
  ActionTypes.AddBacklogItem,
  props<{ backlogItem: BacklogItemAddModel }>()
);

export const addBacklogItemSuccess = createAction(
  ActionTypes.AddBacklogItemSuccess,
  props<{ backlogItem: BacklogItemModel }>()
);

export const addBacklogItemFailure = createAction(
  ActionTypes.AddBacklogItemFailure,
  props<{ error: HttpErrorResponse }>()
);

export const backlogItemAdded = createAction(
  ActionTypes.BacklogItemAdded,
  props<{ backlogItem: BacklogItemModel }>()
);


// Remove Backlog Item Actions

export const removeBacklogItem = createAction(
  ActionTypes.RemoveBacklogItem,
  props<{ backlogItemNumber: string }>()
);

export const removeBacklogItemSuccess = createAction(
  ActionTypes.RemoveBacklogItemSuccess,
  props<{ backlogItemNumber: string }>()
);

export const removeBacklogItemFailure = createAction(
  ActionTypes.RemoveBacklogItemFailure,
  props<{ error: HttpErrorResponse }>()
);

export const backlogItemRemoved = createAction(
  ActionTypes.BacklogItemRemoved,
  props<{ backlogItem: BacklogItemModel }>()
);


// Update Backlog Item Actions

export const updateBacklogItem = createAction(
  ActionTypes.UpdateBacklogItem,
  props<{ backlogItemNumber: string, backlogItem: BacklogItemUpdateModel }>()
);

export const updateBacklogItemSuccess = createAction(
  ActionTypes.UpdateBacklogItemSuccess,
  props<{ backlogItem: BacklogItemModel }>()
);

export const updateBacklogItemFailure = createAction(
  ActionTypes.UpdateBacklogItemFailure,
  props<{ error: HttpErrorResponse }>()
);

export const backlogItemUpdated = createAction(
  ActionTypes.BacklogItemUpdated,
  props<{ backlogItem: BacklogItemModel }>()
);


// Move Backlog Item Actions

export const moveBacklogItem = createAction(
  ActionTypes.MoveBacklogItem,
  props<{ backlogItemNumber: string, newIndex: number }>()
);

export const moveBacklogItemSuccess = createAction(
  ActionTypes.MoveBacklogItemSuccess,
  props<{ backlogItems: BacklogItemModel[] }>()
);

export const moveBacklogItemFailure = createAction(
  ActionTypes.MoveBacklogItemFailure,
  props<{ error: HttpErrorResponse }>()
);

export const backlogItemMoved = createAction(
  ActionTypes.BacklogItemMoved,
  props<{ backlog: BacklogModel, backlogItem: BacklogItemModel, newIndex: number }>()
);
