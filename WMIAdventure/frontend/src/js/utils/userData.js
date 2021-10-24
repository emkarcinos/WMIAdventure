import {userDataKeys} from "./localStorageKeys";
import Cookies from "../api/Cookies";
import RequestSender from "../api/RequestSender";
import UserEndpoints from "../api/endpoints/UserEndpoints";

export const isLoggedIn = async () => {
    return !!await getCurrentUsername();
}

export const hasSessionCookie = () => {
    return !!Cookies.getSessionToken();
}

export const getCurrentUsername = async () => {
    if(!hasSessionCookie()) {
        sessionStorage.removeItem(userDataKeys.username);
        return null;
    }

    const cachedUsername = sessionStorage.getItem(userDataKeys.username);
    if(cachedUsername)
        return cachedUsername;

    const response = await RequestSender.get(UserEndpoints.whoAmI);
    if(response.ok) {
        const respData = await response.json();
        const username = respData.username;
        sessionStorage.setItem(userDataKeys.username, username);
        return username;
    }
    return null;
}

export default {isLoggedIn, getCurrentUsername, hasSessionCookie};