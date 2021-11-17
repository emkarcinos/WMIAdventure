const userUsedEffects = [ // player 1
    {
        id: 1, // damage
        target_player: 2,
        changed_stats: {
            hp: 78,
            armour: 0
        },
        power: 11,
    },
    {
        id: 8, // increase next card power
        target_player: 2,
        power: 22,
    },
    {
        id: 10, // increase next card damage
        power: 33,
        target_player: 2,
    },
    {
        id: 7, // block next card
        target_player: 2,
        power: 44,
    },
    {
        id: 6, // heal
        target_player: 2,
        power: 55,
    },
];

export default userUsedEffects;