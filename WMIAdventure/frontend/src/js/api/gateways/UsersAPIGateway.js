import RequestSender from "../RequestSender";
import UserEndpoints from "../endpoints/UserEndpoints";
import Cookies from "../Cookies";
import {isLoggedIn} from "../../utils/userData"

const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
};

const login = (username) => {
    const url = UserEndpoints.authToken(username);
    const body = JSON.stringify({username: username})

    return RequestSender.post(url, body, headers);
};

const registerUser = (newUserData) => {
    let body = JSON.stringify(newUserData);
    return RequestSender.post(UserEndpoints.userRegistration(), body, headers).then(response => response.json());
};

const isUserLoggedIn = async () => {
    return await isLoggedIn()
}

const logout = () => {
    Cookies.removeSessionToken();
}

export default {registerUser, login, isUserLoggedIn, logout};