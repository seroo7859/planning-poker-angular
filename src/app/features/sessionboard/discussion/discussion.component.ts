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
import { Options } from "@popperjs/core";

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
  private textAreaCursorPosition: number = 0;

  private scrolledToEnd: boolean = false;

  readonly emojiMap: Map<string, string> = new Map([
    ["😀", "Grinning Face"],
    ["🙂", "Slightly Smiling Face"],
    ["😐", "Expressionless Face"],
    ["🙁", "Slightly Frowning Face"],
    ["😢", "Crying Face"],
    ["🤣", "Rolling on the Floor Laughing"],
    ["😂", "Face with Tears of Joy"],
    ["😊", "Smiling Face with Smiling Eyes"],
    ["🥺", "Pleading Face"],
    ["😭", "Loudly Crying Face"],
    ["😍", "Smiling Face with Heart-Eyes"],
    ["🥰", "Smiling Face with Hearts"],
    ["🥳", "Partying Face"],
    ["😅", "Grinning Face with Sweat"],
    ["😴", "Sleeping Face"],
    ["😁", "Beaming Face with Smiling Eyes"],
    ["🤔", "Thinking Face"],
    ["👍", "Thumbs Up"],
    ["👎", "Thumbs Down"],
    ["🙏", "Folded Hands"],
    ["️❤️️", "Red Heart"],
    ["️🔥", "Fire"],
    ["️✨", "Sparkles"],
    ["️🎉", "Party Popper"],
    ["️🔁", "Repeat Button"]
  ]);

  popperOptions = (options: Partial<Options>) => {
    // customize placement
    options.placement = 'top-end';

    // customize modifiers
    for (const modifier of options.modifiers || []) {
      // disable flip
      if (modifier.name === 'flip') {
        modifier.enabled = false;
      }

      // customize offset
      if (modifier.name === 'offset' && modifier.options) {
        modifier.options['offset'] = () => [20, 20];
      }
    }

    // add your own modifier
    options.modifiers?.push({
      name: 'custom',
      enabled: true,
      phase: 'main',
      fn: ({ state }) => {},
    });

    // first update callback
    options.onFirstUpdate = (state) => {
      console.log('onFirstUpdate', state);
    };
    return options;
  };

  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private readonly swipeThreshold: number = 80;

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

  handleTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  handleTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.checkSwipeDirection();
  }

  private checkSwipeDirection() {
    const diffX: number = this.touchEndX - this.touchStartX;
    if (Math.abs(diffX) < this.swipeThreshold) {
      return;
    }
    if (diffX > 0) {
      console.log("Swiped right");
      this.activeOffcanvas.dismiss("Swiped right");
    } else if (diffX < 0) {
      console.log("Swiped left");
    }
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
    this.textAreaCursorPosition = this.textarea!.nativeElement.selectionStart;
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

  onEmojiSelected(emoji: string) {
    const text = this.textAreaValue;
    const textBefore = text.slice(0, this.textAreaCursorPosition);
    const textAfter = text.slice(this.textAreaCursorPosition)
    this.textAreaValue = textBefore + emoji + textAfter;
    this.textAreaCursorPosition += emoji.length;
  }

  keepOrder(a: any, b: any) {
    return a;
  }
}
