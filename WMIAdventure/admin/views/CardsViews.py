from models.Card import Card
from views.View import View


class CardsViews(View):
    """
    Class used to translate a Database view into Cards dictionary
    """

    def __init__(self, api_url):
        """
        Creates a view into awaiting cards.
        It also queries them as a cache.
        If one wishes to refresh the query, call the refresh() method.
        """
        super().__init__(api_url)

        # Stores all card objects
        self.card_objs = []

        self.refresh()

    def _make_cards(self, data: dict) -> list[Card]:
        """
        Creates an array of Card object from JSON data.
        """
        card_objs = []
        for card in data:
            self.card_objs.append(Card(card))

        return card_objs

    def get_all_awaiting_cards(self) -> list[Card]:
        """
        Gets all cards from the API.
        @return An array of Card objects
        """
        return self.card_objs

    def get_awaiting_count(self):
        """
        Return the count of all awaiting cards.
        """
        return len(self.card_objs)

    def refresh(self):
        """
        Queries all cards.
        """
        cards_data = self._fetch_all()
        self.card_objs = self._make_cards(cards_data)
