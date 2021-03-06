import {cardFromData} from "./Card";
import {Deck} from "./Deck";

export class Player {
    id = 0;
    stats = {};
    /** @type Deck */
    deck = undefined;
    stoppedTurns = 0;
    username = '';
    image = null;

    constructor(id, stats, deck) {
        this.id = id;
        this.stats = stats;
        this.deck = new Deck(deck);
    }

    onTurnEnd(usedCardId) {
        if (!usedCardId && this.stoppedTurns > 0)
            this.stoppedTurns--;
        this.deck.onTurnEnd(usedCardId);
    }

    async fetchUserDataFromBackend(backendCall) {
        const data = await backendCall(this.id)
        this.username = data.displayedUsername;
        this.image = data.image;
    }
}

export const playerFromData = (data) => {
    const deck = [];
    for (const card of data.deck)
        deck.push(cardFromData(card));
    return new Player(data.id, data.stats, deck);
};

export default {Player, playerFromData};