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


class Card(Model):
    """
    Parses JSON data to model fields.
    """
    __slots__ = ['name', 'subject', 'image', 'tooltip', 'levels']


