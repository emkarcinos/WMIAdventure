export class Card {
    id = undefined;
    level = undefined;
    buffs = [];
    stoppedTurns = 0;

    constructor(id, level) {
        this.id = id;
        this.level = level;
    }

    onTurnEnd() {
        if (this.stoppedTurns > 0)
            this.stoppedTurns--;
        this.buffs = [];
    }

}

export const cardFromData = (data) => {
    return new Card(data.id, data.level);
};

export default {Card, cardFromData}