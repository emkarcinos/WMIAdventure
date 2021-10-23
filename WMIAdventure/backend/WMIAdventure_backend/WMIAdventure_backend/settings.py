"""
Django settings for WMIAdventure_backend project.

Generated by 'django-admin startproject' using Django 3.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

import os
from os import environ
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# Getting a key from DJANGO_SECRET environment variable
SECRET_KEY = environ.get('DJANGO_SECRET', 'django_insecure')

# We check whether DJANGO_DEBUG variable was set to 'True' to determine DEBUG
DEBUG = (environ.get('DJANGO_DEBUG', 'True') == 'True')

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'users.apps.UsersConfig',
    'IngameUsers',
    'cards',
    'battle',
    'proposed_content',
    'corsheaders',
    'db_file_storage'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.BrokenLinkEmailsMiddleware',
    'django.middleware.common.CommonMiddleware',
]
DEFAULT_FILE_STORAGE = 'db_file_storage.storage.DatabaseFileStorage'

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    # prod
    'http://wmi-adventure.pl',
    'https://wmi-adventure.pl',
    'http://wmiadventure.projektstudencki.pl',
    'https://wmiadventure.projektstudencki.pl',

    # dev
    'http://wmiadventure.westeurope.cloudapp.azure.com',
    'https://wmiadventure.westeurope.cloudapp.azure.com',
    
    # local development
    'http://localhost',
]
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

ROOT_URLCONF = 'WMIAdventure_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'WMIAdventure_backend.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases


'''
Sets DATABASES variable
We don't support any other external databases than PostgreSQL, so make sure the paths point to a DB of such type.
One may run a default django DB without specifying DB_ADDRESS and DB_PORT.

'''
localhost = "localhost"
DATABASES = {}
db_source = environ.get('DB_ADDRESS', None)
# Defaulting port to PostgreSQL default
db_port = environ.get('DB_PORT', 5432)
# If we specified localhost or no address at all, we fallback to default DB
if db_source is None or (db_source == localhost):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    db_user = environ.get('DB_USER', 'postgres')
    db_name = environ.get('DB_NAME', 'django')
    db_password = environ.get('DB_PASSWD')
    if db_password is None:
        raise RuntimeError("No DB password specified!")
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': db_name,
            'USER': db_user,
            'PASSWORD': db_password,
            'HOST': db_source,
            'PORT': db_port,
        }
    }

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'users.User'

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema'}
