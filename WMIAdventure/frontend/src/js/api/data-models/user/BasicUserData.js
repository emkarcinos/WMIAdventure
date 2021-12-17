class BasicUserData {
    constructor(id, username, semester, avatar, level = {}) {
        this.userId = id;
        this.username = username;
        this.semester = semester;
        this.image = avatar;
        this.level = level;
    }
}

export const nullBasicUserData = () => {
    return new BasicUserData(0, '', 1, null, 1);
}

export default BasicUserData;