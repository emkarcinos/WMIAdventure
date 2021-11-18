const userDataKeys = {
    username: 'username',
    id: 'currentUserId',
    userDecks: 'userDecks',
};

const userProfileKeys = {
    profileList: 'user-profile-list',
}

const cardKey = (id) => {
    return `card${id}`;
}

const profileKey = (id) => {
    return `profile${id}`;
}

export {userDataKeys, userProfileKeys, cardKey, profileKey};