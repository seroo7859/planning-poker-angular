import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, Subscription, take } from "rxjs";
import { SessionSelectors } from "../../planning-poker-store/selectors";
import { RxStompService } from "../../core/services/rx-stomp.service";
import { TeamActions, UserActions } from "../../planning-poker-store/actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  session$: Observable<any> = new Observable<any>();
  private sessionSubscription: Subscription = new Subscription();

  constructor(private readonly store: Store, private rxStompService: RxStompService) {}

  ngOnInit(): void {
    this.session$ = this.store.select(SessionSelectors.selectSession);
    this.sessionSubscription.add(
      this.session$.pipe(take(1))
        .subscribe(session => {
          if (session.data) {
            this.subscribeSession(session.data.id);
          }
      })
    );
  }

  private subscribeSession(sessionId: string) {
    this.sessionSubscription.add(
      this.rxStompService
        .watch(`/session/${sessionId}/team/member-joined`)
        .subscribe((message) => this.store.dispatch(TeamActions.teamMemberJoined({ teamMember: JSON.parse(message.body) })))
    );
    this.sessionSubscription.add(
      this.rxStompService
        .watch(`/session/${sessionId}/team/member-leaved`)
        .subscribe((message) => this.store.dispatch(TeamActions.teamMemberLeaved({ teamMember: JSON.parse(message.body) })))
    );
    this.sessionSubscription.add(
      this.rxStompService
        .watch(`/session/${sessionId}/team/member-connected`)
        .subscribe((message) => this.store.dispatch(TeamActions.teamMemberConnected({ teamMember: JSON.parse(message.body) })))
    );
    this.sessionSubscription.add(
      this.rxStompService
        .watch(`/session/${sessionId}/team/member-disconnected`)
        .subscribe((message) => this.store.dispatch(TeamActions.teamMemberDisconnected({ teamMember: JSON.parse(message.body) })))
    );
    this.sessionSubscription.add(
      this.rxStompService.connected$
        .subscribe(() => this.store.dispatch(UserActions.currentUserConnected()))
    );
    this.sessionSubscription.add(
      this.rxStompService.disconnected$
        .subscribe(() => this.store.dispatch(UserActions.currentUserDisconnected()))
    );
  }

  ngOnDestroy(): void {
    this.sessionSubscription.unsubscribe();
  }

}
