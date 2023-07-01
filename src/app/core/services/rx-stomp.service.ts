import { inject, Injectable } from '@angular/core';
import { RxStomp, RxStompConfig, RxStompState } from "@stomp/rx-stomp";
import { environment } from "../../../environments/environment";
import { AuthService } from "./auth.service";
import { filter, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RxStompService extends RxStomp {

  public readonly disconnected$: Observable<RxStompState>;

  constructor() {
    super();
    this.disconnected$ = this.connectionState$.pipe(
      filter((currentState: RxStompState) => {
        return currentState === RxStompState.CLOSED;
      })
    );
  }

  connect() {
    if (!this.active) {
      this.activate();
    }
  }

  disconnect() {
    if (this.active) {
      setTimeout(async () => await this.deactivate(), 0);
    }
  }

  public disconnected(): boolean {
    return this.connectionState$.getValue() === RxStompState.CLOSED;
  }
}

export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure(myRxStompConfig);
  rxStomp.connected$.subscribe(() => {
    console.log('I will be called for each time connection is established.');
  });
  rxStomp.disconnected$.subscribe(() => {
    console.log('I will be called for each time connection is breaks down.');
  });
  rxStomp.activate();
  return rxStomp;
}

const myRxStompConfig: RxStompConfig = {
  brokerURL: environment.brokerUrl,   // server

  connectHeaders: {
    token: 'my-token'                 // Access token
  },

  heartbeatIncoming: 0,               // disabled
  heartbeatOutgoing: 20000,           // every 20 seconds

  connectionTimeout: 0,               // wait forever
  reconnectDelay: 200,                // wait 200 milliseconds before attempting auto reconnect

  debug: !environment.production ? log : undefined,    // log diagnostics

  beforeConnect: (client) => {
    const authService = inject(AuthService);
    const authToken = authService.getAuthorizationToken();
    if (authToken) {
      client.configure({ ...myRxStompConfig, connectHeaders: { token: authToken } });
    }
  }
};

function log(msg: string): void {
  console.log(new Date(), msg);
}
