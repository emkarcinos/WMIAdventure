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

export default {getCardById};