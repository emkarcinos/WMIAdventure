import RequestSender from "../RequestSender";
import UserProfilesEndpoints from "../endpoints/UserProfilesEndpoints";

/**
 * Returns list of all users with their basic information.
 * @returns {Promise<*>} Array of basic user info objects.
 */
const getAllBasicUsersInfo = async () => {
    const pageSize = 15;
    let users = [];
    let resp = await RequestSender.get(UserProfilesEndpoints.main + `?pagesize=${pageSize}`)
        .then(resp => resp.json());
    let pageCounter = 1;
    const appendPage = (pageNumber, hasNext, results) => {
        users.push({
            page: pageCounter,
            hasNext: hasNext,
            hasPrev: pageNumber !== 1,
            results: results
        });
    }
    appendPage(pageCounter, !!resp.next, resp.results)
    while (resp.next !== null) {
        pageCounter++;
        resp = await RequestSender.get(resp.next)
            .then(resp => resp.json());
        appendPage(pageCounter, !!resp.next, resp.results);
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

const getUserLevelData = (userId) => {
    return RequestSender.get(UserProfilesEndpoints.userIdLevel(userId));
}

const getUserCards = (userId) => {
    return RequestSender.get(UserProfilesEndpoints.userCards(userId));
}

const upgradeCard = (userId, cardId) => {
    return RequestSender.post(UserProfilesEndpoints.upgradeCard(userId, cardId));
}

export default {
    getAllBasicUsersInfo, getUserDecks, getUserById, updateUsersDeck, getUserLevelData, getUserCards,
    upgradeCard
};