const exampleBattleJson = `{ 
"attacker"
:
{
    "stats"
:
    {
        "hp"
    :
        100.0,
            "armour"
    :
        0.0
    }
,
    "id"
:
    1,
        "deck"
:
    [
        {
            "id": 3,
            "level": 1
        },
        {
            "id": 2,
            "level": 1
        },
        {
            "id": 5,
            "level": 1
        },
        {
            "id": 1,
            "level": 1
        },
        {
            "id": 4,
            "level": 1
        }
    ]
}
,
"defender"
:
{
    "stats"
:
    {
        "hp"
    :
        100.0,
            "armour"
    :
        0.0
    }
,
    "id"
:
    3,
        "deck"
:
    [
        {
            "id": 3,
            "level": 1
        },
        {
            "id": 4,
            "level": 1
        },
        {
            "id": 2,
            "level": 1
        },
        {
            "id": 5,
            "level": 1
        },
        {
            "id": 1,
            "level": 1
        }
    ]
}
,
"turns"
:
[
    {
        "attacker": {
            "stats": {
                "hp": 100.0,
                "armour": 0.0
            },
            "deck": [
                3,
                2,
                5,
                1,
                4
            ]
        },
        "defender": {
            "stats": {
                "hp": 100.0,
                "armour": 0.0
            },
            "deck": [
                3,
                4,
                2,
                5,
                1
            ]
        },
        "card_executor": 1,
        "used_card": 3,
        "used_effects": [
            {
                "id": 1,
                "target_player": 3,
                "power": 37.87219609052145,
                "changed_stats": {
                    "hp": 62.12780390947855,
                    "armour": 0.0
                }
            },
            {
                "id": 3,
                "target_player": 3,
                "new_deck_order": [
                    1,
                    2,
                    4,
                    3,
                    5
                ]
            }
        ]
    },
    {
        "attacker": {
            "stats": {
                "hp": 100.0,
                "armour": 0.0
            },
            "deck": [
                2,
                5,
                1,
                4,
                3
            ]
        },
        "defender": {
            "stats": {
                "hp": 62.12780390947855,
                "armour": 0.0
            },
            "deck": [
                1,
                2,
                4,
                3,
                5
            ]
        },
        "card_executor": 3,
        "used_card": 1,
        "used_effects": [
            {
                "id": 1,
                "target_player": 1,
                "power": 1.4837534792905451,
                "changed_stats": {
                    "hp": 98.51624652070946,
                    "armour": 0.0
                }
            },
            {
                "id": 9,
                "target_player": 1,
                "new_deck_order": [
                    5,
                    1,
                    4,
                    3,
                    2
                ]
            }
        ]
    },
    {
        "attacker": {
            "stats": {
                "hp": 98.51624652070946,
                "armour": 0.0
            },
            "deck": [
                5,
                1,
                4,
                3,
                2
            ]
        },
        "defender": {
            "stats": {
                "hp": 62.12780390947855,
                "armour": 0.0
            },
            "deck": [
                2,
                4,
                3,
                5,
                1
            ]
        },
        "card_executor": 1,
        "used_card": 5,
        "used_effects": [
            {
                "id": 8,
                "target_player": 1,
                "buff": {
                    "buff_type": null,
                    "modifier": 2.604157938219017
                },
                "buffed_card": 1
            },
            {
                "id": 10,
                "target_player": 1,
                "buff": {
                    "buff_type": 1,
                    "modifier": 9.914855906826705
                },
                "buffed_card": 1
            },
            {
                "id": 5,
                "target_player": 1,
                "buff": {
                    "buff_type": 5
                },
                "buffed_card": 1
            }
        ]
    },
    {
        "attacker": {
            "stats": {
                "hp": 98.51624652070946,
                "armour": 0.0
            },
            "deck": [
                1,
                4,
                3,
                2,
                5
            ]
        },
        "defender": {
            "stats": {
                "hp": 62.12780390947855,
                "armour": 0.0
            },
            "deck": [
                2,
                4,
                3,
                5,
                1
            ]
        },
        "card_executor": 3,
        "used_card": 2,
        "used_effects": [
            {
                "id": 1,
                "target_player": 1,
                "power": 2.231485362930389,
                "changed_stats": {
                    "hp": 96.28476115777907,
                    "armour": 0.0
                }
            },
            {
                "id": 4,
                "target_player": 1,
                "turns_stopped": 1
            }
        ]
    },
    {
        "attacker": {
            "stats": {
                "hp": 96.28476115777907,
                "armour": 0.0
            },
            "deck": [
                1,
                4,
                3,
                2,
                5
            ],
            "turns_stopped": 1
        },
        "defender": {
            "stats": {
                "hp": 62.12780390947855,
                "armour": 0.0
            },
            "deck": [
                4,
                3,
                5,
                1,
                2
            ]
        },
        "card_executor": 1,
        "used_card": null,
        "used_effects": []
    },
    {
        "attacker": {
            "stats": {
                "hp": 96.28476115777907,
                "armour": 0.0
            },
            "deck": [
                1,
                4,
                3,
                2,
                5
            ]
        },
        "defender": {
            "stats": {
                "hp": 62.12780390947855,
                "armour": 0.0
            },
            "deck": [
                4,
                3,
                5,
                1,
                2
            ]
        },
        "card_executor": 3,
        "used_card": 4,
        "used_effects": [
            {
                "id": 1,
                "target_player": 1,
                "power": 32.678565511642255,
                "changed_stats": {
                    "hp": 63.60619564613682,
                    "armour": 0.0
                }
            },
            {
                "id": 7,
                "target_player": 1,
                "turns_blocked": 1,
                "blocked_card": 1
            }
        ]
    },
    {
        "attacker": {
            "stats": {
                "hp": 63.60619564613682,
                "armour": 0.0
            },
            "deck": [
                1,
                4,
                3,
                2,
                5
            ]
        },
        "defender": {
            "stats": {
                "hp": 62.12780390947855,
                "armour": 0.0
            },
            "deck": [
                3,
                5,
                1,
                2,
                4
            ]
        },
        "card_executor": 1,
        "used_card": 1,
        "used_effects": []
    },
    {
        "attacker": {
            "stats": {
                "hp": 63.60619564613682,
                "armour": 0.0
            },
            "deck": [
                1,
                4,
                3,
                2,
                5
            ]
        },
        "defender": {
            "stats": {
                "hp": 62.12780390947855,
                "armour": 0.0
            },
            "deck": [
                3,
                5,
                1,
                2,
                4
            ]
        },
        "card_executor": 3,
        "used_card": 3,
        "used_effects": [
            {
                "id": 1,
                "target_player": 1,
                "power": 31.76145683816073,
                "changed_stats": {
                    "hp": 31.84473880797609,
                    "armour": 0.0
                }
            },
            {
                "id": 3,
                "target_player": 1,
                "new_deck_order": [
                    2,
                    5,
                    3,
                    4,
                    1
                ]
            }
        ]
    },
    {
        "attacker": {
            "stats": {
                "hp": 31.84473880797609,
                "armour": 0.0
            },
            "deck": [
                2,
                5,
                3,
                4,
                1
            ]
        },
        "defender": {
            "stats": {
                "hp": 62.12780390947855,
                "armour": 0.0
            },
            "deck": [
                5,
                1,
                2,
                4,
                3
            ]
        },
        "card_executor": 1,
        "used_card": 2,
        "used_effects": [
            {
                "id": 1,
                "target_player": 3,
                "power": 54.634717747374054,
                "changed_stats": {
                    "hp": 7.493086162104497,
                    "armour": 0.0
                }
            },
            {
                "id": 4,
                "target_player": 3,
                "turns_stopped": 1
            }
        ]
    },
    {
        "attacker": {
            "stats": {
                "hp": 31.84473880797609,
                "armour": 0.0
            },
            "deck": [
                5,
                3,
                4,
                1,
                2
            ]
        },
        "defender": {
            "stats": {
                "hp": 7.493086162104497,
                "armour": 0.0
            },
            "deck": [
                5,
                1,
                2,
                4,
                3
            ],
            "turns_stopped": 1
        },
        "card_executor": 3,
        "used_card": null,
        "used_effects": []
    },
    {
        "attacker": {
            "stats": {
                "hp": 31.84473880797609,
                "armour": 0.0
            },
            "deck": [
                5,
                3,
                4,
                1,
                2
            ]
        },
        "defender": {
            "stats": {
                "hp": 7.493086162104497,
                "armour": 0.0
            },
            "deck": [
                5,
                1,
                2,
                4,
                3
            ]
        },
        "card_executor": 1,
        "used_card": 5,
        "used_effects": [
            {
                "id": 8,
                "target_player": 1,
                "buff": {
                    "buff_type": null,
                    "modifier": 0.32041965907225833
                },
                "buffed_card": 3
            },
            {
                "id": 10,
                "target_player": 1,
                "buff": {
                    "buff_type": 1,
                    "modifier": 1.6954950700219151
                },
                "buffed_card": 3
            },
            {
                "id": 5,
                "target_player": 1,
                "buff": {
                    "buff_type": 5
                },
                "buffed_card": 3
            }
        ]
    },
    {
        "attacker": {
            "stats": {
                "hp": 31.84473880797609,
                "armour": 0.0
            },
            "deck": [
                3,
                4,
                1,
                2,
                5
            ]
        },
        "defender": {
            "stats": {
                "hp": 7.493086162104497,
                "armour": 0.0
            },
            "deck": [
                5,
                1,
                2,
                4,
                3
            ]
        },
        "card_executor": 3,
        "used_card": 5,
        "used_effects": [
            {
                "id": 8,
                "target_player": 3,
                "buff": {
                    "buff_type": null,
                    "modifier": 1.1519924929048808
                },
                "buffed_card": 1
            },
            {
                "id": 10,
                "target_player": 3,
                "buff": {
                    "buff_type": 1,
                    "modifier": 8.768188385390989
                },
                "buffed_card": 1
            },
            {
                "id": 5,
                "target_player": 3,
                "buff": {
                    "buff_type": 5
                },
                "buffed_card": 1
            }
        ]
    },
    {
        "attacker": {
            "stats": {
                "hp": 31.84473880797609,
                "armour": 0.0
            },
            "deck": [
                3,
                4,
                1,
                2,
                5
            ]
        },
        "defender": {
            "stats": {
                "hp": 7.493086162104497,
                "armour": 0.0
            },
            "deck": [
                1,
                2,
                4,
                3,
                5
            ]
        },
        "card_executor": 1,
        "used_card": 3,
        "used_effects": [
            {
                "id": 1,
                "target_player": 3,
                "power": 15.176037304373091,
                "changed_stats": {
                    "hp": 0.0,
                    "armour": 0.0
                }
            },
            {
                "id": 3,
                "target_player": 3,
                "new_deck_order": [
                    4,
                    3,
                    2,
                    1,
                    5
                ]
            }
        ]
    }
],
    "outcome"
:
{
    "winner"
:
    1,
        "attacker"
:
    {
        "id"
    :
        1,
            "statistics"
    :
        {
            "hp"
        :
            31.84473880797609,
                "armour"
        :
            0.0
        }
    }
,
    "defender"
:
    {
        "id"
    :
        3,
            "statistics"
    :
        {
            "hp"
        :
            0.0,
                "armour"
        :
            0.0
        }
    }
}
}
`;

export default exampleBattleJson;