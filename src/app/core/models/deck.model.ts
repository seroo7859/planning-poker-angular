export interface DeckModel {
  name: string;
  cards: DeckCardModel[];
}

export interface DeckCardModel {
  value: string;
  colors: DeckCardColorsModel;
  flipped?: boolean;
  selected?: boolean;
}

export interface DeckCardColorsModel {
  frontTextColor: string;
  backTextColor: string;
  backgroundColor: string;
  hoverColor: string;
}
