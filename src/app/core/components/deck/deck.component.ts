import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { DeckModel, DeckCardModel } from "../../models/deck.model";

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements AfterViewInit {

  @Input()
  wrap: boolean = false;

  @Input()
  size: 'sm' | 'md' | 'lg' = 'md';

  @Input()
  deck?: DeckModel;

  @Output()
  cardSelected = new EventEmitter<DeckCardModel>()

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const selectedDeckCard = this.el.nativeElement.querySelector('.selected');
    if (selectedDeckCard) {
      selectedDeckCard.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }

  onDeckCardSelected(selectedDeckCard: DeckCardModel) {
    this.deck?.cards.filter(deckCard => deckCard.value !== selectedDeckCard.value)
      .forEach(deckCard => deckCard.selected = false);
    this.cardSelected.emit(selectedDeckCard);
  }

}
