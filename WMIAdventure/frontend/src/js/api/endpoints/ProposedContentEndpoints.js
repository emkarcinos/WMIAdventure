import api_url from "./api_url";

/**
 * Holds all API endpoints to proposed-content service.
 */
class ProposedContentEndpoints {
    static main = api_url + 'proposed-content/';
    static cards = ProposedContentEndpoints.main + 'cards/';
}

export default ProposedContentEndpoints;