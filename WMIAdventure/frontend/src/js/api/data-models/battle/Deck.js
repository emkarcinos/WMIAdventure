export class Deck {
    /** @type [Card] */
    cards = [];

    constructor(cards) {
        for (const card of cards)
            this.cards.push(card);
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