import API_URL from "./API_URL";

/**
 * Holds all API endpoints to InGameUsers service.
 */
class InGameUsersEndpoints {
    static main = API_URL + 'igusers/';
    static basicUserInfo = InGameUsersEndpoints.main + 'basic/';
    static user_decks = (user_id) => {return `${InGameUsersEndpoints.main}${user_id}/decks/`};
}

export default InGameUsersEndpoints;