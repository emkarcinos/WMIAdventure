import API_URL from "./API_URL";

/**
 * Holds all API endpoints to Battle service.
 */
class BattleEndpoints {
    static main = API_URL + 'battle/';
    static fightWithUser = (userId) => {return `${BattleEndpoints.main}${userId}/`}
}

export default BattleEndpoints;