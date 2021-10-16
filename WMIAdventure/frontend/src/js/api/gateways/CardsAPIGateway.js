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

}

export default CardsAPIGateway;