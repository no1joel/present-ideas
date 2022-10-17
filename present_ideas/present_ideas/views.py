"""Views, and only views."""
import json

from django.http import (
    HttpRequest,
    HttpResponse,
    HttpResponsePermanentRedirect,
    HttpResponseRedirect,
    JsonResponse,
)
from django.shortcuts import redirect, render
from django.urls import reverse
from sheets.spreadsheet import ColumnIndex

from .utils import (
    add_row,
    delete_row,
    get_all_names,
    get_present_ideas,
    get_row_index,
    set_cell_value,
)


def person_list(request: HttpRequest) -> JsonResponse:
    """Return a list of people."""

    names = list(get_all_names())
    data = {"names": names}

    return JsonResponse(data)


# TODO: Fix naming...
def their_list_api(request: HttpRequest, username: str) -> JsonResponse:
    """Return a list of presents and their status."""

    present_ideas = get_present_ideas(username)

    data = {"presents": present_ideas}

    return JsonResponse(data)


def my_list_api(request: HttpRequest, username: str) -> JsonResponse:
    """Return a list of presents, excluding claimed status."""

    present_ideas = get_present_ideas(username)
    present_ideas = [idea for idea in present_ideas if idea["AddedBy"] == username]

    for present_idea in present_ideas:
        del present_idea["Claimed"]

    data = {"presents": present_ideas}

    return JsonResponse(data)


def add_idea_api(request: HttpRequest) -> HttpResponse:
    """Add an idea!"""

    data = json.loads(request.body)
    user_name = data["user"]
    thing = data["thing"]
    price = data["price"]
    notes = data["notes"]
    added_by = data["added_by"]
    add_row(user_name, [thing, price, notes, "", added_by])

    return JsonResponse({})


def delete_idea_api(request: HttpRequest) -> HttpResponse:
    """Delete an idea."""

    data = json.loads(request.body)
    user_name = data["user"]
    thing_index = data["index"]
    row_index = get_row_index(thing_index)
    delete_row(user_name, row_index)

    return JsonResponse({})


def update_idea_name_api(request: HttpRequest) -> HttpResponse:
    """Update an idea's name."""

    data = json.loads(request.body)
    user_name = data["user"]
    thing_index = data["index"]
    new_name = data["name"]
    row_index = get_row_index(thing_index)
    set_cell_value(user_name, row_index, ColumnIndex.thing, new_name)

    return JsonResponse({})


def claim_idea_api(request: HttpRequest) -> HttpResponse:
    """Claim an idea."""

    data = json.loads(request.body)
    thing_index = data["index"]
    their_name = data["for_user"]
    username = data["by_user"]

    row_index = get_row_index(thing_index)
    set_cell_value(their_name, row_index, ColumnIndex.claimed, username)

    return JsonResponse({})


def unclaim_idea_api(request: HttpRequest) -> HttpResponse:
    """Unclaim an idea."""

    data = json.loads(request.body)
    thing_index = data["index"]
    their_name = data["for_user"]

    row_index = get_row_index(thing_index)
    set_cell_value(their_name, row_index, ColumnIndex.claimed, "")

    return JsonResponse({})


def index(request: HttpRequest) -> HttpResponse:
    """Show a landing page."""

    if request.method == "POST":
        name = request.POST.get("name", "").title()
        return redirect(reverse("what_do", args=(name,)))

    return render(request, "index.html")


def redirect_to_vue_self(
    request: HttpRequest, username: str
) -> HttpResponseRedirect | HttpResponsePermanentRedirect:
    return redirect(f"/#/{username}/{username}/")


def redirect_to_vue_other(
    request: HttpRequest, username: str, their_name: str
) -> HttpResponseRedirect | HttpResponsePermanentRedirect:
    return redirect(f"/#/{username}/{their_name}/")
