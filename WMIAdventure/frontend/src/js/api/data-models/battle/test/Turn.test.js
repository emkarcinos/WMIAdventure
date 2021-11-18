import {playerFromData} from "../Player";
import {Turn} from "../Turn";

const attacker = {
    id: 1,
    stats: {
        hp: 100.0,
        armour: 0.0
    },
    deck: [{id: 3}, {id: 2}, {id: 5}, {id: 1}, {id: 4}],
}

const defender = {
    id: 3,
    stats: {
        hp: 100.0,
        armour: 0.0
    },
    deck: [{id: 3}, {id: 4}, {id: 2}, {id: 5}, {id: 1}],
}

const exampleTurnData = {
    card_executor: attacker.id,
    used_card: 3,
    used_effects: [
        {
            id: 1,
            target_player: defender.id,
            power: 37.87219609052145,
            changed_stats: {
                hp: 62.12780390947855,
                armour: 0.0
            }
        },
        {
            id: 3,
            target_player: defender.id,
            new_deck_order: [1, 2, 4, 3, 5]
        },
    ],
}


test('Should create turn object correctly', () => {
    const user = playerFromData(attacker);
    const enemy = playerFromData(defender);
    const turn = new Turn(exampleTurnData, user, enemy);
    expect(turn.executorId).toBe(exampleTurnData.card_executor);
    expect(turn.usedCardId).toBe(exampleTurnData.used_card);
    expect(turn.usedEffects).toBe(exampleTurnData.used_effects);
});

test('Should getNextEffect return correct effect data', () => {
    const user = playerFromData(attacker);
    const enemy = playerFromData(defender);
    const turn = new Turn(exampleTurnData, user, enemy);
    const effect = turn.getNextEffect();
    expect(effect.id).toBe(exampleTurnData.used_effects[0].id)
    expect(effect.target_player).toBe(exampleTurnData.used_effects[0].target_player)
});

test('Should getNextEffect return null when no effects are remaining', () => {
    const user = playerFromData(attacker);
    const enemy = playerFromData(defender);
    const turn = new Turn({used_effects: []}, user, enemy);
    const effect = turn.getNextEffect();
    expect(effect).toBeNull();
});

test('Should onTurnEnd get called after getNextEffect returning null', () => {
    const user = playerFromData(attacker);
    user.stoppedTurns = 5;
    const enemy = playerFromData(defender);
    const turn = new Turn({used_effects: [], card_executor: user.id}, user, enemy);
    const effect = turn.getNextEffect();
    expect(effect).toBeNull();
    expect(user.stoppedTurns).toBe(4);
});

test('Should advance apply one effect to target', () => {
    const user = playerFromData(attacker);
    const enemy = playerFromData(defender);
    const turn = new Turn(exampleTurnData, user, enemy);
    const hpBeforeExecution = enemy.stats.hp;
    turn.advance();
    const hpAfterExecution = enemy.stats.hp;
    expect(hpBeforeExecution).toBeGreaterThan(hpAfterExecution);
});

test('Should consecutive advance calls affect target with multiple effects', () => {
    const user = playerFromData(attacker);
    const enemy = playerFromData(defender);
    const turn = new Turn(exampleTurnData, user, enemy);
    turn.advance();
    turn.advance();
    expect(enemy.deck.cards[0].id).toBe(exampleTurnData.used_effects[1].new_deck_order[0]);
    expect(enemy.deck.cards[1].id).toBe(exampleTurnData.used_effects[1].new_deck_order[1]);
    expect(enemy.deck.cards[2].id).toBe(exampleTurnData.used_effects[1].new_deck_order[2]);
    expect(enemy.deck.cards[3].id).toBe(exampleTurnData.used_effects[1].new_deck_order[3]);
    expect(enemy.deck.cards[4].id).toBe(exampleTurnData.used_effects[1].new_deck_order[4]);
});


