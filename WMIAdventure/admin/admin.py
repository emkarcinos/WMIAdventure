from sys import argv

from scripts.Login import Login


def main():
    login_script = Login(argv[1])
    login_script.run()


if __name__ == "__main__":
    main()
