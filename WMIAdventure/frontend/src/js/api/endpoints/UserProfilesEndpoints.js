import API_URL from "./API_URL";

/**
 * Holds all API endpoints to user profiles service.
 */
class UserProfilesEndpoints {
    static main = API_URL + 'user-profiles/';
    static userDecks = (userId) => `${UserProfilesEndpoints.main}${userId}/decks/`;
    static userById = (userId) => `${UserProfilesEndpoints.main}${userId}/`;
}

export default UserProfilesEndpoints;