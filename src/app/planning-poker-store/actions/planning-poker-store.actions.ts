export enum ActionTypes {
  AddDeck = '[Decks] Add Deck',

  CreateSession        = '[Session] Create Session',
  CreateSessionSuccess = '[Session] Create Session Success',
  CreateSessionFailure = '[Session] Create Session Failure',

  JoinSession        = '[Session] Join Session',
  JoinSessionSuccess = '[Session] Join Session Success',
  JoinSessionFailure = '[Session] Join Session Failure',

  GetSession        = '[Session] Get Session',
  GetSessionSuccess = '[Session] Get Session Success',
  GetSessionFailure = '[Session] Get Session Failure',

  GetCurrentUser          = '[User] Get Current User',
  GetCurrentUserSuccess   = '[User] Get Current User Success',
  GetCurrentUserFailure   = '[User] Get Current User Failure',
  CurrentUserConnected    = '[User] Current User Connected',
  CurrentUserDisconnected = '[User] Current User Disconnected',

  TeamMemberJoined       = '[Team] Team Member Joined',
  TeamMemberLeaved       = '[Team] Team Member Leaved',
  TeamMemberConnected    = '[Team] Team Member Connected',
  TeamMemberDisconnected = '[Team] Team Member Disconnected',

  ImportBacklog        = '[Backlog] Import Backlog',
  ImportBacklogSuccess = '[Backlog] Import Backlog Success',
  ImportBacklogFailure = '[Backlog] Import Backlog Failure',
  BacklogImported      = '[Backlog] Backlog Imported',

  ExportBacklog        = '[Backlog] Export Backlog',
  ExportBacklogSuccess = '[Backlog] Export Backlog Success',
  ExportBacklogFailure = '[Backlog] Export Backlog Failure',

  RenameBacklog        = '[Backlog] Rename Backlog ',
  RenameBacklogSuccess = '[Backlog] Rename Backlog Success',
  RenameBacklogFailure = '[Backlog] Rename Backlog Failure',
  BacklogRenamed       = '[Backlog] Backlog Renamed',

  ClearBacklog        = '[Backlog] Clear Backlog',
  ClearBacklogSuccess = '[Backlog] Clear Backlog Success',
  ClearBacklogFailure = '[Backlog] Clear Backlog Failure',
  BacklogCleared      = '[Backlog] Backlog Cleared',

  AddBacklogItem        = '[Backlog] Add Backlog Item',
  AddBacklogItemSuccess = '[Backlog] Add Backlog Item Success',
  AddBacklogItemFailure = '[Backlog] Add Backlog Item Failure',
  BacklogItemAdded      = '[Backlog] Backlog Item Added',

  RemoveBacklogItem        = '[Backlog] Remove Backlog Item',
  RemoveBacklogItemSuccess = '[Backlog] Remove Backlog Item Success',
  RemoveBacklogItemFailure = '[Backlog] Remove Backlog Item Failure',
  BacklogItemRemoved       = '[Backlog] Backlog Item Removed',

  UpdateBacklogItem        = '[Backlog] Updated Backlog Item',
  UpdateBacklogItemSuccess = '[Backlog] Updated Backlog Item Success',
  UpdateBacklogItemFailure = '[Backlog] Updated Backlog Item Failure',
  BacklogItemUpdated       = '[Backlog] Backlog Item Updated',

  MoveBacklogItem        = '[Backlog] Move Backlog Item',
  MoveBacklogItemSuccess = '[Backlog] Move Backlog Item Success',
  MoveBacklogItemFailure = '[Backlog] Move Backlog Item Failure',
  BacklogItemMoved       = '[Backlog] Backlog Item Moved'
}
