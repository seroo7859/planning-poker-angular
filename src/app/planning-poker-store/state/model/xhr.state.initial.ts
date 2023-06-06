import { XhrStateModel } from './xhr.state.model';

export const xhrStateInitial: XhrStateModel = {
  pending: false,
  succeed: false,
  failed: false,
  error: null
};
