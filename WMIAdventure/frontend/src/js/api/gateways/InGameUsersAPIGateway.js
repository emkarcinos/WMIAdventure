import RequestSender from "../RequestSender";
import InGameUsersEndpoints from "../endpoints/InGameUsersEndpoints";

/**
 * Returns list of all users with their basic information.
 * @returns {Promise<*>} Array of basic user info objects.
 */
const getAllBasicUsersInfo = () => {
    return RequestSender.get(InGameUsersEndpoints.basic_user_info);
}

/**
 * Gets given user's decks from API.
 * @param userId
 * @returns {Promise<*>} Array of user decks objects.
 */
const getUserDecks = (userId) => {
    return RequestSender.get(InGameUsersEndpoints.user_decks(userId));
}

export default {getAllBasicUsersInfo, getUserDecks};