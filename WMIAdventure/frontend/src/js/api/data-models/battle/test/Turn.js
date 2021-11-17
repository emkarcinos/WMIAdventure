export class Turn {
    executorId = undefined;
    usedCardId = undefined;

    /** @type {Player} */
    user = undefined;
    /** @type {Player} */
    enemy = undefined;

    usedEffects = [];
    currentlyExecutingEffectIdx = 0;

    constructor(turnData, user, enemy) {
        this.executorId = turnData.card_executor;
        this.usedCardId = turnData.used_effects;
        this.usedEffects = turnData.used_effects;
        this.user = user;
        this.enemy = enemy;
    }
}

