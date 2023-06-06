import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeckCardModel } from "../../../models/deck.model";

@Component({
  selector: 'app-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.scss']
})
export class DeckCardComponent {

  @Input()
  size: 'sm' | 'md' | 'lg' = 'md';

  @Input()
  deckCard?: DeckCardModel;

  @Output()
  deckCardSelected = new EventEmitter<DeckCardModel>()

  onDeckCardSelected() {
    if (this.deckCard) {
      this.deckCard.selected = !this.deckCard.selected;
    }
    this.deckCardSelected.emit(this.deckCard);
  }

  getStyleVariables(): any {
    return {
      '--deck-card-front-color': this.deckCard?.colors.frontTextColor,
      '--deck-card-front-bg': this.deckCard?.colors.backgroundColor,
      '--deck-card-front-hover-color': this.deckCard?.colors.frontTextColor,
      '--deck-card-front-hover-bg': this.deckCard?.colors.hoverColor,
      '--deck-card-back-color': this.deckCard?.colors.backTextColor,
      '--deck-card-back-bg': this.deckCard?.colors.backgroundColor,
      '--deck-card-back-hover-color': this.deckCard?.colors.backTextColor,
      '--deck-card-back-hover-bg': this.deckCard?.colors.hoverColor
    };
  }

}
