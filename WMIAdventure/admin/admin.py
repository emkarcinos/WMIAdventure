import os

from scripts.Login import Login

# Default server URL to localhost:8000
API_URL = os.environ.get('API_URL', 'localhost:8000')


def main():
    login_script = Login(API_URL)
    login_script.run()


if __name__ == "__main__":
    main()
