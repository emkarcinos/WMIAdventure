from bullet import VerticalPrompt, Input, Password

from scripts.ModuleSelection import ModuleSelection
from scripts.Script import Script


class Login(Script):

    def __init__(self, url):
        self.api_url = url

    def run(self):
        print(f"Zaloguj się:")
        indent = 4
        login_prompt = VerticalPrompt(
            [
                Input("Nazwa użytkownika: ", indent=indent),
                Password("Hasło: ", indent=indent)
            ],
        )

        login_result = login_prompt.launch()

        ModuleSelection(self.api_url).run()
