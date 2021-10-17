import api_url from "./api_url";

/**
 * Holds all API endpoints to InGameUsers service.
 */
class InGameUsersEndpoints {
    static main = api_url + 'igusers/';
    static basic_user_info = InGameUsersEndpoints.main + 'basic/';
    static user_decks = (user_id) => {return `${InGameUsersEndpoints.main}${user_id}/decks/`};
}

export default InGameUsersEndpoints;