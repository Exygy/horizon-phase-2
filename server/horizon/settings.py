import django_heroku
import socket
import os
import environ
import pytz
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from django.utils import timezone

root = environ.Path(__file__) - 2                            # two folders back (/a/b/ - 2 = /)
DEFAULT_ENV_PATH = environ.Path(__file__) - 3                # default location of .env file
DEFAULT_ENV_FILE = DEFAULT_ENV_PATH.path('.env')()
env = environ.Env(DEBUG=(bool, False),)                      # set default values and casting
environ.Env.read_env(env.str('ENV_PATH', DEFAULT_ENV_FILE))  # reading .env file

# Report all bugs to Sentry
sentry_sdk.init(
    dsn=env('SENTRY_DSN', default=False),
    integrations=[DjangoIntegration()]
)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = root()

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DJANGO_DEBUG', default=False)

ALLOWED_HOSTS = []

CORS_ORIGIN_WHITELIST = ['http://localhost:3000']

# Application definition

INSTALLED_APPS = [
    # Standard Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Dev Tools
    'debug_toolbar',

    # Third party apps
    'graphene_django',
    'corsheaders',
    'import_export',

    # Our apps
    'horizon',
    'cms',
]

# TODO - turn off in prod when golive
INSTALLED_APPS += ['django_extensions']


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


if DEBUG:
    def show_toolbar(request):
        return True

    DEBUG_TOOLBAR_CONFIG = {
        # Toolbar options
        'RESULTS_CACHE_SIZE': 3,
        'SHOW_COLLAPSED': True,
        'SHOW_TOOLBAR_CALLBACK': show_toolbar,
        # Panel options
        'SQL_WARNING_THRESHOLD': 100,   # milliseconds
    }

    hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
    INTERNAL_IPS = [ip[:-1] + '1' for ip in ips] + ['127.0.0.1', '10.0.2.2']

    MIDDLEWARE = ['debug_toolbar.middleware.DebugToolbarMiddleware', ] + MIDDLEWARE

    DEBUG_TOOLBAR_PANELS = [
        'debug_toolbar.panels.versions.VersionsPanel',
        'debug_toolbar.panels.timer.TimerPanel',
        'debug_toolbar.panels.settings.SettingsPanel',
        'debug_toolbar.panels.headers.HeadersPanel',
        'debug_toolbar.panels.request.RequestPanel',
        'debug_toolbar.panels.sql.SQLPanel',
        'debug_toolbar.panels.staticfiles.StaticFilesPanel',
        'debug_toolbar.panels.templates.TemplatesPanel',
        'debug_toolbar.panels.cache.CachePanel',
        'debug_toolbar.panels.signals.SignalsPanel',
        'debug_toolbar.panels.logging.LoggingPanel',
        'debug_toolbar.panels.redirects.RedirectsPanel',
        'debug_toolbar.panels.profiling.ProfilingPanel',
    ]


ROOT_URLCONF = 'horizon.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
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

WSGI_APPLICATION = 'horizon.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': env.db(),
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# NOTE - This displays everything as PST. Everything in the backend is
# still stored as UTC
ZONE = "US/Pacific"
timezone.activate(pytz.timezone(ZONE))

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = '/code/server/static'

REACT_APP_DIR = os.path.join('client')
if not DEBUG:
    STATICFILES_DIRS = [
        os.path.join(REACT_APP_DIR, 'build', 'static'),
        os.path.join(REACT_APP_DIR, 'build')
    ]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

if not DEBUG:
    SECURE_SSL_REDIRECT = True

###################
# Custom settings, not standard in Django
###################
# Graphene

GRAPHENE = {
    'SCHEMA': 'horizon.schema.schema',  # Where your Graphene schema lives
    'RELAY_CONNECTION_MAX_LIMIT': 50,
}

GRAPHQL_DEBUG = env('GRAPHQL_DEBUG', default=DEBUG)

if not DEBUG:
    django_heroku.settings(locals())
    # TODO - needs more investigation. For now:
    # https://github.com/kennethreitz/dj-database-url/issues/107
    del DATABASES['default']['OPTIONS']['sslmode']
