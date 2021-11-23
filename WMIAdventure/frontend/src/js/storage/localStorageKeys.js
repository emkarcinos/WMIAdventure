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

const effectKeys = {
    /**
     * Array containing ids of all effects.
     */
    effectsIds: 'effects-ids',
    effectKey: (id) => { return `effect${id}`; }
}

export {userDataKeys, userProfileKeys, cardKey, effectKeys};