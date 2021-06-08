class Database:
    """
    Abstract class with helper Database methods that query the data for you.
    """
    def __init__(self, cursor) -> None:
        """
        Create a Database object with a cursor that will be used to execute queries.
        """
        self.cursor = cursor