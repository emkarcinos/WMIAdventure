from bullet import ScrollBar

from models.Card import Card
from scripts.CardEntry import CardEntry
from scripts.Script import Script
from views.CardsViews import CardsViews


class CardModule(Script):
    def __init__(self, card_view: CardsViews):
        self.card_view = card_view
        self.cards = card_view.get_all_awaiting_cards()
        self.cards_txt = self._make_cards_text_array()

    def run(self):
        result = ''
        back = "Wstecz"
        while result is not back:
            self.refresh()
            print("\033c")
            print("Nowe zgłoszenia kart:")
            cli = ScrollBar(height=5,
                            indent=4,
                            choices=self.cards_txt + [back])
            result = cli.launch()

            if result is not back:
                card_view = CardEntry(self._name_to_card(result))
                card_view.run()

    def _make_cards_text_array(self) -> list[str]:
        """
        Creates an array of strings corresponding to each card.
        """
        card_names = []

        for card in self.cards:
            card_names.append(str(card))

        return card_names

    def _name_to_card(self, name: str) -> Card or None:
        """
        Gets a card by its str representation
        """
        for card in self.cards:
            if str(card) == name:
                return card

        return None

    def refresh(self):
        self.card_view.refresh()
        self.cards = self.card_view.get_all_awaiting_cards()
        self.cards_txt = self._make_cards_text_array()
