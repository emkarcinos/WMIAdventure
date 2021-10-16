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
}

export default RequestSender;