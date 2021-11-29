import {
    blockNextCardEffectId,
    buffExecuteTwoTimesEffectId,
    buffNextCardDamageEffectId,
    buffNextCardEffectId,
    buffNextCardHealEffectId,
    buffNextCardShieldEffectId,
    damageEffectId,
    healEffectId,
    randomizeDeckEffectId,
    shieldEffectId,
    skipNextCardEffectId,
    stopForOneTurnEffectId,
    trueDamageEffectId
} from "../../../../api/data-models/battle/EffectIds";

/**
 * Visualizes given effect.
 * @param executedEffect {Object}
 * @param component {BattleView}
 */
export const visualizeEffect = (executedEffect, component) => {
    switch (executedEffect.id) {
        case damageEffectId:
            break;
        case trueDamageEffectId:
            break;
        case shieldEffectId:
            break;
        case randomizeDeckEffectId:
            break;
        case stopForOneTurnEffectId:
            break;
        case buffExecuteTwoTimesEffectId:
            break;
        case healEffectId:
            break;
        case blockNextCardEffectId:
            visualizeBlockCardEffect(executedEffect.target_player, component);
            break;
        case buffNextCardEffectId:
            break;
        case buffNextCardDamageEffectId:
            break;
        case buffNextCardShieldEffectId:
            break;
        case buffNextCardHealEffectId:
            break;
        case skipNextCardEffectId:
            break;
    }
}

/**
 * After some card is blocked then it has property `stoppedTurns` with value > 0.
 *
 * This function refreshes compact cards so that blocked compact card can display itself as blocked.
 *
 * See `getCompactCards` and `CompactCardView` (prop `blocked`)
 * @param target {number}
 * @param component {BattleView}
 */
const visualizeBlockCardEffect = (target, component) => {
    const enemyIsTarget = target === component.state.enemy;
    component.getCompactCards(enemyIsTarget);
    component.getMiniCards(enemyIsTarget);
}