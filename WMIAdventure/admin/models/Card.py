from models.Model import Model


class Effect(Model):
    """
    Container for an effect inside a Card
    """
    __slots__ = ['card_effect', 'target', 'power', 'range']
    
    def __repr__(self):
        return f'ID: {self.card_effect}\n' \
               f'Cel: {self.target}, Moc: {self.power}, Losowość: {self.power}'


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

    def __repr__(self):
        return f'Poziom: {self.level}  Koszt ulepszenia: {self.next_level_cost}\n' \
               f'Efekty:\n' \
               f'\t{self.effects}'


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

    def __str__(self):
        return f'{self.name} (ID: {self.id})'

    def __repr__(self):
        """
        Returns a pretty string repr of this card.
        """
        return f'Nazwa: {self.name} \t Przedmiot: {self.subject}\n' \
               f'Opis: {self.tooltip}\n' \
               f'Poziomy:\n' \
               f'\t{self.levels}'
