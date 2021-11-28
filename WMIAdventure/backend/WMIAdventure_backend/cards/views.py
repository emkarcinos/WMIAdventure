from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from utils.permissions import IsAbleToEdit
from .businesslogic.description_generator.DescriptionGenerator import DescriptionGenerator
from .models import CardEffect
from .models import CardLevel, CardInfo
from .serializers import CardEffectSerializer
from .serializers import CardLevelSerializer, WholeCardSerializer


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


def _image_path_dirty_fix(image_path):
    """
    TODO: This code shouldn't exist, better solution must be found in the future.
    This code replaces 'download' with 'get' in image path, so that this image can be viewed instead of downloaded.

    :param image_path: Image path to fix.
    :return: Fixed image path.
    """

    if image_path:
        image_path = image_path.replace('download', 'get', 1)
    return image_path


class CardEffectList(generics.ListAPIView):
    """
    List all effects.
    """

    queryset = CardEffect.objects.all()
    serializer_class = CardEffectSerializer

    def _effects_icons_path_dirty_fix(self, response):
        """
        TODO: This code shouldn't exist, better solution must be found in the future.
        Fixes path for all icons, so that each icon can be viewed instead of downloaded.

        :param response: Response which contains data about effects.
        """

        for effect_data in response.data:
            effect_data['icon'] = _image_path_dirty_fix(effect_data['icon'])

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        self._effects_icons_path_dirty_fix(response.data)
        return response


class CardEffectObjectView(generics.RetrieveUpdateAPIView):
    """
    Get a single effect.
    """

    permission_classes = [IsAbleToEdit]

    queryset = CardEffect.objects.all()
    serializer_class = CardEffectSerializer

    def _effect_icon_path_dirty_fix(self, response):
        """
        TODO: This code shouldn't exist, better solution must be found in the future.
        Fixes icon path, so that icon can be viewed instead of downloaded.

        :param response: Response which contains data about effect.
        """

        response.data['icon'] = _image_path_dirty_fix(response.data['icon'])

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        self._effect_icon_path_dirty_fix(response)
        return response


class WholeCardDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = CardInfo.objects.all()
    serializer_class = WholeCardSerializer

    permission_classes = [IsAbleToEdit]

    def _image_path_dirty_fix(self, response):
        """
        TODO: This code shouldn't exist, better solution must be found in the future.
        Fixes image path, so that image can be viewed instead of downloaded.

        :param response: Response which contains information about card.
        """

        response.data['image'] = _image_path_dirty_fix(response.data['image'])

    def get(self, request, *args, **kwargs):
        # This disasterous piece of code is caused by the way external library for handling data uploads works.
        # After migrating to in-databse file storage, serializer field responsible for serving the file got replaced
        # and I could not figure out how to make those changes there, as it would be most optimal.
        # Serializer would normally provide a download link, which has a different behaviour than we had before
        # It servers DOWNLOADABLE files. To maintain compatibility we need to rewrite the image URL to serve files for
        # viewing, not downloading.
        # I couldn't find any other way other than messing with the library itself, so here's a dirty fix
        response = super().get(request, *args, **kwargs)
        self._image_path_dirty_fix(response)
        return response


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
    permission_classes = [IsAbleToEdit]
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
