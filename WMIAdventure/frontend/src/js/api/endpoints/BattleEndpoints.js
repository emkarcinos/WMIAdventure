import api_url from "./api_url";

/**
 * Holds all API endpoints to Battle service.
 */
class BattleEndpoints {
    static main = api_url + 'battle/';
    static fightWithUser = (userId) => {return `${BattleEndpoints.main}${userId}/`}
}

export default BattleEndpoints;