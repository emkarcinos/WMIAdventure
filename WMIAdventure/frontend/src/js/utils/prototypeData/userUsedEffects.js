const userUsedEffects = [ // player 1
    {
        id: 1, // damage
        target_player: 2,
        power: 1,
        changed_stats: {
            hp: 78,
            armour: 0
        },
    },
    {
        id: 8, // increase next card power
        target_player: 2,
    },
    {
        id: 10, // increase next card damage
        target_player: 2,
    },
    {
        id: 7, // block next card
        target_player: 1,
        power: 4,
    },
    {
        id: 6, // heal
        target_player: 1,
    },
];

export default userUsedEffects;