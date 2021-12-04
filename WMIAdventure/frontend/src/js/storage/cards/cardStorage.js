import {cardKey, cardsKey} from "../localStorageKeys";
import CardsAPIGateway from "../../api/gateways/CardsAPIGateway";
import {get, getWithSetCallback} from "../cache/cache";

export const getCardById = async (id) => {
    const cachedCard = getCardByIdFromCache(id);
    if (cachedCard)
        return cachedCard;
    const callback = async () => {
        const response = await CardsAPIGateway.getCardById(id);
        return await response.json();
    }

    return await getWithSetCallback(cardKey(id), callback);
}

/**
 * Attempt to get a card from cache.
 * If no card is found in the cache returns null.
 * @param id
 * @returns {Promise<null|*>}
 */
const getCardByIdFromCache = async (id) => {
    const allCards = get(cardsKey);
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
    return [card1, card2, card3, card4, card5];
}

export const getAllCards = async () => {
    const callback = async () => {
        return await CardsAPIGateway.getAllCards();
    }

    return await getWithSetCallback(cardsKey, callback);
}

export default {getCardById, getCardsFromDeck};