def player_limit_key(attacker_id):
    return f'blimit_a:{attacker_id}'


def per_player_limit_key(attacker_id, defender_id):
    return f'a:{attacker_id}d:{defender_id}'
