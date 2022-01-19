import RequestSender from "../RequestSender";
import UserProfilesEndpoints from "../endpoints/UserProfilesEndpoints";

const defaultPageSize = 15;

const formatPage = (pageNumber, hasNext, results) => {
    return {
        page: pageNumber,
        hasNext: hasNext,
        hasPrev: pageNumber !== 1,
        results: results
    };
}

const getBasicUserInfoPage = async (pageNumber) => {
    const resp = await RequestSender.get(UserProfilesEndpoints.main + `?pagesize=${defaultPageSize}&page=${pageNumber}`)
    const json = await resp.json();
    return formatPage(pageNumber, !!json.next, json.results);
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
    return RequestSender.post(UserProfilesEndpoints.upgradeCard(userId, cardId), {});
}

export default {
    getUserDecks, getUserById, updateUsersDeck, getUserLevelData, getUserCards,
    upgradeCard, getBasicUserInfoPage
};