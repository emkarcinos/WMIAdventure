export class Deck {
    /** @type [Card] */
    cards = [];

    constructor(cards) {
        let initialPosition = 1;
        for (const card of cards) {
            card.initialPosition = initialPosition;
            this.cards.push(card);
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

    onTurnEnd() {
        for (const card of this.cards)
            card.onTurnEnd();
    }
}