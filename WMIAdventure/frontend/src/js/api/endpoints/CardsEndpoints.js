import api_url from "./api_url";

/**
 * Holds all API endpoints to cards service.
 */
class CardsEndpoints {
    static main = api_url + 'cards/';
    static effects = CardsEndpoints.main + 'card-effect/';
    static descriptions = CardsEndpoints.main + 'descriptions/';
    static levels = CardsEndpoints.main + 'card-level/';
}

export default CardsEndpoints;