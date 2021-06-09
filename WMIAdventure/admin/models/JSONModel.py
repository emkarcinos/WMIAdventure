class JSONModel:
    """
    Parses JSON dict into model fields.
    """

    def __init__(self, data: dict):
        for key, val in data:
            setattr(self, key, val)
