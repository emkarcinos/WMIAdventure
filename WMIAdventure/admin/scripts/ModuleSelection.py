from bullet import Bullet

from scripts.CardModule import CardModule
from scripts.Script import Script
from views.CardsViews import CardsViews


class ModuleSelection(Script):
    """
    A script that is run after logging in to the DB.
    It asks the user to select which module is of an interest.
    """

    def __init__(self, api_url):
        self.modules = {'cards': 'Nowe karty',
                        'stories': 'Nowe historie',
                        'questions': 'Nowe pytania'}

        self.card_view = CardsViews(api_url)
        self.awaiting_cards = self.card_view.get_awaiting_count()
        self.awaiting_stories = 0
        self.awaiting_questions = 0

    def run(self):
        result = ''
        back = "Wyjście"
        while result is not back:
            self.refresh()
            print("\033c")
            names_with_awaiting_numbers = [
                f"{self.modules['cards']} (Oczekujące: {self.awaiting_cards})",
                f"{self.modules['stories']} (Oczekujące: {self.awaiting_stories})",
                f"{self.modules['questions']} (Oczekujące: {self.awaiting_questions})"
            ]
            print("Wybierz moduł, którym chcesz zarządzać:")
            cli = Bullet(choices=names_with_awaiting_numbers + [back],
                         indent=4)
            result = cli.launch()

            if result is names_with_awaiting_numbers[0]:
                card_module = CardModule(self.card_view)
                card_module.run()

    def refresh(self):
        self.card_view.refresh()
        self.awaiting_cards = self.card_view.get_awaiting_count()
