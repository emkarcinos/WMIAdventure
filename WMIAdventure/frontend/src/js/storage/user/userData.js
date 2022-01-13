import {profileKey, profileLevelKey, userDataKeys} from "../localStorageKeys";
import Cookies from "../../api/Cookies";
import {get, getWithSetCallback, invalidateItem, set} from "../cache/cache";
import UserProfilesAPIGateway from "../../api/gateways/UserProfilesAPIGateway";
import {whoAmI} from "../../api/gateways/UsersAPIGateway";
import {getUserById} from "../profiles/userProfileList";

const cacheUserDataForSeconds = 3600; // One hour
const cacheLevelsFor = 60; // One minute
const cacheUserCardsFor = 600; // Ten minutes

export const isLoggedIn = async () => {
    return !!await getCurrentUserId();
}

export const hasSessionCookie = () => {
    return !!Cookies.getSessionToken();
}

export const getCurrentUserData = async (forceUpdate = false) => {
    if (!hasSessionCookie()) {
        invalidateItem(userDataKeys.username);
        return null;
    }

    const backendCallback = async () => {
        const who = await whoAmI();
        if (who) {
            return await getUserById(who.id, true);
        }
        return null;
    }
    if (forceUpdate)
        await set(userDataKeys.username, backendCallback, cacheUserDataForSeconds);
    return await getWithSetCallback(userDataKeys.username, backendCallback, cacheUserDataForSeconds);
}

export const getCurrentUserId = async () => {
    const backendCallback = async () => {
        const who = await whoAmI();
        if (who)
            return who.id;
        return null;
    }
    return await getWithSetCallback(userDataKeys.id, backendCallback, cacheUserDataForSeconds);
}

/**
 * Update deck for this current user with caching
 * @param deck - an array of deck cards (id, level)
 * @return {Promise<boolean>} True if successful
 */
export const updateCurrentUserDeck = async (deck) => {
    const currentUserId = await getCurrentUserId();

    const backendResp = await UserProfilesAPIGateway.updateUsersDeck(currentUserId, deck);
    if (!backendResp.ok)
        return false;

    set(userDataKeys.userDecks, [deck]);
    return true;
}


export const getUsersDecks = async (userId) => {
    const backendCall = async () => {
        const resp = await UserProfilesAPIGateway.getUserDecks(userId);
        if (resp.ok) {
            const data = await resp.json();
            return data.user_decks;
        }
        return null
    }
    return await getWithSetCallback(userDataKeys.userDecks, backendCall, cacheUserDataForSeconds);
}

export const getUsersLevelData = async (id, forceUpdate = false) => {
    const backendCallback = async () => {
        const data = await UserProfilesAPIGateway.getUserLevelData(id);
        if (!data.ok)
            return null;
        return await data.json();
    }
    if (forceUpdate)
        await set(profileLevelKey(id), backendCallback, cacheLevelsFor);
    return await getWithSetCallback(profileLevelKey(id), backendCallback, cacheLevelsFor);
}

export const getCurrentUsersLevelData = async () => {
    const currentUserId = await getCurrentUserId();

    return await getUsersLevelData(currentUserId);
}

export const getCurrentUserDecks = async () => {
    const currentUserId = await getCurrentUserId()

    return await getUsersDecks(currentUserId);

}

export const getCurrentUserCards = async () => {
    const currentUserId = await getCurrentUserId();

    const callback = async () => {
        const data = await UserProfilesAPIGateway.getUserCards(currentUserId);
        if (!data.ok)
            return null;
        return await data.json();
    }

    return await getWithSetCallback(userDataKeys.userCards, callback, cacheUserCardsFor);
}

export const upgradeCurrentUserCard = async (cardId) => {
    const currentUserId = await getCurrentUserId();

    return await UserProfilesAPIGateway.upgradeCard(currentUserId, cardId);
}

export const purgeUserData = () => {
    const userId = get(userDataKeys.id);
    invalidateItem(profileKey(userId));
    for (const [, value] of Object.entries(userDataKeys))
        invalidateItem(value);
}
export default {isLoggedIn, getCurrentUserData, hasSessionCookie};