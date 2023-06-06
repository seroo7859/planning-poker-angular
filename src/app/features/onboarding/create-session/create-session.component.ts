import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { Observable, Subject , withLatestFrom} from "rxjs";
import {
  CreateDeckModalContentComponent
} from "../../../core/components/create-deck-modal-content/create-deck-modal-content.component";
import { DeckCardModel, DeckModel } from "../../../core/models/deck.model";
import { DecksSelectors, SessionSelectors } from "../../../planning-poker-store/selectors";
import { SessionActions } from "../../../planning-poker-store/actions";

@Component({
  selector: 'app-session-create',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent implements OnInit {

  session$: Observable<any> = new Observable<any>();
  decks$: Observable<DeckModel[]> = new Observable<DeckModel[]>();
  onSubmit$: Subject<NgForm> = new Subject<NgForm>();

  selectedDeck: string = '';

  constructor(private modalService: NgbModal, private readonly store: Store) {}

  ngOnInit() {
    this.session$ = this.store.select(SessionSelectors.selectSession);
    this.decks$ = this.store.select(DecksSelectors.selectDecks);
    this.onSubmit$
      .pipe(
        withLatestFrom(this.decks$)
      )
      .subscribe(([form, decks]) => {
        if (form.valid) {
          // Get selected deck
          const deck = decks.filter(deck => deck.name.toLowerCase() === this.selectedDeck)[0];

          // Remove optional properties
          const newDeck = structuredClone(deck);
          newDeck.cards.forEach((card: DeckCardModel) => {
            delete card.flipped;
            delete card.selected;
          });

          // Dispatch action
          const data = { ...form.value, deck: newDeck };
          this.store.dispatch(SessionActions.createSession({ session: data }));
        }
      });
  }

  getEstimationValues(deck: DeckModel) {
    return deck.cards.map(card => card.value);
  }

  onDeckChanged(deck: NgModel) {
    if (deck.value === 'custom') {
      deck.control.setValue(this.selectedDeck);

      // Open create deck modal
      const modalRef = this.modalService.open(CreateDeckModalContentComponent, { size: 'lg' });
      modalRef.result
        .then((result) => {
          console.log(`Closed with: ${result.message}`);

          // Select created deck
          this.selectedDeck = result.deck;
          deck.control.setValue(this.selectedDeck);
        }, (reason) => {
          console.log(`Dismissed: ${reason}`);
        });
    } else {
      this.selectedDeck = deck.value;
    }
  }

}
