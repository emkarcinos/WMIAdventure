from models.Model import Model


class Effect(Model):
    """
    Container for an effect inside a Card
    """
    __slots__ = ['card_effect', 'target', 'power', 'range']


class Level(Model):
    """
    Container for a level inside a Card
    """
    __slots__ = ['level', 'next_level_cost', 'effects']

    def __init__(self, data: dict):
        super().__init__(data)
        dict_effects = data.get('effects')

        # An array of Effect objects
        self.effects = []
        for effect_dict in dict_effects:
            self.effects.append(Effect(effect_dict))


class Card(Model):
    """
    Parses JSON data to model fields.
    """
    __slots__ = ['id', 'name', 'subject', 'image', 'tooltip', 'levels']

    def __init__(self, data: dict):
        super().__init__(data)
        dict_levels = data.get('levels')

        # An array of Level objects
        self.levels = []
        for level_dict in dict_levels:
            self.levels.append(Level(level_dict))
