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