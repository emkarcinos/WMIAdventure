from bullet import ScrollBar

from scripts.CardEntry import CardEntry
from scripts.Script import Script


class CardModule(Script):
    def __init__(self):
        # TODO: Load values from DB
        self.cards = ['C++', 'ZIP', 'Malloc', 'Quicksort', 'Udowodnij', 'Fork', 'Sudo', 'Python']

    def run(self):
        result = ''
        back = "Wstecz"
        while result is not back:
            print("Nowe zgłoszenia kart:")
            cli = ScrollBar(height=5,
                            indent=4,
                            choices=self.cards + [back])
            result = cli.launch()

            if result is not back:
                card_view = CardEntry()
                card_view.run()
