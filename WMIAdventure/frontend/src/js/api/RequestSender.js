/**
 * Handles sending requests.
 */
import Cookies from "./Cookies";

class RequestSender {
    static makeRequest = (url, init) => {
        init.credentials = 'include';

        const token = Cookies.getSessionToken();
        if (token) {
            init.headers.Authorization = `Token ${Cookies.getSessionToken()}`;
        }

        return fetch(url, init);
    }

    /**
     * Sends GET request.
     * @param url
     * @param headers
     * @returns {Promise<any>} Response as json.
     */
    static get = (url, headers = {}) => {
        let init = {
            method: 'GET',
            headers: headers,
        };

        return RequestSender.makeRequest(url, init);
    }

    /**
     * Sends POST request.
     * @param url
     * @param body Request body. You have to prepare body in the format that you want it to be. (json, form data, etc.)
     * @param headers
     * @returns {Promise<Response>} Response.
     */
    static post = (url, body, headers = {}) => {
        let init = {
            method: 'POST',
            headers: headers,
            body: body
        };

        return RequestSender.makeRequest(url, init);
    }

    /**
     * Sends PUT request.
     * @param url
     * @param body Request body. You have to prepare body in the format that you want it to be. (json, form data, etc.)
     * @param headers
     * @returns {Promise<Response>} Response.
     */
    static put = (url, body, headers = {}) => {
        let init = {
            method: 'PUT',
            headers: headers,
            body: body
        };

        return RequestSender.makeRequest(url, init);
    }

    /**
     * Sends PATCH request.
     * @param url
     * @param body Request body. You have to prepare body in the format that you want it to be. (json, form data, etc.)
     * @param headers
     * @returns {Promise<Response>} Response.
     */
    static patch = (url, body, headers = {}) => {
        let init = {
            method: 'PATCH',
            headers: headers,
            body: body
        };

        return RequestSender.makeRequest(url, init);
    }
}

export default RequestSender;