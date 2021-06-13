import requests


class View:
    """
    Abstract class to represent a View into a Database and parsing the data to Python dictionaries
    """

    def __init__(self, api_url):
        """
        Create a view object from a DB query result.
        """
        api_prefix = r'http://'
        self.api_url = f'{api_prefix}{api_url}'

    def _fetch_all(self) -> dict:
        """
        Fetches data from the API.
        """
        request = requests.get(self.api_url)
        return request.json()
