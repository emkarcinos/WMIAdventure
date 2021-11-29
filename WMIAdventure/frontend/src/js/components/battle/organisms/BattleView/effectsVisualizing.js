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

// TODO: remove this eslint disable later
// eslint-disable-next-line no-unused-vars
export const visualizeEffect = (executedEffect, component) => {
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