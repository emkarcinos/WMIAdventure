import RequestSender from "../RequestSender";
import UserEndpoints from "../endpoints/UserEndpoints";
import Cookies from "../Cookies";

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
    const response = await RequestSender.get(UserEndpoints.whoAmI);
    return response.ok;
}

const logout = () => {
    Cookies.removeSessionToken();
}

export default {registerUser, login, isUserLoggedIn, logout};