import RequestSender from "../RequestSender";
import BattleEndpoints from "../endpoints/BattleEndpoints";

const fightWithUser = (userId) => {
    return RequestSender.get(BattleEndpoints.fightWithUser(userId));
}

export default {fightWithUser};