import RequestSender from "../RequestSender";
import CardsEndpoints from "../endpoints/CardsEndpoints";

/**
 * Gateway between client and API service cards. Contains handful of methods useful for client like
 * retrieving all cards list from API.
 */
class CardsAPIGateway {

    /**
     * Gets all cards from API.
     * @returns {Promise<*>} Array of card objects.
     */
    static getAllCards() {
        return RequestSender.get(CardsEndpoints.main).then(response => response.json());
    }

    /**
     * Gets all effects from API.
     * @returns {Promise<*>} Array of effect objects.
     */
    static getAllEffects() {
        return RequestSender.get(CardsEndpoints.effects).then(response => response.json());
    }

    /**
     * Gets effects description from API.
     * @param effects
     * @returns {Promise<any>} Response as json.
     */
    static getEffectsDescription(effects) {
        let body = JSON.stringify(effects);
        let headers = {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
        return RequestSender.post(CardsEndpoints.descriptions, body, headers).then(response => response.json());
    }

    /**
     * Gets all possible levels that card can have from API.
     * @returns {Promise<*>} Array of level objects.
     */
    static getLevels() {
        return RequestSender.get(CardsEndpoints.levels).then(response => response.json());
    }

    static getCardById(id) {
        return RequestSender.get(CardsEndpoints.byId(id))
    }
}

export default CardsAPIGateway;