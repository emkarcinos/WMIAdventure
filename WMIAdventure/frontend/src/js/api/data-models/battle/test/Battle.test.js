import {battleFromData} from "../Battle";

const exampleData1 = {
    attacker: {
        id: 10,
        stats: {
            hp: 100.0,
            armour: 6.0
        },
        deck: [{id: 1, level: 1}],
    },
    defender: {
        id: 152,
        stats: {
            hp: 25.2,
            armour: 2.2
        },
        deck: [{id: 1, level: 1}],
    },
    outcome: {
        winner: 10
    }
}

const exampleDataWithTurns = {
    ...exampleData1,
    turns: [
        {
            attacker: {
                stats: exampleData1.attacker.stats,
                deck: [1]
            },
            defender: {
                stats: exampleData1.defender.stats,
                deck: [1]
            },
            card_executor: exampleData1.attacker.id,
            used_card: 1,
            used_effects: [
                {
                    id: 1,
                    target_player: exampleData1.defender.id,
                    power: 37.87219609052145,
                    changed_stats: {
                        hp: 62.12780390947855,
                        armour: 0.0
                    }
                },
            ],
        },
        {
            attacker: {
                stats: exampleData1.attacker.stats,
                deck: [1]
            },
            defender: {
                stats: exampleData1.defender.stats,
                deck: [1]
            },
            card_executor: exampleData1.defender.id,
            used_card: 1,
            used_effects: [
                {
                    id: 1,
                    target_player: exampleData1.attacker.id,
                    power: 37.87219609052145,
                    changed_stats: {
                        hp: 62.12780390947855,
                        armour: 0.0
                    }
                },
            ],
        },
    ]
}

test("Create Battle", () => {
    const battle = battleFromData(exampleData1);
    expect(battle.user.id).toBe(exampleData1.attacker.id);
    expect(battle.winnerId).toBe(exampleData1.outcome.winner);
})

test("Test nextTurn returns correct turns", () => {
    const battle = battleFromData(exampleDataWithTurns);
    const turn1 = battle.nextTurn();
    const turn2 = battle.nextTurn();
    const turn3 = battle.nextTurn();
    expect(turn1.executorId).toBe(exampleDataWithTurns.turns[0].card_executor);
    expect(turn2.executorId).toBe(exampleDataWithTurns.turns[1].card_executor);
    expect(turn3).toBe(null);
})

test("Should isUsersTurn get assigned correctly", () => {
    const battle = battleFromData(exampleDataWithTurns);
    battle.nextTurn();
    expect(battle.isUsersTurn).toBeTruthy();
})