import coreapi
import coreschema
from rest_framework.schemas import AutoSchema

from battle.businesslogic.effects.EffectFactory import EffectFactory
from .businesslogic.description_generator.DescriptionGenerator import DescriptionGenerator
from .models import CardEffect, CardLevelEffects
from .serializers import CardEffectSerializer, SimpleCardLevelEffectsSerializer
from .models import CardLevel, CardInfo
from .serializers import CardLevelSerializer, WholeCardSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status


class CardLevelList(APIView):

    def get(self, request):
        """
        List of Card Levels.
        """

        serializer = CardLevelSerializer(CardLevel.objects.all(), many=True)
        return Response(serializer.data)


class CardLevelDetail(generics.RetrieveAPIView):
    """
    View displaying details about CardLevel.
    """

    queryset = CardLevel.objects.all()
    serializer_class = CardLevelSerializer


class CardEffectList(APIView):
    """
    List all effects.
    """
    def get(self, request, *args, **kwargs):
        cardEffects = CardEffect.objects.all()
        serializer = CardEffectSerializer(cardEffects, many=True)
        return Response(serializer.data)


class CardEffectObjectView(generics.RetrieveUpdateAPIView):
    """
    Get a single effect.
    """
    queryset = CardEffect.objects.all()
    serializer_class = CardEffectSerializer


class WholeCardDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = CardInfo.objects.all()
    serializer_class = WholeCardSerializer


class DescriptionGeneratorView(APIView):
    """
    Generates a description from effects.
    
    post:
    Returns a string with a generated description. Put an array of effects as the data similarly as in WholeCardList:
    
        [
            {
                "card_effect": 1,
                "target": 1,
                "power": 5,
                "range": 1
            }
        ]
    """
    def post(self, request, *args, **kwargs):
        """
        Takes a JSON array with effect ID's and returns generated string of data. 
        """
        generator = DescriptionGenerator.get_instance()
        return Response(generator.generate_description_from_json(request.data))


class WholeCardList(generics.ListCreateAPIView):
    """
    get:
    Get all cards that exist in the database.  
    post:
    Create a new card. Each card also needs to have an array of levels defined in a following manner:  
    **levels**:
    
    - `level` - an ID of a referenced level (see `card-level`)
    - `next_level_cost` - an integer representing a cost of an upgrade to the next level (can be `null`)
    - `effects_description` - a brief text describing what and how effects in that level work.
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
        
    read:
    Test
    """
    queryset = CardInfo.objects.all()
    serializer_class = WholeCardSerializer
