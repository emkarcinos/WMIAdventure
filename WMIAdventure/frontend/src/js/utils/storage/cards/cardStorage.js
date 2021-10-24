import {cardKey} from "../../localStorageKeys";
import CardsAPIGateway from "../../../api/gateways/CardsAPIGateway";
import {getWithSetCallback} from "../../cache";

export const getCardById = async (id) => {
    const callback = async () => {
        const response = await CardsAPIGateway.getCardById(id);
        return await response.json();
    }

    const cardData = await getWithSetCallback(cardKey(id), callback);
    // TODO: Cache images
    return cardData;
}

export const getCardsFromDeck = async (deck) => {
    const card1 = getCardById(deck.card1.id);
    const card2 = getCardById(deck.card2.id);
    const card3 = getCardById(deck.card3.id);
    const card4 = getCardById(deck.card4.id);
    const card5 = getCardById(deck.card5.id);
    return [card1, card2, card3, card4, card5];
}
export default {getCardById, getCardsFromDeck};