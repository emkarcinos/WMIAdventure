/**
 * Helper functions responsible for handling different effect based on their IDs.
 */

let idCounter = 0;

import {
    blockNextCardEffectId,
    buffsEffectIds,
    randomizeDeckEffectId,
    skipNextCardEffectId,
    statusAffectingEffectIds,
    stopForOneTurnEffectId
} from "./EffectIds";

const updateStats = (target, newStats) => {
    if (newStats === undefined) return;

    target.stats = {
        hp: newStats.hp,
        armour: newStats.armour
    }
}

const updateDeckOrder = (target, newDeckOrder) => {
    if (newDeckOrder === undefined) return;

    target.deck.reorder(newDeckOrder);
}

const addBuff = (target, buffedCardId, buff) => {
    if (buffedCardId === undefined || buff === undefined) return;

    const targetCard = target.deck.lookupCardById(buffedCardId);
    buff.id = idCounter++;
    targetCard.buffs.push(buff);
}

const addStoppedTurnsToPlayer = (target, stoppedTurns) => {
    if (stoppedTurns === undefined) return;

    target.stoppedTurns += stoppedTurns;
}

const addStoppedTurnsToCard = (target, cardId, stoppedTurns) => {
    if (stoppedTurns === undefined) return;

    const card = target.deck.lookupCardById(cardId);
    card.stoppedTurns += stoppedTurns;
}


export const applyEffectToTarget = (target, effect) => {
    switch (effect.id) {
        case (statusAffectingEffectIds.includes(effect.id) ? effect.id : null):
            updateStats(target, effect.changed_stats);
            break;
        case (buffsEffectIds.includes(effect.id) ? effect.id : null):
            addBuff(target, effect.buffed_card, effect.buff);
            break;
        case randomizeDeckEffectId:
            updateDeckOrder(target, effect.new_deck_order);
            break;
        case stopForOneTurnEffectId:
            addStoppedTurnsToPlayer(target, effect.turns_stopped);
            break;
        case blockNextCardEffectId:
            addStoppedTurnsToCard(target, effect.blocked_card, effect.turns_blocked);
            break;
        case skipNextCardEffectId:
            updateDeckOrder(target, effect.new_deck_order);
            break;
    }

}

export default {applyEffectToTarget};