import API_URL from "./API_URL";

const authToken = (username) => {
    return `${API_URL}users/api-token-auth/${username}/`;
}

export default {authToken};