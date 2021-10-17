import RequestSender from "../RequestSender";
import BattleEndpoints from "../endpoints/BattleEndpoints";

/**
 * Starts battle between logged in user and given opponent.
 * @param userId Opponent.
 * @returns {Promise<*>} Battle result.
 */
const fightWithUser = (userId) => {
    return RequestSender.get(BattleEndpoints.fightWithUser(userId));
}

export default {fightWithUser};