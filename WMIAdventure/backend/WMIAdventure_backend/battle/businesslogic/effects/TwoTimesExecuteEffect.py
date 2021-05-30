from battle.businesslogic.effects.Effect import Effect


class TwoTimesExecuteEffect(Effect):
    """
    One may say that this effect 'duplicates' the card, so the card gets used two times
    in two consecutive player turns, but it does not duplicate itself in a way that there are
    two instances of the card in the deck. Actual behavior is just that it gets executed twice, hence the name.
    """

    def on_activation(self, target, turns_queue):
        deck = target.deck
        next_card = deck.lookup()

        # If we were do to it like this:
        # deck.cards_queue.appendleft(next_card)
        # The card would get permanently duplicated, and the deck would be larger than 5.
        # We need some mechanism to remove appended card from the deck after it gets used.

        deck.temp_cards_queue.append(next_card)
