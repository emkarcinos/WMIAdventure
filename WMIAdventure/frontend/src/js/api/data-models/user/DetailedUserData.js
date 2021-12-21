import BasicUserData from "./BasicUserData";
import {getUsersLevelData} from "../../../storage/user/userData";

export class DetailedUserData extends BasicUserData {

    constructor(id, username, semester, avatar, level, statistics = {}) {
        super(id, username, semester, avatar, level);
        this.statistics = statistics;
    }

    getLevelObject() {
        if (!this.statistics.level)
            return nullLevel()

        return this.statistics.level
    }

    async fetchNonVitalDataFromBackend(force) {
        const data = await getUsersLevelData(this.userId, force);
        if (!data)
            return false;

        this.statistics.level = data;
        this.level = this.statistics.level.level;
        return true;
    }
}

class Level {
    constructor(level, exp, percentage) {
        this.level = level;
        this.exp = exp;
        this.percentage = percentage;
    }
}

export const nullLevel = () => {
    return new Level(1, 0, 0);
}

export const nullDetailedUserData = () => {
    return new DetailedUserData(0, ' ', 1, null, 1, {level: nullLevel()})
}
