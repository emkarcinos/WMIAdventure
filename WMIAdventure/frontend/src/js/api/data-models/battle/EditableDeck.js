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


    /**
     * Will false if the card was already in the deck
     * @param editingCard
     * @return {boolean}
     */
    tryInsertCardAtPosition(editingCard, position) {
        const isSameAsCurrentlyEditing = this.cards[this.currentlyEditingIdx].id === editingCard.id
        const alreadyInDeck = this.cards.filter((card) => card.id === editingCard.id).length > 0;
        if (alreadyInDeck && !isSameAsCurrentlyEditing)
            return false;

        const cardAtEditingPosition = this.cards[this.currentlyEditingIdx];
        this.cards = this.cards.filter(card => card.id !== cardAtEditingPosition.id);
        this.cards.splice(position - 1, 0, editingCard);
        return true
    }
}

export const nullEditableDeck = () => {
    const nullCards = []
    for (let i = 0; i < 5; i++)
        nullCards.push(nullCard());
    return new EditableDeck(nullCards);
}