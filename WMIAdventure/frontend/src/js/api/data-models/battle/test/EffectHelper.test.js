import {playerFromData} from "../Player";
import {applyEffectToTarget} from "../EffectHelper";

const examplePlayerWithDeck = {
    id: 10,
    stats: {
        hp: 100.0,
        armour: 6.0
    },
    deck: [
        {id: 5, level: 1},
        {id: 7, level: 1},
        {id: 2, level: 2},
        {id: 1, level: 3},
        {id: 55, level: 2},
    ]
};

const statChangingEffect = {
    id: 1,
    target_player: examplePlayerWithDeck.id,
    power: 37.8,
    changed_stats: {
        hp: 62.2,
        armour: 2.5
    }
};

const randomizeDeckEffect = {
    id: 3,
    target_player: examplePlayerWithDeck.id,
    new_deck_order: [55, 1, 5, 7, 2]
};

const skipNextCardEffect = {
    id: 9,
    target_player: examplePlayerWithDeck.id,
    new_deck_order: [7, 2, 1, 55, 5]
};

const buffApplyingCardEffect = {
    id: 8,
    target_player: examplePlayerWithDeck.id,
    buff: {
        buff_type: null,
        modifier: 2.604157938219017
    },
    buffed_card: 5
};

const stopForOneTurnCardEffect = {
    id: 4,
    target_player: examplePlayerWithDeck.id,
    turns_stopped: 1
};

const blockNextCardEffect = {
    id: 7,
    target_player: examplePlayerWithDeck.id,
    turns_blocked: 1,
    blocked_card: 5
};

test('Should apply stat changing effect', () => {
    const player = playerFromData(examplePlayerWithDeck);
    applyEffectToTarget(player, statChangingEffect);
    expect(player.stats.hp).toBe(statChangingEffect.changed_stats.hp);
    expect(player.stats.armour).toBe(statChangingEffect.changed_stats.armour);
});

test('Should apply randomize effect', () => {
    const player = playerFromData(examplePlayerWithDeck);
    applyEffectToTarget(player, randomizeDeckEffect);
    expect(player.deck.cards[0].id).toBe(randomizeDeckEffect.new_deck_order[0]);
    expect(player.deck.cards[1].id).toBe(randomizeDeckEffect.new_deck_order[1]);
    expect(player.deck.cards[2].id).toBe(randomizeDeckEffect.new_deck_order[2]);
    expect(player.deck.cards[3].id).toBe(randomizeDeckEffect.new_deck_order[3]);
    expect(player.deck.cards[4].id).toBe(randomizeDeckEffect.new_deck_order[4]);
});

test('Should apply skip card effect', () => {
    const player = playerFromData(examplePlayerWithDeck);
    applyEffectToTarget(player, skipNextCardEffect);
    expect(player.deck.cards[0].id).toBe(skipNextCardEffect.new_deck_order[0]);
    expect(player.deck.cards[4].id).toBe(skipNextCardEffect.new_deck_order[4]);
});

test('Should apply buff effect', () => {
    const player = playerFromData(examplePlayerWithDeck);
    applyEffectToTarget(player, buffApplyingCardEffect);
    const buffedCard = player.deck.lookupCardById(buffApplyingCardEffect.buffed_card);
    expect(buffedCard.buffs[0].buff_type).toBe(buffApplyingCardEffect.buff.buff_type);
    expect(buffedCard.buffs[0].modifier).toBe(buffApplyingCardEffect.buff.modifier);
});

test('Should apply player stop effect', () => {
    const player = playerFromData(examplePlayerWithDeck);
    applyEffectToTarget(player, stopForOneTurnCardEffect);
    expect(player.stoppedTurns).toBe(stopForOneTurnCardEffect.turns_stopped);
});

test('Should apply player stop effect more than once', () => {
    const player = playerFromData(examplePlayerWithDeck);
    applyEffectToTarget(player, stopForOneTurnCardEffect);
    applyEffectToTarget(player, stopForOneTurnCardEffect);
    expect(player.stoppedTurns).toBe(stopForOneTurnCardEffect.turns_stopped * 2);
})

test('Should apply block next card effect', () => {
    const player = playerFromData(examplePlayerWithDeck);
    applyEffectToTarget(player, blockNextCardEffect);
    const affectedCard = player.deck.lookupCardById(blockNextCardEffect.blocked_card);
    expect(affectedCard.stoppedTurns).toBe(blockNextCardEffect.turns_blocked);
});

test('Should apply block next card effect more than once', () => {
    const player = playerFromData(examplePlayerWithDeck);
    applyEffectToTarget(player, blockNextCardEffect);
    applyEffectToTarget(player, blockNextCardEffect);
    const affectedCard = player.deck.lookupCardById(blockNextCardEffect.blocked_card);
    expect(affectedCard.stoppedTurns).toBe(blockNextCardEffect.turns_blocked * 2);
});

test('Should apply ids to buffs incrementally', () => {
    const player = playerFromData(examplePlayerWithDeck);
    applyEffectToTarget(player, buffApplyingCardEffect);
    const firstBuffId = player.deck.lookupCardById(buffApplyingCardEffect.buffed_card).buffs[0].id;
    applyEffectToTarget(player, buffApplyingCardEffect);
    const secondBuffId = player.deck.lookupCardById(buffApplyingCardEffect.buffed_card).buffs[1].id;
    expect(firstBuffId).toBe(secondBuffId - 1);
})