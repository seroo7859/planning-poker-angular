import { DeckCardModel, DeckCardColorsModel } from "./deck.model";

export const deckCardColorsInitial: DeckCardColorsModel = {
  frontTextColor: '#000000',
  backTextColor: '#DC3545',
  backgroundColor: '#F8F9FA',
  hoverColor: '#FFF0C1'
}

export const deckCardInitial: DeckCardModel = {
  value: '?',
  colors: deckCardColorsInitial,
  flipped: false,
  selected: false
};
