from models.JSONModel import JSONModel


class Effect(JSONModel):
    """
    Container for an effect inside a Card
    """
    __slots__ = ['card_effect', 'target', 'power', 'range']


class Level(JSONModel):
    """
    Container for a level inside a Card
    """
    __slots__ = ['level', 'next_level_cost', 'effects']


class Card(JSONModel):
    """
    Parses JSON data to model fields.
    """
    __slots__ = ['name', 'subject', 'image', 'tooltip', 'levels']


