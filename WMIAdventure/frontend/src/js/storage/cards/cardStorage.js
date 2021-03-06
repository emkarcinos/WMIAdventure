import {cardKey, cardsKey} from "../localStorageKeys";
import CardsAPIGateway from "../../api/gateways/CardsAPIGateway";
import {get, getWithSetCallback} from "../cache/cache";

const cacheCardsForSeconds = 600; // 10 minutes

export const getCardById = async (id) => {
    const cachedCard = await getCardByIdFromCache(id);
    if (cachedCard)
        return cachedCard;
    const callback = async () => {
        const response = await CardsAPIGateway.getCardById(id);
        return await response.json();
    }

    return await getWithSetCallback(cardKey(id), callback, cacheCardsForSeconds);
}

/**
 * Attempt to get a card from cache.
 * If no card is found in the cache returns null.
 * @param id
 * @returns {Promise<null|*>}
 */
const getCardByIdFromCache = async (id) => {
    const allCards = await get(cardsKey);
    if (!allCards)
        return null;

    const cardFromCache = allCards.filter(card => card.id === id)[0];
    if (!cardFromCache)
        return null;
    return cardFromCache;
}

export const getCardsFromDeck = async (deck) => {
    const card1 = getCardById(deck.card1.id);
    const card2 = getCardById(deck.card2.id);
    const card3 = getCardById(deck.card3.id);
    const card4 = getCardById(deck.card4.id);
    const card5 = getCardById(deck.card5.id);
    return await Promise.all([card1, card2, card3, card4, card5]);
}

export const getAllCards = async () => {
    const callback = async () => {
        const cards = await CardsAPIGateway.getAllCards();
        cards.sort((card1, card2) => {
            if (card1.name === card2.name)
                return 0;
            return card1.name.toLowerCase() < card2.name.toLowerCase() ? -1 : 1;
        });
        return cards;
    }

    return await getWithSetCallback(cardsKey, callback, cacheCardsForSeconds);
}

export default {getCardById, getCardsFromDeck};