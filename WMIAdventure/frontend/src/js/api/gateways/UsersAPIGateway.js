import RequestSender from "../RequestSender";
import UserEndpoints from "../endpoints/UserEndpoints";

const registerUser = (newUserData) => {
    let body = JSON.stringify(newUserData);
    let headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    }
    return RequestSender.post(UserEndpoints.userRegistration(), body, headers).then(response => response.json());
}

export default registerUser