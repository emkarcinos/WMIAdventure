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
        return RequestSender.get(CardsEndpoints.main);
    }

    /**
     * Gets all effects from API.
     * @returns {Promise<*>} Array of effect objects.
     */
    static getAllEffects() {
        return RequestSender.get(CardsEndpoints.effects);
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
}

export default CardsAPIGateway;