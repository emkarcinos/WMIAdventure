import {battleFromData} from "../Battle";

const exampleData1 = {
    attacker: {
        id: 10,
        stats: {
            hp: 100.0,
            armour: 6.0
        },
        deck: [],
    },
    defender: {
        id: 152,
        stats: {
            hp: 25.2,
            armour: 2.2
        },
        deck: [],
    },
    outcome: {
        winner: 10
    }
}

test("Create Battle", () => {
    const battle = battleFromData(exampleData1);
    expect(battle.user.id).toBe(exampleData1.attacker.id);
    expect(battle.winnerId).toBe(exampleData1.outcome.winner);
})

test("Test nextTurn returns correct turns", () => {
    const turns = [{card_executor: 1}, {card_executor: 2}];
    let data = exampleData1;
    data.turns = turns;
    const battle = battleFromData(data);
    const turn1 = battle.nextTurn();
    const turn2 = battle.nextTurn();
    const turn3 = battle.nextTurn();
    expect(turn1.executorId).toBe(turns[0].card_executor);
    expect(turn2.executorId).toBe(turns[1].card_executor);
    expect(turn3).toBe(null);
})

test("Should isUsersTurn get assigned correctly", () => {
    const exampleTurnData = [{
        card_executor: exampleData1.attacker.id,
        used_card: 3,
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
    }]
    let data = exampleData1;
    data.turns = exampleTurnData;
    const battle = battleFromData(data);
    battle.nextTurn();
    expect(battle.isUsersTurn).toBeTruthy();
})