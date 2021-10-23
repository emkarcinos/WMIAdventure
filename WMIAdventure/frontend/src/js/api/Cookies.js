import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getSessionToken = () => {
    console.log(`cookies['session']: ${cookies.get('session')}`)
    return cookies.get('session');
}

export default {getSessionToken};