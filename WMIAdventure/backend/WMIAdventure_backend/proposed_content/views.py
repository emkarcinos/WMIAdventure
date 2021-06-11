from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from proposed_content.models import ProposedCardInfo
from proposed_content.serializers import WholeProposedCardSerializer


class WholeProposedCardDetails(generics.RetrieveUpdateAPIView):
    """
    get:

    View details of proposed card.

    put:

    Update proposed card.

    The following data has to be provided even if you don't want to change it:

    - `name` - card name
    - `tooltip` - card description
    - `subject` - card's subject

    If `levels` are provided then all the existing levels are cleared and created again with the data that you provide.

    If you want to:

    - update only one level *L* - you have to provide all existing levels and change only *L*
    - delete only one level *L* - you have to provide all existing levels without *L*
    - add new level *L* - you have to provide all existing levels and new level *L*

    `levels` should be array defined in a following manner:

    - `level` - an ID of a referenced level (see: card-level)
    - `next_level_cost` - an integer representing a cost of an upgrade to the next level (can be `null`)
    - `effects` - an array of effects:
        * `card_effect` - an ID of a referenced effect (see `card-effect`)
        * `target` - an integer of either 1 (self targeting) or 2 (target the opponent)
        * `power` - a float with power value - can be `null` if the specified effect has `has_modifier` set to `false`
        (see `card-effect`)
        * `range` - a float that tells us how randomized the card output is.
                    Final value gets randomized uniformly with values `(power - range), (power + range)`.
                    Can be `null` if the specified effect has `has_modifier` set to `false` (see `card-effect`)

    Examples JSONs:

    Update only card's basic info without levels:

        {
            "name": "NazwaKarty",
            "subject": "PrzedmiotKarty",
            "tooltip": "OpisKarty"
        }

    Update only levels (as you can see you have to provide basic info too):

        {
            "name": "NazwaKarty",
            "subject": "PrzedmiotKarty",
            "tooltip": "OpisKarty",
            "levels": [
                {
                    "level": 1,
                    "next_level_cost": 6,
                    "effects": [
                        {
                            "card_effect": 1,
                            "target": 2,
                            "power": 6,
                            "range": 4.0
                        },
                        {
                            "card_effect": 2,
                            "target": 2,
                            "power": 5,
                            "range": 3.0
                        },
                        {
                            "card_effect": 3,
                            "target": 1,
                            "power": null,
                            "range": null
                        }
                    ]
                },
                {
                    "level": 2,
                    "next_level_cost": 7,
                    "effects": [
                        {
                            "card_effect": 1,
                            "target": 2,
                            "power": 5,
                            "range": 7.0
                        },
                        {
                            "card_effect": 3,
                            "target": 1,
                            "power": null,
                            "range": null
                        }
                    ]
                },
                {
                    "level": 3,
                    "next_level_cost": null,
                    "effects": [
                        {
                            "card_effect": 2,
                            "target": 1,
                            "power": 10,
                            "range": 5.0
                        },
                        {
                            "card_effect": 4,
                            "target": 1,
                            "power": null,
                            "range": null
                        },
                        {
                            "card_effect": 7,
                            "target": 1,
                            "power": null,
                            "range": null
                        }
                    ]
                }
            ]
        }

    """

    queryset = ProposedCardInfo.objects.all()
    serializer_class = WholeProposedCardSerializer


class WholeProposedCardList(generics.ListCreateAPIView):
    """
    get:
    Get all cards that exist in the database.
    post:
    Create a new card. Each card also needs to have an array of levels defined in a following manner:
    **levels**:

    - `level` - an ID of a referenced level (see `card-level`)
    - `next_level_cost` - an integer representing a cost of an upgrade to the next level (can be `null`)
    - `effects` - an array of effects:
        * `card_effect` - an ID of a referenced effect (see `card-effect`)
        * `target` - an integer of either 1 (self targeting) or 2 (target the opponent)
        * `power` - a float with power value - can be `null` if the specified effect has `has_modifier` set to `false`
        * `range` - a float that tells us how randomized the card output is.
                    Final value gets randomized uniformly with values `(power - range), (power + range)`.
                    Can be `null` if the specified effect has `has_modifier` set to `false`

    Example JSON:

        {
            "name": "NazwaKarty",
            "subject": "PrzedmiotKarty",
            "image": null,
            "tooltip": "OpisKarty",
            "levels": [
                {
                    "level": 1,
                    "next_level_cost": 6,
                    "effects": [
                        {
                            "card_effect": 1,
                            "target": 2,
                            "power": 6,
                            "range": 4.0
                        },
                        {
                            "card_effect": 2,
                            "target": 2,
                            "power": 5,
                            "range": 3.0
                        },
                        {
                            "card_effect": 3,
                            "target": 1,
                            "power": null,
                            "range": null
                        }
                    ]
                },
                {
                    "level": 2,
                    "next_level_cost": 7,
                    "effects": [
                        {
                            "card_effect": 1,
                            "target": 2,
                            "power": 5,
                            "range": 7.0
                        },
                        {
                            "card_effect": 3,
                            "target": 1,
                            "power": null,
                            "range": null
                        }
                    ]
                },
                {
                    "level": 3,
                    "next_level_cost": null,
                    "effects": [
                        {
                            "card_effect": 2,
                            "target": 1,
                            "power": 10,
                            "range": 5.0
                        },
                        {
                            "card_effect": 4,
                            "target": 1,
                            "power": null,
                            "range": null
                        },
                        {
                            "card_effect": 7,
                            "target": 1,
                            "power": null,
                            "range": null
                        }
                    ]
                }
            ]
        }
    """
    queryset = ProposedCardInfo.objects.all()
    serializer_class = WholeProposedCardSerializer

    def post(self, request, *args, **kwargs):
        serializer = WholeProposedCardSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(data=serializer.validated_data, status=status.HTTP_201_CREATED)
