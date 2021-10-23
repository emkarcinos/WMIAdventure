import RequestSender from "../RequestSender";
import UserEndpoints from "../endpoints/UserEndpoints";

function login(username) {
    const url = UserEndpoints.authToken(username);
    const body = JSON.stringify({username: username})
    const headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    }

    return RequestSender.post(url, body, headers);
}

export default {login};