import RequestSender from "../RequestSender";
import UserEndpoints from "../endpoints/UserEndpoints";
import Cookies from "../Cookies";
import {isLoggedIn, purgeUserData} from "../../storage/user/userData"

const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
};

const login = (username, password) => {
    const url = UserEndpoints.login();
    const body = JSON.stringify({
        username: username,
        password: password
    });

    return RequestSender.post(url, body, headers);
};

const registerUser = (newUserData) => {
    let body = JSON.stringify(newUserData);
    return RequestSender.post(UserEndpoints.userRegistration(), body, headers);
};

const isUserLoggedIn = async () => {
    return await isLoggedIn()
}

const logout = () => {
    Cookies.removeSessionToken();
    purgeUserData();
}

export const whoAmI = async () => {
    const response = await RequestSender.get(UserEndpoints.whoAmI);
    if (response.ok)
        return await response.json();

    return null
}

export default {registerUser, login, isUserLoggedIn, logout, whoAmI};