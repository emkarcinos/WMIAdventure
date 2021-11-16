import {playerFromData} from "./Player";

export class Battle {
    user = undefined;
    enemy = undefined;

    constructor(user, enemy) {
        this.user = user;
        this.enemy = enemy;
    }
}

export const battleFromData = (data) => {
    if (data === null || data === undefined) return null;
    const user = playerFromData(data.attacker);
    const enemy = playerFromData(data.defender);

    return new Battle(user, enemy);
};

export default {Battle, battleFromData};