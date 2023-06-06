import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgForm, NgModel } from "@angular/forms";
import { Store } from "@ngrx/store";
import { DeckCardModel, DeckModel } from "../../models/deck.model";
import { deckCardColorsInitial } from "../../models/deck.initial";
import { DecksActions } from "../../../planning-poker-store/actions";

@Component({
  selector: 'app-deck-modal-content',
  templateUrl: './create-deck-modal-content.component.html',
  styleUrls: ['./create-deck-modal-content.component.scss']
})
export class CreateDeckModalContentComponent {

  deck: DeckModel = {
    name: '',
    cards: []
  }

  specialEstimationValues = ['?', '∞', '☕'];

  constructor(public activeModal: NgbActiveModal, private readonly store: Store) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(DecksActions.addDeck({ deck: this.deck }));
      this.activeModal.close({ message: 'Save click', deck: this.deck.name.toLowerCase() });
    }
  }

  addSpecial(deckInput: NgModel) {
    const estimationValues: string[] = this.mapDeckInputToEstimationValues(deckInput.value)
      .concat(this.specialEstimationValues);
    const newDeckInput: string = estimationValues.join(',');

    deckInput.control.setValue(newDeckInput);
    this.deck.cards = this.mapEstimationValuesToDeckCardModels(estimationValues);
  }

  removeSpecial(deckInput: NgModel) {
    const estimationValues: string[] = this.mapDeckInputToEstimationValues(deckInput.value)
      .filter((estimationValue) => !this.specialEstimationValues.includes(estimationValue));
    const newDeckInput: string = estimationValues.join(',');

    deckInput.control.setValue(newDeckInput);
    this.deck.cards = this.mapEstimationValuesToDeckCardModels(estimationValues);
  }

  onDeckInput(deckInput: NgModel) {
    if (deckInput.valid) {
      const estimationValues: string[] = this.mapDeckInputToEstimationValues(deckInput.value);
      this.deck.cards = this.mapEstimationValuesToDeckCardModels(estimationValues);
    }
  }

  private mapDeckInputToEstimationValues(deckInput: string): string[] {
    return deckInput
      .split(',')
      .map((estimationValue: string) => estimationValue.trim())
      .filter((estimationValue: string) => estimationValue.length !== 0)
  }

  private mapEstimationValuesToDeckCardModels(estimationValues: string[]): DeckCardModel[] {
    return estimationValues
      .map((estimationValue: string) => this.mapEstimationValueToDeckCardModel(estimationValue));
  }

  private mapEstimationValueToDeckCardModel(estimationValue: string): DeckCardModel {
    return {
      value: estimationValue,
      colors: deckCardColorsInitial,
      flipped: false,
      selected: false
    };
  }
}
