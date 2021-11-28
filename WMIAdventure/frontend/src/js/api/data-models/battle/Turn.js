import {applyEffectToTarget} from "./EffectHelper";

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
        this.usedCardId = turnData.used_card;
        this.usedEffects = turnData.used_effects;
        this.user = user;
        this.enemy = enemy;
    }

    /**
     * Returns the effect that will get executed with advance() method.
     * @return {null | {}} null if there are no more effects
     */
    getNextEffect() {
        if (this.currentlyExecutingEffectIdx >= this.usedEffects.length) {
            return null;
        }

        return this.usedEffects[this.currentlyExecutingEffectIdx];
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

        const target = (effect.target_player === this.user.id) ? this.user : this.enemy;

        applyEffectToTarget(target, effect);
        this.currentlyExecutingEffectIdx++;
    }

    /**
     * After a turn has ended we need to do some cleanup.
     * We only call cleanup for a player that was the executor as this does things like
     * removing the buffs and decrementing stopped turns counter.
     */
    onTurnEnd() {
        const executor = (this.executorId === this.user.id) ? this.user : this.enemy;
        executor.onTurnEnd(this.usedCardId);
    }
}

