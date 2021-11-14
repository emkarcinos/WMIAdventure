from battle.businesslogic.buffs.CardDuplicatedBuff import CardDuplicatedBuff
from battle.businesslogic.effects.Effect import Effect


class TwoTimesExecuteEffect(Effect):
    """
    One may say that this effect 'duplicates' the card, so the card gets used two times
    in two consecutive player turns, but it does not duplicate itself in a way that there are
    two instances of the card in the deck. Actual behavior is just that it gets executed twice, hence the name.
    """

    def on_activation(self, target, turns_queue):
        card_to_duplicate = target.deck.lookup()
        card_to_duplicate.card_duplicated_buff = CardDuplicatedBuff(card_to_duplicate.effects)


    def description(self) -> str:
        return f"Następna karta {self.target.label}a wykona się dwukrotnie"
