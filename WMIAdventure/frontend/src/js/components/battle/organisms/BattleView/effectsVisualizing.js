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

// TODO: remove this eslint disable later
// eslint-disable-next-line no-unused-vars
export const visualizeEffect = (executedEffect, component) => {
    switch (executedEffect.id) {
        case damageEffectId:
            component.visualizeDamageEffect(executedEffect.target_player);
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