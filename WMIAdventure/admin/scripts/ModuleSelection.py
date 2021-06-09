from bullet import Bullet

from scripts.CardModule import CardModule
from scripts.Script import Script


class ModuleSelection(Script):
    """
    A script that is run after logging in to the DB.
    It asks the user to select which module is of an interest.
    """

    def __init__(self):
        self.modules = {'cards': 'Nowe karty',
                        'stories': 'Nowe historie',
                        'questions': 'Nowe pytania'}

        # TODO: Fetch those from DB
        self.awaiting_cards = 5
        self.awaiting_stories = 0
        self.awaiting_questions = 1

    def run(self):
        result = ''
        back = "Wyjście"
        while result is not back:
            names_with_awaiting_numbers = [
                f"{self.modules['cards']} (Oczekujące: {self.awaiting_cards})",
                f"{self.modules['stories']} (Oczekujące: {self.awaiting_stories})",
                f"{self.modules['questions']} (Oczekujące: {self.awaiting_questions})"
            ]
            cli = Bullet(prompt="Wybierz moduł, którym chcesz zarządzać:",
                         choices=names_with_awaiting_numbers + [back],
                         indent=4)
            result = cli.launch()

            # TODO: Card selection
            if result is names_with_awaiting_numbers[0]:
                card_module = CardModule()
                card_module.run()
