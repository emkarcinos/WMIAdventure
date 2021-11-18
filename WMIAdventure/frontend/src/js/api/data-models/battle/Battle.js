import {playerFromData} from "./Player";
import {Turn} from "./Turn";

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
    winnerId = undefined;

    constructor(user, enemy, turns, winnerId) {
        this.user = user;
        this.enemy = enemy;
        this.turnsData = turns;
        this.winnerId = winnerId;
    }

    nextTurn() {
        if (this.currentTurn >= this.turnsData.length)
            return null;

        const turn = new Turn(this.turnsData[this.currentTurn], this.user, this.enemy);
        this.currentTurn++;
        return turn;
    }
}

export const battleFromData = (data) => {
    if (data === null || data === undefined) return null;
    const user = playerFromData(data.attacker);
    const enemy = playerFromData(data.defender);
    const winnerId = data.outcome.winner;

    return new Battle(user, enemy, data.turns, winnerId);
};

export default {Battle, battleFromData};