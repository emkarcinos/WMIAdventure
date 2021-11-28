import {playerFromData} from "./Player";
import {Turn} from "./Turn";
import {getCardById} from "../../../storage/cards/cardStorage";
import {getUserById} from "../../../storage/profiles/userProfileList";

/**
 Battle class transforms backend data into an actual battle process accessed via helper methods.
 Backend handles all battle logic here and provides data about what has happened, not about the states
 of things, which is why we need to re-calculate some stuff to provide frontend views with stateful data.
 Each state is lazily-evaluated, and we can iterate over all turns to get the desired data.
 */
export class Battle {

    // Stateful data that will change between turns
    /** @type Player */
    user = undefined;
    /** @type Player */
    enemy = undefined;

    // Static data about the battle from backend
    turnsData = [];
    currentTurnNum = 0;
    isUsersTurn = true;
    winnerId = undefined;
    /** @type Turn */
    currentTurn = undefined;

    constructor(user, enemy, turns, winnerId) {
        this.user = user;
        this.enemy = enemy;
        this.turnsData = turns;
        this.winnerId = winnerId;
    }

    nextTurn() {
        if (this.currentTurn)
            this.currentTurn.onTurnEnd();
        
        if (this.currentTurnNum >= this.turnsData.length)
            return null;

        this.user.deck.reorder(this.turnsData[this.currentTurnNum].attacker.deck);
        this.enemy.deck.reorder(this.turnsData[this.currentTurnNum].defender.deck);
        const turn = new Turn(this.turnsData[this.currentTurnNum], this.user, this.enemy);
        this.isUsersTurn = (turn.executorId === this.user.id);
        this.currentTurnNum++;
        this.currentTurn = turn;
        return this.currentTurn;
    }

    /**
     * Asynchronously fetches all not critical data about the battle (such as card image, etc).
     * Will not throw if there are errors.
     */
    fetchNonVitalDataAsynchronously() {
        for (const userCard of this.user.deck.cards)
            userCard.fetchFieldsFromBackend(getCardById);
        for (const enemyCard of this.enemy.deck.cards)
            enemyCard.fetchFieldsFromBackend(getCardById);

        this.user.fetchUserDataFromBackend(getUserById);
        this.enemy.fetchUserDataFromBackend(getUserById);
    }

    getCardByInitialPos(isEnemy, pos) {
        return isEnemy ? this.enemy.deck.lookupCardByPos(pos) : this.user.deck.lookupCardByPos(pos);
    }

    getCardOnTop() {
        return this.isUsersTurn ? this.user.deck.lookupCardOnTop() : this.enemy.deck.lookupCardOnTop();
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