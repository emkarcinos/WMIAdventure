class Model:
    """
    Parses dict into model fields.
    """

    def __init__(self, data: dict):
        for key, val in data.items():
            setattr(self, key, val)
