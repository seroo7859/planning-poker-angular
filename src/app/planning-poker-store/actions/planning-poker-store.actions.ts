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
  TeamMemberDisconnected = '[Team] Team Member Disconnected'
}
