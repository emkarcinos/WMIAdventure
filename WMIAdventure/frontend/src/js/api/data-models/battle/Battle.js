import {playerFromData} from "./Player";
import {Turn} from "./test/Turn";

/**
 Battle class transforms backend data into an actual battle process accessed via helper methods.
 Backend handles all battle logic here and provides data about what has happened, not about the states
 of things, which is why we need to re-calculate some stuff to provide frontend views with stateful data.
 Each state is lazily-evaluated, and we can iterate over all turns to get the desired data.
 */
export class Battle {

    // Stateful data that will change between turns
    user = undefined;
    enemy = undefined;

    // Static data about the battle from backend
    turnsData = [];
    currentTurn = 0;

    constructor(user, enemy, turns) {
        this.user = user;
        this.enemy = enemy;
        this.turnsData = turns;
    }

    nextTurn() {
        if (this.currentTurn >= this.turnsData.length)
            return null;

        const turn = new Turn(this.turnsData[this.currentTurn]);
        this.currentTurn++;
        return turn;
    }
}

export const battleFromData = (data) => {
    if (data === null || data === undefined) return null;
    const user = playerFromData(data.attacker);
    const enemy = playerFromData(data.defender);

    return new Battle(user, enemy, data.turns);
};

export default {Battle, battleFromData};