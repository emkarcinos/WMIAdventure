import RequestSender from "../RequestSender";
import UserProfilesEndpoints from "../endpoints/UserProfilesEndpoints";

/**
 * Returns list of all users with their basic information.
 * @returns {Promise<*>} Array of basic user info objects.
 */
const getAllBasicUsersInfo = async () => {
    let users = [];
    let resp = await RequestSender.get(UserProfilesEndpoints.main + '?pagesize=1000')
        .then(resp => resp.json());
    users.push.apply(users, resp.results);
    while (resp.next !== null) {
        resp = await RequestSender.get(resp.next)
            .then(resp => resp.json());
        users.push.apply(users, resp.results);
    }
    console.log(users);
    return users;
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