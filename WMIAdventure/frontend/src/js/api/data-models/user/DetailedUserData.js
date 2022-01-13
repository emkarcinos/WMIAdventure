import BasicUserData from "./BasicUserData";
import {getCurrentUserData, getUsersLevelData} from "../../../storage/user/userData";

export class DetailedUserData extends BasicUserData {

    constructor(id, username, semester, avatar, level, skillpoints, statistics = {}) {
        super(id, username, semester, avatar, level);
        this.statistics = statistics;
        this.skillpoints = skillpoints;
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
        await this.updateSkillpoints(force);
        return true;
    }

    async updateSkillpoints(force) {
        const userData = await getCurrentUserData(force);
        if (!userData)
            return false;
        this.skillpoints = userData.skill_points
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
    return new DetailedUserData(0, ' ', 1, null, 1, 0, {level: nullLevel()})
}
