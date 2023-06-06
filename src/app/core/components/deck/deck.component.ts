import { Component, Input } from '@angular/core';
import { DeckModel, DeckCardModel } from "../../models/deck.model";

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {

  @Input()
  wrap: boolean = false;

  @Input()
  size: 'sm' | 'md' | 'lg' = 'md';

  @Input()
  deck?: DeckModel;

  onDeckCardSelected(selectedDeckCard: DeckCardModel) {
    this.deck?.cards.filter(deckCard => deckCard.value !== selectedDeckCard.value)
      .forEach(deckCard => deckCard.selected = false);
  }

}
