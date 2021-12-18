from rest_framework import serializers
from rest_framework.fields import ImageField

from utils.SVGAndImageFormField import SVGAndImageFormField
from .models import *
from .validators import validate_effect_modifiers, validate_does_not_exceed_effect_per_level_limit


class CardEffectSerializer(serializers.ModelSerializer):
    icon = ImageField(required=False, _DjangoImageField=SVGAndImageFormField)

    class Meta:
        model = CardEffect
        fields = ['id', 'name', 'tooltip', 'has_modifier', 'icon']


class CardLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardLevel
        fields = ['level', 'name']


class CardInfoSerializer(serializers.ModelSerializer):
    """
    Manages serialization and deserialization of CardInfo instances.
    """
    image = ImageField(required=False, _DjangoImageField=SVGAndImageFormField)

    class Meta:
        model = CardInfo
        fields = ['id', 'name', 'tooltip', 'image']


class CardLevelEffectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardLevelEffects
        fields = ['id', 'card', 'card_effect', 'target', 'power', 'range']

    def validate(self, attrs):
        """
        Validate that if effect should have modifiers values has them.
        """

        validate_effect_modifiers(attrs.get('card_effect'), attrs.get('power'), attrs.get('range'))
        return super(CardLevelEffectsSerializer, self).validate(attrs)


def base_simple_card_lvl_efcts_ser_factory(card_level_effects_model: type):
    """
    Use this function when creating simple model serializer for some card level effects model.

    Creates base class of model serializer managing simple (de)serialization of given card level effects model.

    :param card_level_effects_model: Concrete card level effects model which you want to (de)serialize.
    :return: BaseSimpleCardLevelEffectsSerializer which manages simple (de)serialization of given card info model class.
    """

    class BaseSimpleCardLevelEffectsSerializer(serializers.ModelSerializer):
        class Meta:
            model = card_level_effects_model
            fields = ['card_effect', 'target', 'power', 'range']

    return BaseSimpleCardLevelEffectsSerializer


class SimpleCardLevelEffectsSerializer(base_simple_card_lvl_efcts_ser_factory(CardLevelEffects)):
    """
    Serializes basic info from CardLevelEffects model.

    See: base_simple_card_lvl_efcts_ser_factory.BaseSimpleCardLevelEffectsSerializer
    function.
    """


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'info', 'level', 'effects_description', 'next_level_cost']


def base_simple_card_serializer_factory(card_model: type, simple_card_level_effects_ser: type):
    """
    Use this function when creating simple model serializer for some card model.

    Creates base class of model serializer managing simple serialization of given card model.

    :param card_model: Concrete card model class which you want to serialize.
    :param simple_card_level_effects_ser: Subclass of BaseSimpleCardLevelEffectsSerializer. See: base_simple_card_lvl_efcts_ser_factory
    :return: BaseSimpleCardSerializer which manages simple serialization of given card info model class.
    """

    class BaseSimpleCardSerializer(serializers.ModelSerializer):
        """
        Manages simple serialization of given card model class.
        """

        effects = simple_card_level_effects_ser(many=True)

        class Meta:
            model = card_model
            fields = ['level', 'next_level_cost', 'effects_description', 'effects']

        def validate(self, attrs):
            validate_does_not_exceed_effect_per_level_limit(attrs['effects'])
            return super().validate(attrs)

    return BaseSimpleCardSerializer


class SimpleCardSerializer(base_simple_card_serializer_factory(Card, SimpleCardLevelEffectsSerializer)):
    """
    Managing simple serialization of given card model.

    See: BaseSimpleCardSerializer which is inner class in base_simple_card_serializer_factory function.
    """


def base_whole_card_serializer_factory(card_info_cls: type, simple_card_ser: type,
                                       before_create_validators: list = None):
    """
    Creates base serializer managing serialization of given card model as a whole. Packs all the
    information scattered across many models in one serializer.

    :param card_info_cls: Concrete card info model class which you want to serialize as a whole. See: cards.models.base_card_info_factory
    :param simple_card_ser: Subclass of BaseSimpleCardSerializer. See: base_simple_card_serializer_factory
    :param before_create_validators: List of validator functions to be called before serializer's create method. They should have validated_data param.
    :return: BaseWholeCardSerializer

    """

    class BaseWholeCardSerializer(serializers.ModelSerializer):
        """
        (De)Serializes Card as a whole, packs all the information scattered across many models in one serializer.
        Information like:
        - card name
        - card image
        - card tooltip
        - all possible card's levels
        - all effects on given card's level
        etc.
        """

        levels = simple_card_ser(many=True, required=False, help_text="An array of levels objects.")
        subject = serializers.CharField(max_length=50, allow_null=True,
                                        help_text="Subject name. In the future this field"
                                                  "will be an id pointing to Subject "
                                                  "object.")

        class Meta:
            model = card_info_cls
            fields = ['id', 'name', 'subject', 'image', 'tooltip', 'levels']

        def validate(self, attrs):
            """
            Validate that all effects which should have modifiers values have them.
            """

            for card_data in attrs.get("levels", []):
                for effect_data in card_data.get("effects"):
                    card_effect = effect_data.get("card_effect")
                    power = effect_data.get("power"),
                    range_ = effect_data.get("range")
                    validate_effect_modifiers(card_effect, power, range_)

            return super(BaseWholeCardSerializer, self).validate(attrs)

        def _create_info(self, validated_data):
            info = card_info_cls.objects.create(
                name=validated_data.get('name'),
                tooltip=validated_data.get('tooltip'),
                image=validated_data.get('image', None),
                subject=validated_data.get('subject')
            )

            info.save()
            return info

        def _update_info(self, instance, validated_data):
            instance.name = validated_data.get('name', instance.name)
            instance.tooltip = validated_data.get('tooltip', instance.tooltip)
            incoming_image = validated_data.get('image', None)
            if incoming_image is not None:
                print(incoming_image)
                instance.image = incoming_image
            instance.subject = validated_data.get('subject')

        def create(self, validated_data):
            self._before_create_validation(validated_data)

            info = self._create_info(validated_data)

            for card_data in validated_data.get("levels"):
                card = info.levels.create(
                    level=card_data.get("level"),
                    next_level_cost=card_data.get("next_level_cost"),
                    effects_description=card_data.get("effects_description"),
                )
                for effect_data in card_data.get("effects"):
                    card.effects.create(
                        card_effect=effect_data.get("card_effect"),
                        target=effect_data.get("target", CardLevelEffects.Target.OPPONENT),
                        power=effect_data.get("power"),
                        range=effect_data.get("range")
                    )

            return info

        def update(self, instance, validated_data):
            self._update_info(instance, validated_data)

            cards_data = validated_data.get("levels", None)
            if not cards_data:
                instance.save()
                return instance

            # This tracks what levels we want. Later we need to remove levels aren't in this set
            updated_levels = set()
            for card_data in cards_data:
                card_level = card_data.get('level')
                updated_levels.add(card_level.level)
                card, _ = instance.levels.update_or_create(
                    level=card_level,
                    defaults={'next_level_cost': card_data.get("next_level_cost"),
                              'effects_description': card_data.get("effects_description")},
                )
                # We have to delete all effect before hand, as there is no way to tell whether an effect was updated
                # or a new one was added. There are no unique constraints here.
                card.effects.all().delete()
                for effect_data in card_data.get("effects"):
                    card.effects.create(
                        card_effect=effect_data.get("card_effect"),
                        target=effect_data.get("target", CardLevelEffects.Target.OPPONENT),
                        power=effect_data.get("power"),
                        range=effect_data.get("range")
                    )
            instance.save()
            self._remove_not_present_levels(instance, updated_levels)

            return instance

        def _remove_not_present_levels(self, instance, levels_set):
            all_levels = set([level[0] for level in CardLevel.Level.choices])
            leftover_levels = all_levels.difference(levels_set)
            for level in leftover_levels:
                card_to_remove = instance.levels.filter(level=level)
                card_to_remove.delete()

        def _validate_levels_provided(self, validated_data):
            """
            Validates if levels data is provided.
            :param validated_data: Data validated in serializer.
            :return: None.
            :raises: ValidationError if levels are not not provided in validated data.
            """

            if validated_data.get("levels") is None or len(validated_data.get("levels")) == 0:
                raise serializers.ValidationError("Brak danych o poziomie karty.")

        def _before_create_validation(self, validated_data):
            """
            This method should be called at the top of create method to validate data before creation.
            :param validated_data: Data validated by serializer passed to create method.
            :return: None.
            :raises: ValidationError if creation conditions are not met.
            """

            self._validate_levels_provided(validated_data)
            if before_create_validators is not None:
                for validator in before_create_validators:
                    validator(validated_data)

    return BaseWholeCardSerializer


def validate_name_unique(validated_data):
    if CardInfo.objects.filter(name=validated_data['name']).count() > 0:
        raise serializers.ValidationError("name must be unique!")


class WholeCardSerializer(base_whole_card_serializer_factory(CardInfo, SimpleCardSerializer, [validate_name_unique])):
    """
    (De)Serializes Card as a whole, packs all the information scattered across many models in one serializer.
    Information like:
    - card name
    - card image
    - card tooltip
    - all possible card's levels
    - all effects on given card's level
    etc.

    See: base_whole_card_serializer_factory
    """
