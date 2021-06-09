from bullet import VerticalPrompt, Input, Password

from scripts.ModuleSelection import ModuleSelection
from scripts.Script import Script


class Login(Script):

    def __init__(self, db_alias='prod'):
        self.db_address = self.get_db_address(db_alias)

    @staticmethod
    def get_db_address(db_alias):
        test_db_address = 'wmiadventure.westeurope.cloudapp.azure.com'
        prod_db_address = 'psql.wmi.amu.edu.pl'
        return test_db_address if db_alias == 'test' else prod_db_address

    def run(self):
        print(f"Zaloguj się do bazy {self.db_address}")
        cli = VerticalPrompt(
            [
                Input("Nazwa użytkownika: "),
                Input("Nazwa bazy: "),
                Password("Hasło: ")
            ]
        )

        result = cli.launch()
        # TODO: Connect to DB

        ModuleSelection().run()
