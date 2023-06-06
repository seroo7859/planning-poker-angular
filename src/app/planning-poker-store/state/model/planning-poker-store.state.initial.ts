import { PlanningPokerStoreStateModel } from "./planning-poker-store.state.model";
import { deckCardColorsInitial } from "../../../core/models/deck.initial";
import { xhrStateInitial } from "./xhr.state.initial";

export const planningPokerStoreStateInitial: PlanningPokerStoreStateModel = {
  user: null,
  decks: [
    {
      name: 'Standard',
      cards: [
        {
          value: '0',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '½',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '1',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '2',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '3',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '5',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '8',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '13',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '20',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '40',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '100',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '?',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '∞',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '☕',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        }
      ]
    },
    {
      name: 'Fibonacci',
      cards: [
        {
          value: '1',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '2',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '3',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '5',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '8',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '13',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '21',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '34',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '55',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '89',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '?',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '∞',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '☕',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        }
      ]
    },
    {
      name: 'T-Shirt',
      cards: [
        {
          value: 'XXS',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: 'XS',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: 'S',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: 'M',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: 'L',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: 'XL',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: 'XXL',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '?',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '∞',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        },
        {
          value: '☕',
          colors: deckCardColorsInitial,
          flipped: false,
          selected: false
        }
      ]
    }
  ],
  session: {
    data: null,
    xhr: xhrStateInitial
  }
}
