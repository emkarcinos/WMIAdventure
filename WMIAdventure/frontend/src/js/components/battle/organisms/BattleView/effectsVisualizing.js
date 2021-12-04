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
import {nextStepAnimationDuration} from "../../../../utils/globals";

/**
 * Visualizes given effect.
 * @param executedEffect {Object}
 * @param component {BattleView}
 */
export const visualizeEffect = (executedEffect, component) => {
    if (!executedEffect)
        return;
    switch (executedEffect.id) {
        case damageEffectId:
            visualizeStatusEffect(executedEffect.target_player, 'damage', component);
            break;
        case trueDamageEffectId:
            visualizeStatusEffect(executedEffect.target_player, 'true-damage', component);
            break;
        case shieldEffectId:
            visualizeStatusEffect(executedEffect.target_player, 'shield', component);
            break;
        case randomizeDeckEffectId:
            break;
        case stopForOneTurnEffectId:
            break;
        case buffExecuteTwoTimesEffectId:
            break;
        case healEffectId:
            visualizeStatusEffect(executedEffect.target_player, 'heal', component);
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

const visualizeStatusEffect = (target, effectType, component) => {
    if (target === component.state.user) {
        component.setState({
            effectFrameOpacity: {type: `${effectType}`, user: '0.5', enemy: '0'}
        });
    } else {
        component.setState({
            effectFrameOpacity: {type: `${effectType}`, user: '0', enemy: '0.5'}
        });
    }
    setTimeout(() => {
        component.setState({
            effectFrameOpacity: {type: `${effectType}`, user: '0', enemy: '0'}
        });
    }, nextStepAnimationDuration);
}

const buffModifierHandle = (modifier) => {
    if (modifier > 0)
        return `+${modifier}`;
    else if (modifier === 0)
        return '0';
    else if (modifier === undefined)
        return '2x';
    else
        return `-${modifier}`;
}

export {buffModifierHandle};