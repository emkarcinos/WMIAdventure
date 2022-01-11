import {getCardById} from "../../../storage/cards/cardStorage";

export class Card {
    id = undefined;
    level = undefined;
    image = null;
    name = '';
    subject = '';
    tooltip = '';
    description = '';
    buffs = [];
    initialPosition = 0;
    stoppedTurns = 0;
    next_level_cost = null;

    constructor(id, level) {
        this.id = id;
        this.level = level;
    }

    onTurnEnd() {
        if (this.stoppedTurns > 0)
            this.stoppedTurns--;
        this.buffs = [];
    }

    async fetchFieldsFromBackend(fetchFunction) {
        const data = await fetchFunction(this.id);
        const description = data.levels.filter(level => level.level === this.level)[0].effects_description;
        this.name = data.name;
        this.image = data.image;
        this.subject = data.subject;
        this.tooltip = data.tooltip;
        this.description = description;
        this.next_level_cost = data.levels.filter(level => level.level === this.level)[0].next_level_cost;
    }

}

export const cardFromData = (data) => {
    return new Card(data.id, data.level);
};

export const cardsFromDeckData = async (data) => {
    const deck = data[0];
    if (!deck)
        return null;

    const cards = [];
    const promises = [];
    for (let i = 1; i <= 5; i++) {
        const card = deck[`card${i}`];
        const newCard = new Card(card.id, card.level)
        newCard.name = 'Ładowanie';
        promises.push(new Promise((resolve) => {
            newCard.fetchFieldsFromBackend(getCardById)
                .then(() => resolve());
        }))
        cards.push(newCard);
    }
    await Promise.all(promises);
    return cards;
}

/**
 * Converts raw user cards data received from API to array of Card objects with full data.
 * @param data Raw data from API which contains only id and level for each card.
 * @returns {Promise<[]>} Array of Card objects with full data.
 */
export const cardsFromUserCardsData = async (data) => {
    const cards = [];

    const promises = []
    for (const userCard of data) {
        const card = new Card(userCard.id, userCard.level);
        promises.push(new Promise(
                resolve => {
                    card.fetchFieldsFromBackend(getCardById).then(() => resolve());
                }
            )
        )
        cards.push(card);
    }
    await Promise.all(promises);
    return cards;
}

export const nullCard = () => {
    return new Card(0, 1);
}

export default {Card, cardFromData}