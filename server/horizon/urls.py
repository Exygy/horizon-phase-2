from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import RedirectView

from .views import FrontendAppView, GraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=settings.GRAPHQL_DEBUG))),
    path('gql', csrf_exempt(GraphQLView.as_view())),
    path('favicon.ico', RedirectView.as_view(url='/static/favicon.ico')),
    re_path(r'.*', FrontendAppView.as_view()),
]
