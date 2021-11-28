import RequestSender from "../RequestSender";
import BattleEndpoints from "../endpoints/BattleEndpoints";
import exampleBattleJson from "../data-models/exampleBattle";
import {battleFromData} from "../data-models/battle/Battle";

/**
 * Starts battle between logged in user and given opponent.
 * @param userId Opponent.
 * @returns {Promise<*>} Battle result.
 */
export const fightWithUser = (userId) => {
    return RequestSender.get(BattleEndpoints.fightWithUser(userId));
}

// eslint-disable-next-line no-unused-vars
export const fullFightWithUser = async (userId) => {
    // dummy JSON for testing
    const data = await JSON.parse(exampleBattleJson);
    return battleFromData(data);
}

export default {fightWithUser};