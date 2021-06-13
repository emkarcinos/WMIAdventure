from bullet import YesNo

from models.Card import Card
from scripts.Script import Script


class CardEntry(Script):
    def __init__(self, card: Card):

        self.card = card

    def run(self):
        print("\033c")
        print(self.card.__repr__())
        yes_no = YesNo("Zaakceptować kartę? ")
        result = yes_no.launch()
        if result:
            confirm = YesNo("Na pewno? ")
            if confirm.launch():
                # TODO: Move card from awaiting DB to active
                print("Zapisano.")

        print('')

