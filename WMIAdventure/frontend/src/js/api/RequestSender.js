/**
 * Handles sending requests.
 */
class RequestSender {
    /**
     * Sends GET request.
     * @param url
     * @param headers
     * @returns {Promise<any>} Response as json.
     */
    static get = (url, headers={}) => {
        return fetch(url, {
            method: 'get',
            headers: headers
        }).then(
            response => response.json()
        );
    }

    /**
     * Sends POST request.
     * @param url
     * @param body Request body. You have to prepare body in the format that you want it to be. (json, form data, etc.)
     * @param headers
     * @returns {Promise<any>} Response.
     */
    static post = (url, body, headers={}) => {
        return fetch(url, {
            method: 'post',
            headers: headers,
            body: body
        }).then(
            response => response
        );
    }
}

export default RequestSender;