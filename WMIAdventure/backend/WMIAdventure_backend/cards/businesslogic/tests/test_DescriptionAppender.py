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
