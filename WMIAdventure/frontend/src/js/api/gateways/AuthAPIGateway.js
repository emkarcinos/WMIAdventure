import RequestSender from "../RequestSender";
import AuthEndpoints from "../endpoints/AuthEndpoints";

function login(username) {
    const url = AuthEndpoints.authToken(username);
    const body = JSON.stringify({username: username})
    const headers = {
        'Accept': 'application/json'
    }

    return RequestSender.post(url, body, headers);
}

export default {login};