import { createAction, props } from '@ngrx/store';
import { ActionTypes } from "./planning-poker-store.actions";
import { DiscussionModel, DiscussionPostCreateModel, DiscussionPostModel } from "../../core/models/discussion.model";
import { HttpErrorResponse } from "@angular/common/http";


// Collapse Backlog Action

export const collapseDiscussion = createAction(
  ActionTypes.CollapseDiscussion
);


// Start Discussion Actions

export const startDiscussion = createAction(
  ActionTypes.StartDiscussion,
  props<{ topic: string }>()
);

export const startDiscussionSuccess = createAction(
  ActionTypes.StartDiscussionSuccess,
  props<{ discussion: DiscussionModel }>()
);

export const startDiscussionFailure = createAction(
  ActionTypes.StartDiscussionFailure,
  props<{ error: HttpErrorResponse }>()
);

export const discussionStarted = createAction(
  ActionTypes.DiscussionStarted,
  props<{ discussion: DiscussionModel }>()
);


// End Discussion Actions

export const endDiscussion = createAction(
  ActionTypes.EndDiscussion
);

export const endDiscussionSuccess = createAction(
  ActionTypes.EndDiscussionSuccess,
  props<{ discussion: DiscussionModel }>()
);

export const endDiscussionFailure = createAction(
  ActionTypes.EndDiscussionFailure,
  props<{ error: HttpErrorResponse }>()
);

export const discussionEnded = createAction(
  ActionTypes.DiscussionEnded,
  props<{ discussion: DiscussionModel }>()
);


// Create Discussion Post Actions

export const createDiscussionPost = createAction(
  ActionTypes.CreateDiscussionPost,
  props<{ discussionPost: DiscussionPostCreateModel }>()
);

export const createDiscussionPostSuccess = createAction(
  ActionTypes.CreateDiscussionPostSuccess,
  props<{ discussionPost: DiscussionPostModel }>()
);

export const createDiscussionPostFailure = createAction(
  ActionTypes.CreateDiscussionPostFailure,
  props<{ error: HttpErrorResponse }>()
);

export const discussionPostCreated = createAction(
  ActionTypes.DiscussionPostCreated,
  props<{ discussionPost: DiscussionPostModel }>()
);
