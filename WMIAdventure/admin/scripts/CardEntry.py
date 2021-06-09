from bullet import YesNo

from scripts.Script import Script


class CardEntry(Script):
    def __init__(self):

        # TODO: Pretty card printing & get card from DB
        self.card = {
        "id": 43,
        "name": "Malloc",
        "subject": "Systemy Operacyjne",
        "image": None,
        "tooltip": "Przywraca nam 10-20 pkt życia.",
        "levels": [
            {
                "level": 1,
                "next_level_cost": None,
                "effects": [
                    {
                        "card_effect": 6,
                        "target": 1,
                        "power": 15,
                        "range": 5.0
                    }
                ]
            }
        ]
    }

    def run(self):
        print(self.card)
        yes_no = YesNo("Zaakceptować kartę?")
        result = yes_no.launch()
        print(result)

