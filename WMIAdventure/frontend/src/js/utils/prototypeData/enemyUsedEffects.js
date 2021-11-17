const enemyUsedEffects = [ // player 2
    {
        id: 1, // damage
        target_player: 1,
        power: 42,
        changed_stats: {
            hp: 58,
            armour: 0
        }
    },
    {
        id: 3, // random change cards order
        target_player: 1
    },
    {
        id: 4, // one turn stop
        target_player: 1
    },
    {
        id: 2, // shield
        target_player: 2
    },
    {
        id: 5, // double card run
        target_player: 2
    }
]

export default enemyUsedEffects;