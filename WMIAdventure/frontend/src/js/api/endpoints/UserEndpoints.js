import API_URL from "./API_URL";

/**
 * Holds all API endpoints to user service.
 */
class UserEndpoints {
    static main = API_URL + 'users/';
    static whoAmI = `${UserEndpoints.main}whoami/`;

    static login = () => {
        return `${UserEndpoints.main}login/`
    };

    static userRegistration = () => {
        return `${UserEndpoints.main}register/`
    };
}

export default UserEndpoints;