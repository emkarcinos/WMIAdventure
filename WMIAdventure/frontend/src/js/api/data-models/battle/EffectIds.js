export const damageEffectId = 1;
export const shieldEffectId = 2;
export const healEffectId = 6;
export const trueDamageEffectId = 13;
export const statusAffectingEffectIds = [
    damageEffectId,
    shieldEffectId,
    healEffectId,
    trueDamageEffectId
];

export const buffExecuteTwoTimesEffectId = 5;
export const buffNextCardEffectId = 8;
export const buffNextCardDamageEffectId = 10;
export const buffNextCardShieldEffectId = 11;
export const buffNextCardHealEffectId = 12;
export const buffsEffectIds = [
    buffNextCardEffectId,
    buffNextCardDamageEffectId,
    buffNextCardShieldEffectId,
    buffNextCardHealEffectId,
    buffExecuteTwoTimesEffectId];
export const randomizeDeckEffectId = 3;
export const stopForOneTurnEffectId = 4;
export const blockNextCardEffectId = 7;
export const skipNextCardEffectId = 9;

export default {
    statusAffectingEffectIds,
    buffsEffectIds,
    randomizeDeckEffectId,
    stopForOneTurnEffectId,
    blockNextCardEffectId,
    skipNextCardEffectId
}