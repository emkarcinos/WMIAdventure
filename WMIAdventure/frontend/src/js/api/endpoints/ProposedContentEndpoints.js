import API_URL from "./API_URL";

/**
 * Holds all API endpoints to proposed-content service.
 */
class ProposedContentEndpoints {
    static main = API_URL + 'proposed-content/';
    static cards = ProposedContentEndpoints.main + 'cards/';
}

export default ProposedContentEndpoints;