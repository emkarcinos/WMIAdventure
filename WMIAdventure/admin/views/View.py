class View:
    """
    Abstract class to represent a View into a Database and parsing the data to Python dictionaries
    """

    def __init__(self, query):
        """
        Create a view object from a DB query result.
        """
        self.query = query
        self.data = self._to_dictionary()

    def _to_dictionary(self) -> dict:
        """
        Converts this object's query to a dictionary.
        """
        return {}
