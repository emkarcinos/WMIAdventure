from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import update_last_login
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError

from users.models import User


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class BasicUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=64, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)
        if username is None or password is None:
            raise serializers.ValidationError(
                'Puste hasło lub nazwa użytkownika'
            )
        UserModel = get_user_model()
        try:
            UserModel.objects.get(username=username)
        except UserModel.DoesNotExist:
            raise ValidationError(
                {'username': 'Użytkownik o takiej nazwie nie istnieje'}
            )
        user = authenticate(username=username, password=password)
        if user is None:
            raise ValidationError(
                {'password': 'Niepoprawne hasło'}
            )
        token, _ = Token.objects.get_or_create(user=user)
        update_last_login(None, user)

        return {
            'username': username,
            'token': token.key
        }
