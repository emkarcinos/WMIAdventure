import {cardFromData} from "./Card";

export class Player {
    id = 0;
    stats = {};
    deck = [];

    constructor(id, stats, deck) {
        this.id = id;
        this.stats = stats;
        this.deck = deck;
    }
}

export const playerFromData = (data) => {
    const deck = [];
    for (const card of data.deck)
        deck.push(cardFromData(card));
    return new Player(data.id, data.stats, deck);
};

export default {Player, playerFromData};