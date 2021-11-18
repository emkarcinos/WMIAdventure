export class Card {
    id = undefined;
    level = undefined;
    buffs = [];
    stoppedTurns = 0;

    constructor(id, level) {
        this.id = id;
        this.level = level;
    }

}

export const cardFromData = (data) => {
    return new Card(data.id, data.level);
};

export default {Card, cardFromData}