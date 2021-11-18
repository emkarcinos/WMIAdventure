import {playerFromData} from "../Player";

const examplePlayerData = {
    id: 10,
    stats: {
        hp: 100.0,
        armour: 6.0
    },
    deck: [],
}

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
}
test("Example player creation", () => {
    const player = playerFromData(examplePlayerData);
    expect(player.id).toBe(examplePlayerData.id);
    expect(player.stats.hp).toBe(examplePlayerData.stats.hp);
})

test("Example deck creation", () => {
    const player = playerFromData(examplePlayerWithDeck);

    for (let idx = 0; idx < examplePlayerWithDeck.deck.length; idx++) {
        expect(player.deck.cards[idx].id).toBe(examplePlayerWithDeck.deck[idx].id);
        expect(player.deck.cards[idx].level).toBe(examplePlayerWithDeck.deck[idx].level);
    }
})