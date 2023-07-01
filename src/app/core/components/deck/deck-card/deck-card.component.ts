import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
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
  selectable: boolean = true;

  @Input()
  deckCard?: DeckCardModel;

  @Input()
  backSide?: TemplateRef<any>;

  @Output()
  deckCardSelected = new EventEmitter<DeckCardModel>()

  constructor(private el: ElementRef) {}

  scrollToDeckCard() {
    this.el.nativeElement.scrollIntoView({ behavior: "smooth", block: 'center', inline: 'nearest' });
  }

  onDeckCardSelected() {
    if (!this.selectable) {
      return;
    }
    if (this.deckCard) {
      this.deckCard.selected = !this.deckCard.selected;
    }
    if (this.deckCard?.selected) {
      this.scrollToDeckCard();
    }
    this.deckCardSelected.emit(this.deckCard);
  }

  getStyleVariables(): any {
    return {
      '--deck-card-front-color': this.deckCard?.colors.frontTextColor,
      '--deck-card-front-bg': this.deckCard?.colors.backgroundColor,
      '--deck-card-front-hover-color': this.deckCard?.colors.frontTextColor,
      '--deck-card-front-hover-bg': this.selectable ? this.deckCard?.colors.hoverColor : this.deckCard?.colors.backgroundColor,
      '--deck-card-back-color': this.deckCard?.colors.backTextColor,
      '--deck-card-back-bg': this.deckCard?.colors.backgroundColor,
      '--deck-card-back-hover-color': this.deckCard?.colors.backTextColor,
      '--deck-card-back-hover-bg': this.selectable ? this.deckCard?.colors.hoverColor : this.deckCard?.colors.backgroundColor
    };
  }

}
