from bullet import YesNo

from models.Card import Card
from scripts.Script import Script


class CardEntry(Script):
    def __init__(self, card: Card):

        self.card = card
        # This field can be looked up by some other object to check if we had accepted the card
        self.got_accepted = False

    def run(self):
        print("\033c")
        print(self.card.__repr__())
        yes_no = YesNo("Zaakceptować kartę? ")
        result = yes_no.launch()
        if result:
            confirm = YesNo("Na pewno? ")
            self.got_accepted = confirm.launch()

        print('')

