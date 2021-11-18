import {Card} from "../Card";
import {Deck} from "../Deck";

const card1 = new Card(1, 1);
const card2 = new Card(2, 2);
const card3 = new Card(3, 2);

test('Deck assignment with example cards', () => {
    const cards = [card1, card2];
    const deck = new Deck(cards);
    expect(deck.cards[0].id).toBe(card1.id);
    expect(deck.cards[1].id).toBe(card2.id);
    expect(deck.cards[0].level).toBe(card1.level);
    expect(deck.cards[1].level).toBe(card2.level);
})

test('Should getCardOnTop return card on top', () => {
    const cards = [card1, card2];
    const deck = new Deck(cards);
    expect(deck.lookupCardOnTop().id).toBe(card1.id)
})

test('Should dequeue return first card from deck and enqueue it back', () => {
    const cards = [card1, card2];
    const deck = new Deck(cards);
    expect(deck.dequeue().id).toBe(card1.id);
    expect(deck.dequeue().id).toBe(card2.id);
    expect(deck.dequeue().id).toBe(card1.id);
})

test('Should deck reorder throw when deck sizes are not equal', () => {
    const cards = [card1, card2];
    const deck = new Deck(cards);
    const ids = [1, 2, 3, 4, 5, 6];
    expect(() => deck.reorder(ids)).toThrow(RangeError);
})

test('Should deck reorder by given ids correctly', () => {
    const cards = [card1, card2, card3]; // ids: 1,2,3
    const deck = new Deck(cards);
    const newOrder = [3, 2, 1];
    deck.reorder(newOrder);
    expect(deck.cards[0].id).toBe(card3.id);
    expect(deck.cards[1].id).toBe(card2.id);
    expect(deck.cards[2].id).toBe(card1.id);
})

test('Should lookupById return correct card', () => {
    const cards = [card1, card2, card3]; // ids: 1,2,3
    const deck = new Deck(cards);
    const lookupCardId2 = deck.lookupCardById(card2.id);
    const lookupCardId3 = deck.lookupCardById(card3.id);
    const lookupCardId1 = deck.lookupCardById(card1.id);
    expect(lookupCardId2.id).toBe(card2.id);
    expect(lookupCardId3.id).toBe(card3.id);
    expect(lookupCardId1.id).toBe(card1.id);
})