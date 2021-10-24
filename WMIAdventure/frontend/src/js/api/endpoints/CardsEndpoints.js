import API_URL from "./API_URL";

/**
 * Holds all API endpoints to cards service.
 */
class CardsEndpoints {
    static main = API_URL + 'cards/';
    static effects = CardsEndpoints.main + 'card-effect/';
    static descriptions = CardsEndpoints.main + 'descriptions/';
    static levels = CardsEndpoints.main + 'card-level/';
    static byId = (id) => `${CardsEndpoints.main}/${id}`;

    static proposedCards = `${API_URL}proposed-content/cards/`
}

export default CardsEndpoints;