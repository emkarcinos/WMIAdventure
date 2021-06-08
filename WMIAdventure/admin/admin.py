from bullet import VerticalPrompt, Input, Password
from sys import argv

def login_to_db():
    # We can pass 'test' as an argument to select test database.
    test_db_address = 'wmiadventure.westeurope.cloudapp.azure.com'
    prod_db_address = 'psql.wmi.amu.edu.pl'
    db = test_db_address if len(argv) > 1 and argv[1] == 'test' else prod_db_address
    print(f"Zaloguj się do bazy {db}")
    cli = VerticalPrompt(
        [
            Input("Nazwa użytkownika: "),
            Input("Nazwa bazy: "),
            Password("Hasło: ")
        ]
    )
    result = cli.launch()

def main():
    login_to_db()

if __name__ == "__main__":
    main()