import RequestSender from "../RequestSender";
import UserProfilesEndpoints from "../endpoints/UserProfilesEndpoints";

/**
 * Returns list of all users with their basic information.
 * @returns {Promise<*>} Array of basic user info objects.
 */
const getAllBasicUsersInfo = () => {
    return RequestSender.get(UserProfilesEndpoints.main + '?pagesize=1000&page=1').then(response => response.json());
}

/**
 * Gets given user's decks from API.
 * @param userId
 * @returns {Promise<*>} Array of user decks objects.
 */
const getUserDecks = (userId) => {
    return RequestSender.get(UserProfilesEndpoints.userDecks(userId));
}

export default {getAllBasicUsersInfo, getUserDecks};