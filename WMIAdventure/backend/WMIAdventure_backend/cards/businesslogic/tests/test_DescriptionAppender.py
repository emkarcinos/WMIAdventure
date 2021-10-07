from unittest import TestCase
from cards.businesslogic.description_generator.DescriptionAppender import DescriptionAppender


class DescriptionAppenderTestCase(TestCase):
    def test_sample_description1(self):
        appender = DescriptionAppender()

        text1 = "line1"
        text2 = "line2"

        appender.append(text1)
        appender.append(text2)

        result = appender.process()

        self.assertEqual("Line1 i line2.", result)

    def test_single_item_desc(self):
        appender = DescriptionAppender()

        appender.append("test")
        self.assertEqual("Test.", appender.process())

    def test_multiple(self):
        appender = DescriptionAppender()

        appender.append("12test")
        appender.append("ASDASD")
        appender.append("112a")
        appender.append("Test")

        self.assertEqual("12test, aSDASD, 112a i test.", appender.process())

    def test_none(self):
        appender = DescriptionAppender()

        self.assertEqual("", appender.process())
