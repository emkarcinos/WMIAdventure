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

test('Should not decrement stoppedTurns below zero', () => {
    const player = playerFromData(examplePlayerWithDeck);
    player.stoppedTurns = 2

    player.onTurnEnd(5);
    expect(player.stoppedTurns).toBe(1);

    player.onTurnEnd(5);
    expect(player.stoppedTurns).toBe(0);

    player.onTurnEnd(5);
    expect(player.stoppedTurns).toBe(0);
})

test('Should fetch and extra data correctly', async () => {
    const mockBackendResponse = {
        displayedUsername: "abie"
    }
    const player = playerFromData(examplePlayerData);
    const mockCallback = jest.fn(() => mockBackendResponse);
    await player.fetchUserDataFromBackend(mockCallback);
    expect(player.username).toBe(mockBackendResponse.displayedUsername);

})