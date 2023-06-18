import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, Subscription, take, withLatestFrom } from "rxjs";
import { SessionSelectors, UserSelectors } from "../../planning-poker-store/selectors";
import { RxStompService } from "../../core/services/rx-stomp.service";
import { BacklogActions, TeamActions, UserActions } from "../../planning-poker-store/actions";
import { UserRoleModel } from "../../core/models/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isBacklogCollapsed: boolean = false;
  isDiscussCollapsed: boolean = false;

  session$: Observable<any> = new Observable<any>();
  user$: Observable<any> = new Observable<any>();

  private sessionSubscription: Subscription = new Subscription();

  constructor(private readonly store: Store, private rxStompService: RxStompService) {}

  ngOnInit(): void {
    this.session$ = this.store.select(SessionSelectors.selectSession);
    this.user$ = this.store.select(UserSelectors.selectUser);
    this.subscribeSession();
  }

  private subscribeSession() {
    this.sessionSubscription.add(
      this.session$
        .pipe(
          take(1),
          withLatestFrom(this.user$)
        )
        .subscribe(([session, user]) => {
          if (session.data && user) {
            const sessionId: string = session.data.id;

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

            if(user.role !== UserRoleModel.MODERATOR) {
              this.sessionSubscription.add(
                this.rxStompService
                  .watch(`/session/${sessionId}/backlog/imported`)
                  .subscribe((message) => this.store.dispatch(BacklogActions.backlogImported({ backlog: JSON.parse(message.body) })))
              );

              this.sessionSubscription.add(
                this.rxStompService
                  .watch(`/session/${sessionId}/backlog/renamed`)
                  .subscribe((message) => this.store.dispatch(BacklogActions.backlogRenamed({ name: JSON.parse(message.body).name })))
              );

              this.sessionSubscription.add(
                this.rxStompService
                  .watch(`/session/${sessionId}/backlog/cleared`)
                  .subscribe((message) => this.store.dispatch(BacklogActions.backlogCleared({ backlog: JSON.parse(message.body) })))
              );

              this.sessionSubscription.add(
                this.rxStompService
                  .watch(`/session/${sessionId}/backlog/item-added`)
                  .subscribe((message) => this.store.dispatch(BacklogActions.backlogItemAdded({ backlogItem: JSON.parse(message.body) })))
              );

              this.sessionSubscription.add(
                this.rxStompService
                  .watch(`/session/${sessionId}/backlog/item-removed`)
                  .subscribe((message) => this.store.dispatch(BacklogActions.backlogItemRemoved({ backlogItem: JSON.parse(message.body) })))
              );

              this.sessionSubscription.add(
                this.rxStompService
                  .watch(`/session/${sessionId}/backlog/item-updated`)
                  .subscribe((message) => this.store.dispatch(BacklogActions.backlogItemUpdated({ backlogItem: JSON.parse(message.body) })))
              );

              this.sessionSubscription.add(
                this.rxStompService
                  .watch(`/session/${sessionId}/backlog/item-moved`)
                  .subscribe((message) => {
                    const result = JSON.parse(message.body);
                    this.store.dispatch(BacklogActions.backlogItemMoved({ backlog: result.backlog, backlogItem: result.backlogItem, newIndex: result.newIndex }))
                  })
              );
            }

            this.sessionSubscription.add(
              this.rxStompService.connected$
                .subscribe(() => this.store.dispatch(UserActions.currentUserConnected()))
            );

            this.sessionSubscription.add(
              this.rxStompService.disconnected$
                .subscribe(() => this.store.dispatch(UserActions.currentUserDisconnected()))
            );
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.sessionSubscription.unsubscribe();
  }

}
