import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, Subscription, take, withLatestFrom } from "rxjs";
import {
  BacklogSelectors,
  DiscussionSelector,
  SessionSelectors,
  UserSelectors
} from "../../planning-poker-store/selectors";
import { RxStompService } from "../../core/services/rx-stomp.service";
import {
  BacklogActions,
  DiscussionActions,
  EstimationActions,
  TeamActions,
  UserActions
} from "../../planning-poker-store/actions";
import {UserModel, UserRoleModel} from "../../core/models/user.model";

@Component({
  selector: 'app-sessionboard',
  templateUrl: './sessionboard.component.html',
  styleUrls: ['./sessionboard.component.scss']
})
export class SessionboardComponent implements OnInit, OnDestroy {

  isBacklogCollapsed: boolean = false;
  isDiscussionCollapsed: boolean = false;

  private sessionSubscription: Subscription = new Subscription();
  private backlogSubscription: Subscription = new Subscription();
  private discussionSubscription: Subscription = new Subscription();
  private rxStompSubscription: Subscription = new Subscription();

  constructor(private readonly store: Store, private rxStompService: RxStompService) {
    this.rxStompService.connect();
  }

  ngOnInit(): void {
    this.subscribeSession();
    this.subscribeBacklog();
    this.subscribeDiscussion();
  }

  private subscribeSession() {
    const session$: Observable<any> = this.store.select(SessionSelectors.selectSession);
    const user$: Observable<any> = this.store.select(UserSelectors.selectUser);
    this.sessionSubscription.add(
      session$
        .pipe(
          take(1),
          withLatestFrom(user$)
        )
        .subscribe(([session, user]) => {
          if (session.data && user) {
            const sessionId: string = session.data.id;
            this.subscribeRxStompDestinations(sessionId, user);
          }
        })
    );
  }

  private subscribeRxStompDestinations(sessionId: string, user: UserModel) {
    this.rxStompSubscription.add(
      this.rxStompService
        .watch(`/session/${sessionId}/team/member-joined`)
        .subscribe((message) => this.store.dispatch(TeamActions.teamMemberJoined({ teamMember: JSON.parse(message.body) })))
    );

    this.rxStompSubscription.add(
      this.rxStompService
        .watch(`/session/${sessionId}/team/member-leaved`)
        .subscribe((message) => this.store.dispatch(TeamActions.teamMemberLeaved({ teamMember: JSON.parse(message.body) })))
    );

    this.rxStompSubscription.add(
      this.rxStompService
        .watch(`/session/${sessionId}/team/member-connected`)
        .subscribe((message) => this.store.dispatch(TeamActions.teamMemberConnected({ teamMember: JSON.parse(message.body) })))
    );

    this.rxStompSubscription.add(
      this.rxStompService
        .watch(`/session/${sessionId}/team/member-disconnected`)
        .subscribe((message) => this.store.dispatch(TeamActions.teamMemberDisconnected({ teamMember: JSON.parse(message.body) })))
    );

    if(user.role !== UserRoleModel.MODERATOR) {
      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/team/renamed`)
          .subscribe((message) => this.store.dispatch(TeamActions.teamRenamed({ name: JSON.parse(message.body).name })))
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/backlog/imported`)
          .subscribe((message) => this.store.dispatch(BacklogActions.backlogImported({ backlog: JSON.parse(message.body) })))
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/backlog/renamed`)
          .subscribe((message) => this.store.dispatch(BacklogActions.backlogRenamed({ name: JSON.parse(message.body).name })))
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/backlog/cleared`)
          .subscribe((message) => this.store.dispatch(BacklogActions.backlogCleared({ backlog: JSON.parse(message.body) })))
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/backlog/item-added`)
          .subscribe((message) => this.store.dispatch(BacklogActions.backlogItemAdded({ backlogItem: JSON.parse(message.body) })))
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/backlog/item-removed`)
          .subscribe((message) => this.store.dispatch(BacklogActions.backlogItemRemoved({ backlogItem: JSON.parse(message.body) })))
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/backlog/item-updated`)
          .subscribe((message) => this.store.dispatch(BacklogActions.backlogItemUpdated({ backlogItem: JSON.parse(message.body) })))
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/backlog/item-moved`)
          .subscribe((message) => {
            const result = JSON.parse(message.body);
            this.store.dispatch(BacklogActions.backlogItemMoved({ backlog: result.backlog, backlogItem: result.backlogItem, newIndex: result.newIndex }))
          })
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/discussion/started`)
          .subscribe((message) => this.store.dispatch(DiscussionActions.discussionStarted({ discussion: JSON.parse(message.body) })))
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/discussion/ended`)
          .subscribe((message) => this.store.dispatch(DiscussionActions.discussionEnded({ discussion: JSON.parse(message.body) })))
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/estimation/round/started`)
          .subscribe((message) => this.store.dispatch(EstimationActions.estimationRoundStarted({ estimationRound: JSON.parse(message.body) })))
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/estimation/round/finished`)
          .subscribe((message) => this.store.dispatch(EstimationActions.estimationRoundFinished({ estimationRound: JSON.parse(message.body) })))
      );

      this.rxStompSubscription.add(
        this.rxStompService
          .watch(`/session/${sessionId}/estimation/round/summary`)
          .subscribe((message) => this.store.dispatch(EstimationActions.estimationSummaryReceived({ estimationSummary: JSON.parse(message.body) })))
      );
    }

    this.rxStompSubscription.add(
      this.rxStompService
        .watch(`/session/${sessionId}/discussion/post-created`)
        .subscribe((message) => {
          const discussionPost = JSON.parse(message.body);
          if (discussionPost.author === user.name) {
            return;
          }
          this.store.dispatch(DiscussionActions.discussionPostCreated({ discussionPost }))
        })
    );

    this.rxStompSubscription.add(
      this.rxStompService
        .watch(`/session/${sessionId}/estimation/given`)
        .subscribe((message) => {
          const estimation = JSON.parse(message.body);
          if (estimation.estimator === user.name) {
            return;
          }
          this.store.dispatch(EstimationActions.estimationGiven({ estimation }))
        })
    );

    this.rxStompSubscription.add(
      this.rxStompService.connected$
        .subscribe(() => this.store.dispatch(UserActions.currentUserConnected()))
    );

    this.rxStompSubscription.add(
      this.rxStompService.disconnected$
        .subscribe(() => this.store.dispatch(UserActions.currentUserDisconnected()))
    );
  }

  private subscribeBacklog() {
    const backlog$: Observable<any> = this.store.select(BacklogSelectors.selectBacklog);
    this.backlogSubscription.add(
      backlog$.subscribe(backlog => this.isBacklogCollapsed = !!backlog?.collapsed)
    );
  }

  private subscribeDiscussion() {
    const discussion$: Observable<any> = this.store.select(DiscussionSelector.selectDiscussion);
    this.discussionSubscription.add(
      discussion$.subscribe(discussion => this.isDiscussionCollapsed = !!discussion?.collapsed)
    );
  }

   ngOnDestroy(): void {
    this.sessionSubscription.unsubscribe();
    this.backlogSubscription.unsubscribe();
    this.discussionSubscription.unsubscribe();
    this.rxStompSubscription.unsubscribe();
    this.rxStompService.disconnect();
  }

}
