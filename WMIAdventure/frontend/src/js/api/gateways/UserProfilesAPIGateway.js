import RequestSender from "../RequestSender";
import UserProfilesEndpoints from "../endpoints/UserProfilesEndpoints";

/**
 * Returns list of all users with their basic information.
 * @returns {Promise<*>} Array of basic user info objects.
 */
const getAllBasicUsersInfo = async () => {
    const pageSize = 1000;
    let users = [];
    let resp = await RequestSender.get(UserProfilesEndpoints.main + `?pagesize=${pageSize}`)
        .then(resp => resp.json());
    users.push.apply(users, resp.results);
    while (resp.next !== null) {
        resp = await RequestSender.get(resp.next)
            .then(resp => resp.json());
        users.push.apply(users, resp.results);
    }
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

const getUserById = (userId) => {
    return RequestSender.get(UserProfilesEndpoints.userById(userId));
}

const updateUsersDeck = (userId, deck) => {
    const headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    };
    const body = JSON.stringify({...deck})
    return RequestSender.put(UserProfilesEndpoints.userIdDeck(userId), body, headers)

}
export default {getAllBasicUsersInfo, getUserDecks, getUserById, updateUsersDeck};