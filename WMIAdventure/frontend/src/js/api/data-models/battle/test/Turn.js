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


    /**
     * Returns the effect that will get executed with advance() method.
     * @return {null | effect} null if there are no more effects
     */
    getNextEffect() {
        if (this.currentlyExecutingEffectIdx >= this.currentlyExecutingEffectIdx)
            return null;

        const effect = this.usedEffects[this.currentlyExecutingEffectIdx];
        return {
            id: effect.id,
            targetId: effect.target_player,
            power: effect.power
        }
    }

    /**
     * Executes one effect in this turn.
     * This will update user and enemy state based of off this effect.
     * Will not do anything if there are no more effects to use.
     */
    advance() {
        const effect = this.getNextEffect();
        if (!effect)
            return;

        const target = this.user ? (effect.target_player === this.user.id) : this.enemy;

        this.updateStats(target, effect.changed_stats);

    }

    updateStats(target, newStats) {
        if (newStats === undefined) return;

        target.stats = {
            hp: newStats.hp,
            armour: newStats.armour
        }
    }

    updateDeckOrder(target, newDeckOrder) {
    }

}

