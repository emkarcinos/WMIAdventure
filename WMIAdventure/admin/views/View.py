class View:
    """
    Abstract class to represent a View into a Database and parsing the data to Python dictionaries
    """

    def __init__(self, api_url):
        """
        Create a view object from a DB query result.
        """
        self.api_url = api_url
