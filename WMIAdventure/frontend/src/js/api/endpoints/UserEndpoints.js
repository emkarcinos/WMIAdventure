import API_URL from "./API_URL";

/**
 * Holds all API endpoints to user service.
 */
class UserEndpoints {
    static main = API_URL + 'users/';

    static authToken = (username) => {
        return `${UserEndpoints.main}api-token-auth/${username}/`
    };

    static userRegistration = () => {
        return `${UserEndpoints.main}register/`
    };
}

export default UserEndpoints;