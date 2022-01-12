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

    hasCardIdExceptCurrentlyEditing(id) {
        if (!super.hasCardId(id))
            return false

        return id !== this.getCurrentlyEditingCard().id;
    }

    getAsDict() {
        const res = {};
        for (let i = 0; i < this.cards.length; i++) {
            res[`card${i + 1}`] = {
                id: this.cards[i].id,
                level: this.cards[i].level
            }
        }
        return res;
    }
}

export class InsertCardAtPositionCommand {
    deck = nullEditableDeck();
    deckHistory = [];

    constructor(editableDeck) {
        this.deck = editableDeck;
        this.deckHistory.push(editableDeck.cards);
    }

    execute(editingCard, position) {
        const isSameAsCurrentlyEditing = this.deck.cards[this.deck.currentlyEditingIdx].id === editingCard.id
        const alreadyInDeck = this.deck.cards.filter((card) => card.id === editingCard.id).length > 0;
        if (alreadyInDeck && !isSameAsCurrentlyEditing)
            return false;

        const cardAtEditingPosition = this.deck.cards[this.deck.currentlyEditingIdx];
        this.deck.cards = this.deck.cards.filter(card => card.id !== cardAtEditingPosition.id);
        this.deck.cards.splice(position - 1, 0, editingCard);
        return true
    }

    rollback() {
        this.deck.cards = this.deckHistory.pop();
    }
}

export const nullEditableDeck = () => {
    const nullCards = []
    for (let i = 0; i < 5; i++)
        nullCards.push(nullCard());
    return new EditableDeck(nullCards);
}