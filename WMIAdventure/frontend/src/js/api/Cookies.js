import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getSessionToken = () => {
    return cookies.get('session');
}

const removeSessionToken = () => {
    cookies.remove('session');
}

export default {getSessionToken, removeSessionToken};