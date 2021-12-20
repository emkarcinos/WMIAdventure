const getEnvProtocol = () => {
    const http = 'http://';
    const https = 'https://';
    if (process.env['REACT_APP_HTTPS_BACKEND'])
        return https;
    return http;
}

const API_URL = getEnvProtocol() + process.env['REACT_APP_API_URL'] + '/api/';

/**
 * Main API url.
 */
export default API_URL;