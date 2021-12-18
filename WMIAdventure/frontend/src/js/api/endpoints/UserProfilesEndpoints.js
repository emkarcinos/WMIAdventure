import API_URL from "./API_URL";

/**
 * Holds all API endpoints to user profiles service.
 */
class UserProfilesEndpoints {
    static main = API_URL + 'user-profiles/';
    static userDecks = (userId) => `${UserProfilesEndpoints.main}${userId}/decks/`;
    static userById = (userId) => `${UserProfilesEndpoints.main}${userId}/`;
    // If we have more decks that one the deck number will also be needed
    static userIdDeck = (userId) => `${UserProfilesEndpoints.main}${userId}/decks/1/`;
    static userIdLevel = (userId) => `${UserProfilesEndpoints.main}${userId}/level/`
}

export default UserProfilesEndpoints;