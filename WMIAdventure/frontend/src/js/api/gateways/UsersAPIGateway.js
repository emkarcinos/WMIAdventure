import RequestSender from "../RequestSender";
import UserEndpoints from "../endpoints/UserEndpoints";

const registerUser = (newUserData) => {
    return RequestSender.post(UserEndpoints.userRegistration(), newUserData);
}

export default registerUser