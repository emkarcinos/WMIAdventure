import {BaseDeck} from "./BaseDeck";
import {nullCard} from "./Card";

export class EditableDeck extends BaseDeck {
    currentlyEditingIdx = 0;

    constructor(cards) {
        super(cards);
    }

    setCurrentlyEditingCard(editingCard) {
        const editingCardFromDeck = this.cards.filter((card) => card.id === editingCard.id)[0];
        this.currentlyEditingIdx = this.cards.indexOf(editingCardFromDeck);
    }

    getCurrentlyEditingCard() {
        return this.cards[this.currentlyEditingIdx];
    }

    overrideCurrentlyEditingCard(editingCard) {
        const alreadyInDeck = this.cards.filter((card) => card.id === editingCard.id).length > 0;
        if (alreadyInDeck)
            return;

        this.cards[this.currentlyEditingIdx] = editingCard;
    }
}

export const nullEditableDeck = () => {
    const nullCards = []
    for (let i = 0; i < 5; i++)
        nullCards.push(nullCard());
    return new EditableDeck(nullCards);
}