import requests


class View:
    """
    Abstract class to represent a View into a Database and parsing the data to Python dictionaries
    """

    def __init__(self, api_url):
        """
        Create a view object from a DB query result.
        """
        self.api_url = api_url

    def _fetch_all(self) -> dict:
        """
        Fetches data from the API.
        """
        return requests.get(self.api_url).json()
