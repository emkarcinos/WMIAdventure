import {userDataKeys} from "../localStorageKeys";
import Cookies from "../../api/Cookies";
import {getWithSetCallback, invalidateItem} from "../cache/cache";
import UserProfilesAPIGateway from "../../api/gateways/UserProfilesAPIGateway";
import {whoAmI} from "../../api/gateways/UsersAPIGateway";
import {getUserById} from "../profiles/userProfileList";

export const isLoggedIn = async () => {
    return !!await getCurrentUserId();
}

export const hasSessionCookie = () => {
    return !!Cookies.getSessionToken();
}

export const getCurrentUserData = async () => {
    if (!hasSessionCookie()) {
        invalidateItem(userDataKeys.username);
        return null;
    }

    const backendCallback = async () => {
        const who = await whoAmI();
        if (who) {
            return await getUserById(who.id);
        }
        return null;
    }
    return await getWithSetCallback(userDataKeys.username, backendCallback);
}

export const getCurrentUserId = async () => {
    const backendCallback = async () => {
        const who = await whoAmI();
        if (who)
            return who.id;
        return null;
    }
    return await getWithSetCallback(userDataKeys.id, backendCallback);
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
    return await getWithSetCallback(userDataKeys.userDecks, backendCall)
}

export const getCurrentUserDecks = async () => {
    const currentUserId = await getCurrentUserId()

    return await getUsersDecks(currentUserId);

}

export const purgeUserData = () => {
    for (const [, value] of Object.entries(userDataKeys))
        invalidateItem(value);
}
export default {isLoggedIn, getCurrentUserData, hasSessionCookie};