import {nullCard} from "./Card";

export class BaseDeck {
    /** @type [Card] */
    cards = [];

    constructor(cards) {
        for (const card of cards) {
            this.cards.push(card);
        }
    }
}

export const nullDeck = () => {
    const nullCards = []
    for (let i = 0; i < 5; i++)
        nullCards.push(nullCard());
    return new BaseDeck(nullCards);
}