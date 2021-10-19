import API_URL from "./API_URL";

/**
 * Holds all API endpoints to user profiles service.
 */
class UserProfilesEndpoints {
    static main = API_URL + 'user-profiles/';
    static basicUserInfo = UserProfilesEndpoints.main + 'basic/';
    static user_decks = (user_id) => {return `${UserProfilesEndpoints.main}${user_id}/decks/`};
}

export default UserProfilesEndpoints;