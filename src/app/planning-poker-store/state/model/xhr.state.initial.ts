import { XhrStateModel } from './xhr.state.model';

export const xhrStateInitial: XhrStateModel = {
  pending: false,
  succeeded: false,
  failed: false,
  payload: null,
  error: null
};
