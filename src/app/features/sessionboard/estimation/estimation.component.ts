import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { combineLatest, Observable, Subscription, timer } from "rxjs";
import { Store } from "@ngrx/store";
import {
  BacklogSelectors,
  DeckSelectors,
  EstimationSelectors,
  SessionSelectors,
  TeamSelectors,
  UserSelectors
} from "../../../planning-poker-store/selectors";
import { map } from "rxjs/operators";
import cloneDeep from "lodash.clonedeep";
import { DeckCardModel } from "../../../core/models/deck.model";
import {
  EstimationModel,
  EstimationRecordModel,
  EstimationRoundModel,
  EstimationSummaryModel
} from "../../../core/models/estimation.model";
import {
  BacklogActions,
  DiscussionActions,
  EstimationActions,
  SessionActions,
  TeamActions
} from "../../../planning-poker-store/actions";
import { deckCardInitial } from "../../../core/models/deck.initial";
import { TeamMemberModel, TeamMemberRoleModel, TeamModel } from "../../../core/models/team.model";
import { ActiveElement, Chart, ChartData, ChartEvent, ChartOptions, ChartType, TooltipItem } from "chart.js";
import { color } from "chart.js/helpers";
import DatalabelsPlugin from "chartjs-plugin-datalabels";
import autocolors from 'chartjs-plugin-autocolors';
import { SessionModel } from "../../../core/models/session.model";
import { BacklogItemModel, BacklogItemUpdateModel, BacklogModel } from "../../../core/models/backlog.model";
import { NgbModal, NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { DiscussionComponent } from "../discussion/discussion.component";
import { BacklogComponent } from "../backlog/backlog.component";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss']
})
export class EstimationComponent implements OnInit, AfterViewInit, OnDestroy {

  session$: Observable<any> = new Observable<any>();
  user$: Observable<any> = new Observable<any>();
  team$: Observable<any> = new Observable<any>();
  deck$: Observable<any> = new Observable<any>();
  backlog$: Observable<any> = new Observable<any>();
  round$: Observable<any> = new Observable<any>();
  summary$: Observable<any> = new Observable<any>();

  private backlogSubscription: Subscription = new Subscription();
  backlog?: BacklogModel;

  private roundSubscription: Subscription = new Subscription();
  round?: EstimationRoundModel;

  private timerSubscription: Subscription = new Subscription();
  time: string = '00:00:00';

  estimationRecords: EstimationRecordModel[] = [];

  userActiveEmoji: string = '😃';
  userInactiveEmoji: string = '😴';

  private summarySubscription: Subscription = new Subscription();
  summary?: EstimationSummaryModel;

  location: string = '';

  @ViewChild('shareSessionModalContent')
  shareSessionModalContent: ElementRef | undefined;

  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective | undefined;

  doughnutChartType: ChartType = 'doughnut';
  doughnutChartData?: ChartData;
  doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    animation: {
      duration: 650
    },
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
    onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => this.onChartClicked(event, elements, chart),
    plugins: {
      title: {
        display: false,
        text: "Estimation Summary"
      },
      legend: {
        display: false,
        position: 'top',
      },
      tooltip: {
        enabled: true,
        animation: {
          duration: 0
        },
        boxWidth: 11,
        boxHeight: 11,
        boxPadding: 4,
        usePointStyle: true,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        padding: 14,
        caretPadding: 10,
        cornerRadius: 14,
        titleFont: {
          family: '\'Nixie One\', cursive',
          weight: 'bold',
          size: 12
        },
        bodyFont: {
          family: '\'Open Sans\', sans-serif',
          weight: 'normal',
          size: 12
        },
        bodySpacing: 2,
        footerFont: {
          family: '\'Open Sans\', sans-serif',
          weight: 'normal',
          size: 12
        },
        callbacks: {
          title: (tooltipItems: TooltipItem<any>[]) => {
            if (tooltipItems.length > 0) {
              const tooltipItem = tooltipItems[0];
              tooltipItem.label = tooltipItem.label ? tooltipItem.label : 'No Estimate';
            }
          },
          footer: (tooltipItems: TooltipItem<any>[]) => {
            if (tooltipItems.length > 0) {
              const tooltipItem = tooltipItems[0];
              const tooltipItemLabel = tooltipItem.label !== 'No Estimate' ? this.escapeRegExp(tooltipItem.label) : `${this.userActiveEmoji}|${this.userInactiveEmoji}`;
              const estimationRecordsFound = this.estimationRecords
                .filter(estimationRecord => estimationRecord.card.value.match(tooltipItemLabel));
              if (estimationRecordsFound) {
                return estimationRecordsFound
                  .map(estimationRecord => estimationRecord.estimator.name)
                  .join(', ');
              }
            }
            return '';
          }
        }
      },
      autocolors: {
        enabled: true,
        mode: 'data',
        offset: 2,
        customize: (ctx) => {
          return {
            background: color(ctx.colors.background).lighten(0.25).rgbString(),
            border: color(ctx.colors.border).lighten(0.25).rgbString()
          };
        }
      },
      datalabels: {
        align: 'center',
        color: 'black',
        font: {
          family: '\'Nixie One\', cursive',
          weight: 'bold',
          size: 16
        },
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      }
    }
  };
  doughnutChartPlugins = [ DatalabelsPlugin ];

  constructor(private readonly store: Store, private modalService: NgbModal, private offcanvasService: NgbOffcanvas) {
    Chart.register(autocolors);
  }

  ngOnInit() {
    this.session$ = this.store.select(SessionSelectors.selectSession);
    this.user$ = this.store.select(UserSelectors.selectUser);
    this.team$ = this.store.select(TeamSelectors.selectTeam);
    this.deck$ = this.store.select(DeckSelectors.selectDeck).pipe(map(cloneDeep));
    this.backlog$ = this.store.select(BacklogSelectors.selectBacklog);
    this.round$ = this.store.select(EstimationSelectors.selectEstimationRound);
    this.summary$ = this.store.select(EstimationSelectors.selectEstimationSummary).pipe(map(cloneDeep));
    this.location = window.location.href;

    this.backlogSubscription.add(
      this.backlog$.subscribe(backlog => this.backlog = backlog)
    );

    this.roundSubscription.add(
      combineLatest([ this.round$, this.team$ ])
        .subscribe(([round, team]) => {
          this.round = round;
          this.updateEstimationRecords(cloneDeep(this.mapToEstimationRecords(team)));
          this.setupEstimationRecords();
          this.setupTimer();
        })
    );

    this.summarySubscription.add(
      combineLatest([ this.summary$, this.team$ ])
        .subscribe(([summary, team]) => {
          this.summary = summary;
          this.updateDoughnutChartData(this.mapToDoughnutChartData(summary, team));
        })
    );
  }

  ngAfterViewInit() {
    this.setupTimer();
  }

  ngOnDestroy(): void {
    this.backlogSubscription.unsubscribe();
    this.timerSubscription.unsubscribe();
    this.roundSubscription.unsubscribe();
    this.summarySubscription.unsubscribe();
  }

  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  onCardSelected(selectedCard: DeckCardModel) {
    this.store.dispatch(EstimationActions.giveEstimation({ estimationValue: selectedCard.value }));
  }

  onChartClicked(event: ChartEvent, elements: ActiveElement[], chart: Chart) {
    if (elements.length > 0) {
        const element = elements[0];
        const label: string = String(chart.data.labels![element.index]);
        const value: number = Number(chart.data.datasets[element.datasetIndex].data[element.index]);

        const backlogItem = this.getBacklogItem(this.summary?.backlogItemNumber);
        if (backlogItem) {
          if (backlogItem.estimation === label) {
            return;
          }
          const backlogItemUpdate: BacklogItemUpdateModel = {
            title: backlogItem.title,
            description: backlogItem.description,
            estimation: label,
            priority: backlogItem.priority
          };
          this.store.dispatch(BacklogActions.updateBacklogItem({ backlogItemNumber: backlogItem.number, backlogItem: backlogItemUpdate }));
        }
    }
  }

  findEstimationRecordsByCardValue(cardValue: string): EstimationRecordModel[] {
    return this.estimationRecords
      .filter(estimationRecord => estimationRecord.card.value === cardValue);
  }

  getNumberOfEstimators(): number {
    return this.estimationRecords
      .filter(estimationRecord => estimationRecord.card.value !== this.userActiveEmoji && estimationRecord.card.value !== this.userInactiveEmoji)
      .length;
  }

  mapToDoughnutChartData(estimationSummary: EstimationSummaryModel, team: TeamModel): ChartData | undefined {
    if (!estimationSummary || !team) {
      return undefined;
    }

    const labels = estimationSummary.estimationResults
      .filter(estimationResult => this.findEstimationRecordsByCardValue(estimationResult.estimationValue).length > 0)
      .map(estimationResult => estimationResult.estimationValue);
    const data = estimationSummary.estimationResults
      .filter(estimationResult => this.findEstimationRecordsByCardValue(estimationResult.estimationValue).length > 0)
      .map(estimationResult => estimationResult.estimators.length);

    const numberOfTeamMembers = team.members
      .filter(member => member.role !== TeamMemberRoleModel.SPECTATOR)
      .length;
    const numberOfEstimatorsNotEstimate = numberOfTeamMembers - this.getNumberOfEstimators();

    if (numberOfEstimatorsNotEstimate !== 0) {
      labels.push('');
      data.push(numberOfEstimatorsNotEstimate);
      estimationSummary.consensusReached = false;
    } else if (labels.length === 1 && data.length === 1) {
      estimationSummary.consensusReached = true;
    }

    return {
      labels,
      datasets: [ {
        label: 'Users',
        data
      } ]
    };
  }

  private arrayEquals(a: any[], b: any[]): boolean {
    return a.length === b.length &&
      a.every((value, index) => value === b[index]);
  }

  updateDoughnutChartData(newDoughnutChartData: ChartData | undefined) {
    if (!this.doughnutChartData || !newDoughnutChartData) {
      this.doughnutChartData = newDoughnutChartData;
      this.chart?.update();
      return;
    }

    if (!this.arrayEquals(this.doughnutChartData.labels!, newDoughnutChartData.labels!)) {
      this.doughnutChartData.labels = [ ...newDoughnutChartData.labels! ];
      this.chart?.update();
    }

    if(!this.arrayEquals(this.doughnutChartData.datasets[0].data, newDoughnutChartData.datasets[0].data)) {
      this.doughnutChartData.datasets[0].data = [ ...newDoughnutChartData.datasets[0].data ];
      this.chart?.update();
    }
  }

  mapToEstimationRecords(team: TeamModel): EstimationRecordModel[] {
    if (!team) {
      return [];
    }
    return team.members
      .filter((member: TeamMemberModel) => member.role !== TeamMemberRoleModel.SPECTATOR)
      .map((member: TeamMemberModel): EstimationRecordModel => {
        const estimationFound: EstimationModel | undefined = this.round?.estimations.find(estimation => estimation.estimator === member.name);
        const estimationValue = estimationFound ? estimationFound.estimationValue : (member.active ? this.userActiveEmoji : this.userInactiveEmoji);
        const cardFlipped = (estimationValue === this.userActiveEmoji || estimationValue !== this.userInactiveEmoji) && this.isRoundStarted();
        return {
          card: {
            ...deckCardInitial,
            value: estimationValue,
            flipped: cardFlipped
          },
          estimator: member
        }
      });
  }

  updateEstimationRecords(newEstimationRecords: EstimationRecordModel[]) {
    for (let i = 0; i < newEstimationRecords.length; i++) {
      const newEstimationRecord = newEstimationRecords[i];
      if (!this.estimationRecords[i]) {
        this.estimationRecords[i] = newEstimationRecord;
        continue;
      }
      if(this.estimationRecords[i].estimator.active !== newEstimationRecord.estimator.active) {
        this.estimationRecords[i].estimator.active = newEstimationRecord.estimator.active;
      }
      if(this.estimationRecords[i].card.value !== newEstimationRecord.card.value) {
        this.estimationRecords[i].card.value = newEstimationRecord.card.value;
      }
      if(this.estimationRecords[i].card.flipped !== newEstimationRecord.card.flipped) {
        this.estimationRecords[i].card.flipped = newEstimationRecord.card.flipped;
      }
      if(this.estimationRecords[i].card.selected !== newEstimationRecord.card.selected) {
        this.estimationRecords[i].card.selected = newEstimationRecord.card.selected;
      }
    }
    this.estimationRecords.splice(newEstimationRecords.length);
  }

  setupEstimationRecords() {
    if (this.isRoundStarted() && this.isRevealEstimations()) {
      this.concealEstimations();
    } else if(this.isRoundFinished() && this.isConcealEstimations()) {
      this.revealEstimations();
    }
  }

  isRevealEstimations(): boolean {
    return this.estimationRecords.every(estimationRecord => !estimationRecord.card.flipped);
  }

  revealEstimations() {
    this.estimationRecords.forEach(estimationRecord => {
      if(!estimationRecord.estimator.active) {
        return;
      }
      estimationRecord.card.flipped = false
    });
  }

  isConcealEstimations(): boolean {
    return this.estimationRecords.every(estimationRecord => estimationRecord.card.flipped);
  }

  concealEstimations() {
    this.estimationRecords.forEach(estimationRecord => {
      if(!estimationRecord.estimator.active) {
        return;
      }
      estimationRecord.card.flipped = true
    });
  }

  isEstimating(estimationRecord: EstimationRecordModel) {
    return estimationRecord.estimator.active && estimationRecord.card.value === this.userActiveEmoji;
  }

  formatDuration(duration: number) {
    const seconds = duration / 1000;
    const hh = Math.floor(seconds / 3600);
    const mm = Math.floor((seconds % 3600) / 60);
    const ss = Math.round(seconds % 60);
    return String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
  }

  setupTimer() {
    if (this.isRoundStarted()) {
      this.startTimer();
    } else if(this.isRoundFinished()) {
      this.stopTimer();
    }
  }

  startTimer() {
    const startTime = this.isRoundStarted() ? new Date(this.round!.startedAt).getTime() : Date.now();
    this.timerSubscription.add(
      timer(0, 1000)
        .pipe(
          map(n => {
            const duration = Date.now() - startTime;
            const durationCleaned = duration - (duration % 1000);
            return this.formatDuration(durationCleaned);
          })
        )
        .subscribe(time => {
          this.time = time;
        })
    );
  }

  stopTimer() {
    this.timerSubscription.unsubscribe();
    this.timerSubscription = new Subscription();

    if (this.round) {
      const duration = new Date(this.round.finishedAt!).getTime() - new Date(this.round.startedAt).getTime();
      this.time = this.formatDuration(duration);
    }
  }

  repeatRound() {
    if (this.round) {
      this.store.dispatch(EstimationActions.startEstimationRound({backlogItemNumber: this.round.backlogItemNumber}));
    }
  }

  nextRound() {
    this.store.dispatch(EstimationActions.nextEstimationRound());
  }

  finishRound() {
    this.store.dispatch(EstimationActions.finishEstimationRound());
  }

  isRoundStarted() {
    return this.round !== undefined && this.round.startedAt !== undefined && this.round.finishedAt === undefined;
  }

  isRoundFinished() {
    return this.round === undefined || this.round.startedAt !== undefined && this.round.finishedAt !== undefined;
  }

  leaveSession(session: SessionModel) {
    this.store.dispatch(SessionActions.leaveSession({ sessionId: session.id }));
  }

  shareSession() {
    // Open share session modal
    const modalRef = this.modalService.open(this.shareSessionModalContent);
    modalRef.result
      .then((result) => {
        console.log('Closed with:', result);
        this.copyTextToClipboard(this.location);
      }, (reason) => {
        console.log('Dismissed:', reason);
      });
  }

  private copyTextToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Content copied to clipboard');
    },() => {
      console.error('Failed to copy');
    });
  }

  getBacklogItem(backlogItemNumber: string | undefined): BacklogItemModel | undefined {
    if (!this.backlog) {
      return undefined;
    }
    return this.backlog.items.find(backlogItem => backlogItem.number === backlogItemNumber);
  }

  collapseBacklog() {
    this.store.dispatch(BacklogActions.collapseBacklog());
  }

  collapseDiscussion() {
    this.store.dispatch(DiscussionActions.collapseDiscussion());
  }

  openBacklogOffcanvas() {
    this.offcanvasService.open(BacklogComponent, { animation: true, backdrop: true, scroll: false, position: 'start' });
  }

  openDiscussionOffcanvas() {
    this.offcanvasService.open(DiscussionComponent, { animation: true, backdrop: true, scroll: false, position: 'end' });
  }

  renameTeam(name: string) {
    this.store.dispatch(TeamActions.renameTeam({ name }));
  }

  removeClickEvent(chartOptions: ChartOptions) {
    return { ...chartOptions, events: chartOptions.events?.filter(event => event !== 'click') };
  }
}
