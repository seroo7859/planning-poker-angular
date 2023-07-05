export enum ActionTypes {
  AddDeck = '[Decks] Add Deck',

  SelectCard   = '[Deck] Select Card',
  DeselectCard = '[Deck] Deselect Card',

  CreateSession        = '[Session] Create Session',
  CreateSessionSuccess = '[Session] Create Session Success',
  CreateSessionFailure = '[Session] Create Session Failure',

  JoinSession        = '[Session] Join Session',
  JoinSessionSuccess = '[Session] Join Session Success',
  JoinSessionFailure = '[Session] Join Session Failure',

  LeaveSession        = '[Session] Leave Session',
  LeaveSessionSuccess = '[Session] Leave Session Success',
  LeaveSessionFailure = '[Session] Leave Session Failure',

  GetSession        = '[Session] Get Session',
  GetSessionSuccess = '[Session] Get Session Success',
  GetSessionFailure = '[Session] Get Session Failure',

  GetCurrentUser          = '[User] Get Current User',
  GetCurrentUserSuccess   = '[User] Get Current User Success',
  GetCurrentUserFailure   = '[User] Get Current User Failure',
  CurrentUserConnected    = '[User] Current User Connected',
  CurrentUserDisconnected = '[User] Current User Disconnected',

  RenameTeam        = '[Team] Rename Team ',
  RenameTeamSuccess = '[Team] Rename Team Success',
  RenameTeamFailure = '[Team] Rename Team Failure',
  TeamRenamed       = '[Team] Team Renamed',

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
  BacklogItemMoved       = '[Backlog] Backlog Item Moved',

  CollapseBacklog    = '[Backlog] Collapse Backlog',
  CollapseDiscussion = '[Discussion] Collapse Discussion',

  StartDiscussion        = '[Discussion] Start Discussion',
  StartDiscussionSuccess = '[Discussion] Start Discussion Success',
  StartDiscussionFailure = '[Discussion] Start Discussion Failure',
  DiscussionStarted      = '[Discussion] Discussion Started',

  EndDiscussion        = '[Discussion] End Discussion',
  EndDiscussionSuccess = '[Discussion] End Discussion Success',
  EndDiscussionFailure = '[Discussion] End Discussion Failure',
  DiscussionEnded      = '[Discussion] Discussion Ended',

  CreateDiscussionPost        = '[Discussion] Create Discussion Post',
  CreateDiscussionPostSuccess = '[Discussion] Create Discussion Post Success',
  CreateDiscussionPostFailure = '[Discussion] Create Discussion Post Failure',
  DiscussionPostCreated       = '[Discussion] Discussion Post Created',

  StartEstimationRound        = '[Estimation] Start Estimation Round',
  StartEstimationRoundSuccess = '[Estimation] Start Estimation Round Success',
  StartEstimationRoundFailure = '[Estimation] Start Estimation Round Failure',
  EstimationRoundStarted      = '[Estimation] Estimation Round Started',

  NextEstimationRound        = '[Estimation] Next Estimation Round',
  NextEstimationRoundSuccess = '[Estimation] Next Estimation Round Success',
  NextEstimationRoundFailure = '[Estimation] Next Estimation Round Failure',

  FinishEstimationRound        = '[Estimation] Finish Estimation Round',
  FinishEstimationRoundSuccess = '[Estimation] Finish Estimation Round Success',
  FinishEstimationRoundFailure = '[Estimation] Finish Estimation Round Failure',
  EstimationRoundFinished      = '[Estimation] Estimation Round Finished',

  GetEstimationSummary        = '[Estimation] Get Estimation Summary',
  GetEstimationSummarySuccess = '[Estimation] Get Estimation Summary Success',
  GetEstimationSummaryFailure = '[Estimation] Get Estimation Summary Failure',
  EstimationSummaryReceived   = '[Estimation] Estimation Summary Received',

  GiveEstimation        = '[Estimation] Give Estimation',
  GiveEstimationSuccess = '[Estimation] Give Estimation Success',
  GiveEstimationFailure = '[Estimation] Give Estimation Failure',
  EstimationGiven       = '[Estimation] Estimation Given'
}
