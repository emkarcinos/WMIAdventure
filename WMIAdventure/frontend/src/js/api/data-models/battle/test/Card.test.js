import {Card} from "../Card";

test('Should not decrement stoppedTurns below zero', () => {
    const card = new Card(1, 1);
    card.stoppedTurns = 2

    card.onTurnEnd();
    expect(card.stoppedTurns).toBe(1);

    card.onTurnEnd();
    expect(card.stoppedTurns).toBe(0);

    card.onTurnEnd();
    expect(card.stoppedTurns).toBe(0);
})

test('Should fetch from backend correctly', async () => {
    const card = new Card(15, 2);
    const mockBackendResponse = {
        id: card.id,
        name: "nm",
        subject: "sub",
        image: "img",
        tooltip: "fof",
        levels: [
            {
                level: 1,
                effects_description: "level1desc",
            },
            {
                level: 2,
                effects_description: "level2desc",
            },
        ]
    }
    const mockCallback = jest.fn(() => mockBackendResponse);
    await card.fetchFieldsFromBackend(mockCallback);
    expect(card.subject).toBe(mockBackendResponse.subject);
    expect(card.name).toBe(mockBackendResponse.name);
    expect(card.image).toBe(mockBackendResponse.image);
    expect(card.tooltip).toBe(mockBackendResponse.tooltip);
    expect(card.description).toBe(mockBackendResponse.levels[1].effects_description);

})