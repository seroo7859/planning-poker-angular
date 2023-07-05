import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgbActiveOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { DiscussionSelector, TeamSelectors, UserSelectors } from "../../../planning-poker-store/selectors";
import { combineLatest, Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { DiscussionActions } from "../../../planning-poker-store/actions";
import { map } from "rxjs/operators";
import { DiscussionModel, DiscussionPostCreateModel, DiscussionPostModel } from "../../../core/models/discussion.model";
import { TeamMemberModel, TeamModel } from "../../../core/models/team.model";
import cloneDeep from "lodash.clonedeep";

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  user$: Observable<any> = new Observable<any>();
  team$: Observable<any> = new Observable<any>();
  discussion$: Observable<any> = new Observable<any>();

  private postSubscription: Subscription = new Subscription();
  posts: DiscussionPostModel[] = [];

  @ViewChild('textarea')
  private textarea?: ElementRef<HTMLTextAreaElement>;

  public textAreaValue: string = '';
  public textAreaRows: number = 1;
  private textAreaMinRows: number = 1;
  private textAreaMaxRows: number = 3;
  private textAreaBaseScrollHeight: number = 0;

  private scrolledToEnd: boolean = false;

  constructor(private el: ElementRef, private readonly store: Store, public activeOffcanvas: NgbActiveOffcanvas) {}

  ngOnInit() {
    this.user$ = this.store.select(UserSelectors.selectUser);
    this.team$ = this.store.select(TeamSelectors.selectTeam);
    this.discussion$ = this.store.select(DiscussionSelector.selectDiscussion);

    this.postSubscription.add(
      combineLatest([this.discussion$, this.team$])
        .pipe(map(cloneDeep))
        .subscribe(([discussion, team]) => {
          this.posts = this.mapToPosts(discussion, team);
        })
    );
  }

  ngAfterViewInit() {
    this.scrollToLastDiscussionPost('auto');
  }

  ngAfterViewChecked() {
    if (this.scrolledToEnd) {
      this.scrollToLastDiscussionPost('smooth');
    }
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  mapToPosts(discussion: DiscussionModel, team: TeamModel): DiscussionPostModel[] {
    return discussion?.posts.map((post: DiscussionPostModel) => {
      const teamMemberFound: TeamMemberModel | undefined = team.members.find((member: TeamMemberModel) => member.name === post.author);
      if (teamMemberFound) {
        post.author = teamMemberFound;
      } else {
        post.author = undefined;
      }
      return post;
    }).filter(post => post.author);
  }

  handleMouseEnter(event: Event) {
    const element: HTMLElement = event.target as HTMLElement;
    const isScrollbarVisible: boolean = element.scrollHeight > element.clientHeight;
    if (!isScrollbarVisible) {
      element.style.setProperty('padding-right', '1rem', 'important');
    }
  }

  handleMouseLeave(event: Event) {
    const element: HTMLElement = event.target as HTMLElement;
    element.style.removeProperty('padding-right');
  }

  handleScroll(event: Event) {
    const element: HTMLElement = event.target as HTMLElement;
    this.scrolledToEnd = element.offsetHeight + element.scrollTop >= element.scrollHeight;
  }

  scrollToLastDiscussionPost(behavior: ScrollBehavior = 'smooth') {
    const lastDiscussionPostElement = this.el.nativeElement.querySelector('.list-group .list-group-item:last-child');
    if (lastDiscussionPostElement) {
      lastDiscussionPostElement.scrollIntoView({ behavior, block: 'start', inline: 'start' });
    }
  }

  startDiscussion(topic: string) {
    this.store.dispatch(DiscussionActions.startDiscussion({ topic }));
  }

  endDiscussion() {
    this.store.dispatch(DiscussionActions.endDiscussion());
  }

  onTextAreaFocus(event: FocusEvent) {
    this.setupTextArea();
  }

  onTextAreaBlur(event: FocusEvent) {
    if (this.isTextAreaBlank()) {
      this.resetTextArea();
    }
  }

  onTextAreaInput(event: Event) {
    // Auto-Growing
    this.textAreaRows = this.textAreaMinRows;
    const newRows: number = Math.ceil((this.textarea!.nativeElement.scrollHeight - this.textAreaBaseScrollHeight) / 21);
    this.textAreaRows = Math.max(this.textAreaMinRows, Math.min(this.textAreaMinRows + newRows, this.textAreaMaxRows));

    // Scroll to bottom of the TextArea
    this.textarea!.nativeElement.scrollTop = this.textarea!.nativeElement.scrollHeight;
  }

  setupTextArea() {
    const tempValue: string = this.textAreaValue;
    this.textAreaValue = '';
    this.textAreaBaseScrollHeight = this.textarea!.nativeElement.scrollHeight;
    this.textAreaValue = tempValue;

    this.textarea?.nativeElement.classList.remove('rounded-pill', 'overflow-hidden');
    this.textarea?.nativeElement.classList.add('rounded-3', 'overflow-auto');
  }

  resetTextArea() {
    this.textAreaValue = '';
    this.textAreaRows = this.textAreaMinRows;
    this.textarea?.nativeElement.classList.add('rounded-pill', 'overflow-hidden');
    this.textarea?.nativeElement.classList.remove('rounded-3', 'overflow-auto');
    this.textarea?.nativeElement.blur();
  }

  isTextAreaBlank() {
    return this.textAreaValue.trim().length === 0;
  }

  createPost() {
    if (!this.isTextAreaBlank()) {
      // Scroll to last post
      this.scrollToLastDiscussionPost('auto');

      // Dispatch create post action
      const discussionPost: DiscussionPostCreateModel = { content: this.textAreaValue };
      this.store.dispatch(DiscussionActions.createDiscussionPost({ discussionPost }))

      // Reset textarea
      this.resetTextArea();
    }
  }
}
