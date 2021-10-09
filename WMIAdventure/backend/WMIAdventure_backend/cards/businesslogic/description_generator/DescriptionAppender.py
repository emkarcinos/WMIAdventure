from enum import Enum


class Case(Enum):
    UPPER = 0
    LOWER = 1


class DescriptionAppender:
    """
    This class glues multiple descriptions into one text.
    """

    def __init__(self, sep=', ', end='.', last_sep=' i '):
        self.sep = sep
        self.end = end
        self.last_sep = last_sep

        self.messages = []
        self.output = ""

    def append(self, text: str):
        """
        Adds a line of text to the pool.
        """
        self.messages.append(text)

    def process(self) -> str:
        """
        Returns a finalized string.
        """
        if len(self.messages) < 1:
            return ""

        self._process_first()
        self._process_inner()
        self._process_final()

        return self.output

    def _process_first(self):
        """
        Processing the first message means that we have to ensure that it starts with an uppercase.
        """
        self.output += self._ensure_case_beginning(self.messages[0], Case.UPPER)

    def _process_inner(self):
        """
        Inner messages are separated by sep and each one starts with lowercase.
        """
        if len(self.messages) < 2:
            return

        for idx in range(1, len(self.messages) - 1):
            # Adding a separator before the next message
            self.output += self.sep

            # Each message afterwards must be lowercase
            self.output += self._ensure_case_beginning(self.messages[idx], Case.LOWER)

    def _process_final(self):
        """
        Final message starts with a different separator and ends with an end.
        """
        if len(self.messages) > 1:
            self.output += self.last_sep
            last_idx = len(self.messages) - 1
            self.output += self._ensure_case_beginning(self.messages[last_idx], Case.LOWER)

        self.output += self.end

    def _ensure_case_beginning(self, text: str, case: Case) -> str:
        """
        Returns provided text with an uppercase letter at the beginning.
        """
        if len(text) < 1:
            return text

        first_letter = text[:1]
        remainder = text[1:]
        if case is Case.UPPER:
            first_letter = first_letter.upper()
        else:
            first_letter = first_letter.lower()

        return first_letter + remainder
