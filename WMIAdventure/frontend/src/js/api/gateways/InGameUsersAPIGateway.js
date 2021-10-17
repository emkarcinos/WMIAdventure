import RequestSender from "../RequestSender";
import InGameUsersEndpoints from "../endpoints/InGameUsersEndpoints";

/**
 * Returns list of all users with their basic information.
 * @returns {Promise<*>} Array of basic user info objects.
 */
const getAllBasicUsersInfo = () => {
    return RequestSender.get(InGameUsersEndpoints.basic_user_info);
}

export default {getAllBasicUsersInfo};