import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable, Subscription, take } from "rxjs";
import { Store } from "@ngrx/store";
import {
  BacklogSelectors,
  DeckSelectors,
  EstimationSelectors,
  UserSelectors
} from "../../../planning-poker-store/selectors";
import { BacklogItemModel, BacklogModel } from "../../../core/models/backlog.model";
import { BacklogActions, EstimationActions } from "../../../planning-poker-store/actions";
import { NgbActiveOffcanvas, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeckModel } from "../../../core/models/deck.model";
import { EstimationRoundModel } from "../../../core/models/estimation.model";
import Sortable from "sortablejs";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit, AfterViewInit, OnDestroy {

  backlog$: Observable<any> = new Observable<any>();
  deck$: Observable<any> = new Observable<any>();
  round$: Observable<any> = new Observable<any>();
  user$: Observable<any> = new Observable<any>();

  private subscription: Subscription = new Subscription();

  @ViewChild('clearBacklogModalContent')
  clearBacklogModalContent: ElementRef | undefined;

  @ViewChild('addBacklogItemModalContent')
  addBacklogItemModalContent: ElementRef | undefined;

  @ViewChild('editBacklogItemModalContent')
  editBacklogItemModalContent: ElementRef | undefined;

  @ViewChild('estimateBacklogItemModalContent')
  estimateBacklogItemModalContent: ElementRef | undefined;

  selectedBacklogItem?: BacklogItemModel;
  round?: EstimationRoundModel;

  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private readonly swipeThreshold: number = 80;

  constructor(private el: ElementRef, private readonly store: Store, private modalService: NgbModal, public activeOffcanvas: NgbActiveOffcanvas) {}

  ngOnInit() {
    this.backlog$ = this.store.select(BacklogSelectors.selectBacklog);
    this.deck$ = this.store.select(DeckSelectors.selectDeck);
    this.round$ = this.store.select(EstimationSelectors.selectEstimationRound);
    this.user$ = this.store.select(UserSelectors.selectUser);

    this.subscription.add(
      this.round$.subscribe(round => {
        this.round = round;
        if (this.isRoundStarted()) {
          setTimeout(() => this.scrollToActiveBacklogItem(), 100);
        }
      })
    );
  }

  ngAfterViewInit() {
    this.subscription.add(
      this.user$
        .pipe(take(1))
        .subscribe(user => {
          if (user.role === 'MODERATOR') {
            this.createSortableList();
          }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createSortableList() {
    const el = document.getElementById('backlog-items') as HTMLElement;
    const sortable = Sortable.create(el, {
      animation: 150,
      filter: '.active',
      onMove: (event) => {
        return !event.related.classList.contains('active');
      },
      onUpdate: (event) => {
        const backlogItemNumber = event.item.getAttribute('data-backlog-item-number');
        console.log(`Move backlog item ${backlogItemNumber} from old index ${event.oldIndex} to new index ${event.newIndex}`);

        // Dispatch move backlog item action
        this.store.dispatch(BacklogActions.moveBacklogItem({ backlogItemNumber: backlogItemNumber!, newIndex: event.newIndex! }));
      }
    });
  }

  scrollToActiveBacklogItem() {
    const activeBacklogItemElement = this.el.nativeElement.querySelector('.list-group .list-group-item.active');
    if (activeBacklogItemElement) {
      activeBacklogItemElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }

  getNumberOfEstimatedBacklogItems(backlog: BacklogModel): number {
    return backlog.items.filter(backlogItem => backlogItem.estimation && backlogItem.estimation.length > 0).length;
  }

  getEstimationValues(deck: DeckModel): string[] {
    return deck.cards.map(card => card.value);
  }

  exportBacklog() {
    this.store.dispatch(BacklogActions.exportBacklog());
  }

  importBacklog(file: File) {
    this.store.dispatch(BacklogActions.importBacklog({ backlogFile: file }));
  }

  handleFileInput(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.importBacklog(file);
      event.target.value = '';
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

  handleClick(event: Event, backlogItem: BacklogItemModel) {
    const element: HTMLElement = event.target as HTMLElement;
    const li = element.closest('li') as HTMLElement;
    if (element.nodeName === 'BUTTON' || element.nodeName === 'I' || li.classList.contains('active')) {
      return;
    }
    this.editBacklogItem(backlogItem);
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
    } else if (diffX < 0) {
      console.log("Swiped left");
      this.activeOffcanvas.dismiss("Swiped left");
    }
  }

  renameBacklog(name: string) {
    this.store.dispatch(BacklogActions.renameBacklog({ name }));
  }

  removeBacklogItem(backlogItemNumber: string) {
    this.store.dispatch(BacklogActions.removeBacklogItem({ backlogItemNumber }));
  }

  addBacklogItem() {
    // Open add backlog item modal
    const modalRef = this.modalService.open(this.addBacklogItemModalContent);
    modalRef.result
      .then((result) => {
        console.log('Closed with:', result);
        this.store.dispatch(BacklogActions.addBacklogItem( { backlogItem: result }));
      }, (reason) => {
        console.log('Dismissed:', reason);
      });
  }

  editBacklogItem(backlogItem: BacklogItemModel) {
    this.selectedBacklogItem = backlogItem;
    // Open edit backlog item modal
    const modalRef = this.modalService.open(this.editBacklogItemModalContent);
    modalRef.result
      .then((result) => {
        console.log('Closed with:', result);
        delete result.number;
        this.store.dispatch(BacklogActions.updateBacklogItem( { backlogItemNumber: backlogItem.number, backlogItem: { ...result, priority: '' } }));
      }, (reason) => {
        console.log('Dismissed:', reason);
      });
  }

  clearBacklog() {
    // Open clear backlog modal
    const modalRef = this.modalService.open(this.clearBacklogModalContent);
    modalRef.result
      .then((result) => {
        console.log('Closed with:', result);
        this.store.dispatch(BacklogActions.clearBacklog());
      }, (reason) => {
        console.log('Dismissed:', reason);
      });
  }

  estimateBacklogItem(backlogItem: BacklogItemModel) {
    if (this.isRoundStarted()) {
      // Open estimate backlog item modal
      const modalRef = this.modalService.open(this.estimateBacklogItemModalContent);
      modalRef.result
        .then((result) => {
          console.log('Closed with:', result);
        }, (reason) => {
          console.log('Dismissed:', reason);
        });
      return;
    }
    this.store.dispatch(EstimationActions.startEstimationRound({ backlogItemNumber: backlogItem.number }));
  }

  isRoundStarted() {
    return this.round !== undefined && this.round.startedAt !== undefined && this.round.finishedAt === undefined;
  }

  isEstimatingBacklogItem(backlogItem: BacklogItemModel) {
    return this.isRoundStarted() && backlogItem.number === this.round?.backlogItemNumber;
  }

}
