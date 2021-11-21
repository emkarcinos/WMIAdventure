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
    }

}

export const cardFromData = (data) => {
    return new Card(data.id, data.level);
};

export default {Card, cardFromData}