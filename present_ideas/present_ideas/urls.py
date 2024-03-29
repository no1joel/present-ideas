"""present_ideas URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from present_ideas import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index, name="index"),
    path("api/person", views.person_list, name="person_list"),
    path("api/their_list/<username>", views.their_list_api, name="their_list_api"),
    path("api/my_list/<username>", views.my_list_api, name="my_list_api"),
    path("api/add_idea/", views.add_idea_api, name="add_idea_api"),
    path("api/delete_idea/", views.delete_idea_api, name="delete_idea_api"),
    path(
        "api/update_idea_name/", views.update_idea_name_api, name="update_idea_name_api"
    ),
    path(
        "api/update_idea_price/",
        views.update_idea_price_api,
        name="update_idea_price_api",
    ),
    path(
        "api/update_idea_notes/",
        views.update_idea_notes_api,
        name="update_idea_notes_api",
    ),
    path("api/claim_idea/", views.claim_idea_api, name="claim_idea_api"),
    path("api/unclaim_idea/", views.unclaim_idea_api, name="unclaim_idea_api"),
    path("<username>/what_do/", views.redirect_to_vue_self),
    path("<username>/who/", views.redirect_to_vue_self),
    path("<username>/<their_name>/", views.redirect_to_vue_other),
]
