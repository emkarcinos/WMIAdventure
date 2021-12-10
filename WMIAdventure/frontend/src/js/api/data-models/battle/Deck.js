import {BaseDeck} from "./BaseDeck";

export class Deck extends BaseDeck {

    constructor(cards) {
        super(cards);
        let initialPosition = 1;
        for (const card of this.cards) {
            card.initialPosition = initialPosition;
            initialPosition++;
        }
    }

    lookupCardOnTop() {
        if (this.cards.length < 1)
            return null;
        return this.cards[0];
    }

    /**
     * Returns a card from deck with given id
     * @param id: {int}
     * @return Card
     */
    lookupCardById(id) {
        return this.cards.filter(card => card.id === id)[0];
    }

    /**
     * Returns a card by its position in deck
     * @param pos: {int}
     * @return {Card}
     */
    lookupCardByPos(pos) {
        return this.cards.filter(card => card.initialPosition === pos)[0];
    }

    getCardIdxById(id) {
        const card = this.cards.filter(card => card.id === id)[0];
        return this.cards.indexOf(card);
    }

    /**
     * Returns a card that was on top of the deck and enqueues it back.
     * @returns Card
     */
    dequeue() {
        const card = this.cards.shift()
        this.cards.push(card)
        return card;
    }

    /**
     * Sets a new order of the deck by a given array of card ids.
     * @throws RangeError when cardIds length does not match the deck's
     * @param cardIds {[int]}
     */
    reorder(cardIds) {
        if (cardIds.length !== this.cards.length)
            throw new RangeError();

        const newDeck = []
        for (const nextId of cardIds) {
            const card = this.cards.filter(card => card.id === nextId)[0];
            newDeck.push(card)
        }
        this.cards = newDeck;
    }

    onTurnEnd(executedCardId) {
        // Can happen if the card was blocked
        if (!executedCardId)
            return;
        const card = this.cards.filter(card => card.id === executedCardId)[0];
        if (!card)
            return;
        card.onTurnEnd();
    }
}