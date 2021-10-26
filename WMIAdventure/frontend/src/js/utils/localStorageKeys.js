const userDataKeys = {
    username: 'username',
    id: 'currentUserId',
    userDecks: 'userDecks',
};

const cardKey = (id) => {
    return `card${id}`;
}

export {userDataKeys, cardKey};