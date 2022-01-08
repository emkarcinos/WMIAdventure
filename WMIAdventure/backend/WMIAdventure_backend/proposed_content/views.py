from ratelimit.core import get_usage
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from IngameUsers.models import UserStats
from IngameUsers.signals import user_should_gain_exp
from cards.models import CardInfo
from cards.serializers import WholeCardSerializer
from proposed_content.models import ProposedCardInfo
from proposed_content.permissions import CanEdit
from proposed_content.serializers import WholeProposedCardSerializer
from proposed_content.signals import give_new_card_to_all_users
from utils.errors import card_submission_ratelimit_error
from utils.permissions import IsAbleToEdit


def accept_proposed_card(proposed_card: ProposedCardInfo):
    proposed_card.image = None

    # Serialize proposed cards data
    proposed_card_serializer = WholeProposedCardSerializer(instance=proposed_card)

    created = False
    try:
        # If card with proposed card's name exists - update existing card with proposed card's data
        card_to_update = CardInfo.objects.get(name=proposed_card.name)
        accepted_card_serializer = WholeCardSerializer(instance=card_to_update, data=proposed_card_serializer.data)
    except CardInfo.DoesNotExist:
        # If there is no card with proposed card's name - create new card in accepted cards tables.
        accepted_card_serializer = WholeCardSerializer(data=proposed_card_serializer.data)
        created = True

    accepted_card_serializer.is_valid(raise_exception=True)
    new_card = accepted_card_serializer.save()
    new_image = ProposedCardInfo.objects.get(pk=proposed_card.id).image
    if new_image:
        new_card.image = ProposedCardInfo.objects.get(pk=proposed_card.id).image
        new_card.save()
    # Remove accepted card from proposed cards tables.
    proposed_card.delete()

    owner_id = proposed_card_serializer.data.get('owner', None)

    if owner_id is None:
        return accepted_card_serializer, created

    owner_exp = UserStats.objects.get(profile__user_id=owner_id)
    user_should_gain_exp(owner_exp, 200)

    # TODO: Remove this when gaining cards is implemented.
    if created:
        give_new_card_to_all_users(new_card)

    return accepted_card_serializer, created


class AcceptProposedCardView(APIView):
    permission_classes = [IsAbleToEdit]
    """
    post:

    Accept proposed card with given id.
    """

    def post(self, request, pk):
        try:
            # Get proposed card that will be accepted
            proposed_card = ProposedCardInfo.objects.get(pk=pk)
        except ProposedCardInfo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        accepted_card_serializer, created = accept_proposed_card(proposed_card)

        response_status = status.HTTP_200_OK
        if created:
            response_status = status.HTTP_201_CREATED

        return Response(data=accepted_card_serializer.data, status=response_status)


class WholeProposedCardDetails(generics.RetrieveUpdateAPIView):
    permission_classes = [CanEdit]
    """
    get:

    View details of proposed card.

    put:

    Update proposed card.

    The following data has to be provided even if you don't want to change it:

    - `name` - card name
    - `tooltip` - card description
    - `subject` - card's subject

    One may also add a comment to the card for admins to see:
    - `comment` - creator's message to admins

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


    patch:

    Update proposed card partially.

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

    `levels` example:

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
            }
        ]
    """

    queryset = ProposedCardInfo.objects.all()
    serializer_class = WholeProposedCardSerializer


class WholeProposedCardList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    """
    get:
    Get all cards that exist in the database.
    post:
    Create a new card.

    One may also specify a comment that admins will see alongside card contents.
    - `comment` - text for admins
    Each card also needs to have an array of levels defined in a following manner:
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
            "comment": "Proszę rozpatrzcie moją kartę pozytywnie",
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
        limiting = get_usage(request, fn=WholeProposedCardList, key='ip', rate='9/d', increment=False)
        if limiting is not None and limiting.get('should_limit', False):
            return Response(card_submission_ratelimit_error, status=status.HTTP_400_BAD_REQUEST)
        resp = super().post(request, *args, **kwargs)
        if resp.status_code == 201:
            limit = get_usage(request, fn=WholeProposedCardList, key='ip', rate='9/d', increment=True)
        return resp

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
