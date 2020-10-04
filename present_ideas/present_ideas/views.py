"""Views, and only views."""
from django.shortcuts import redirect, render, reverse
from .utils import (
    get_all_names,
    get_worksheets,
    add_row,
    get_present_ideas,
    get_row_index,
    set_cell_value,
    delete_row,
    check_name,
)

from django.http import HttpRequest, HttpResponse, JsonResponse


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

    for present_idea in present_ideas:
        del present_idea["Claimed"]

    data = {"presents": present_ideas}

    return JsonResponse(data)


def index(request: HttpRequest) -> HttpResponse:
    """Show a landing page."""

    if request.method == "POST":
        name = request.POST.get("name", "").title()
        return redirect(reverse("what_do", args=(name,)))

    return render(request, "index.html")


def what_do(request: HttpRequest, username: str) -> HttpResponse:
    """Ask the user what they want to do."""

    if not check_name(username):
        return redirect(reverse("index"))

    context = {
        "who_url": reverse("who", args=(username,)),
        "me_url": reverse("present_list", args=(username, username)),
        "username": username,
    }

    return render(request, "what_do.html", context)


def who(request: HttpRequest, username: str) -> HttpResponse:
    """Ask who's list they wanna look at."""

    if request.method == "POST":
        their_name = request.POST.get("name", "").title()
        return redirect(reverse("present_list", args=(username, their_name)))

    return render(request, "who.html")


def present_list(request: HttpRequest, username: str, their_name: str) -> HttpResponse:
    """Show a list of ideas for someone."""

    if not check_name(their_name):
        return redirect(reverse("index"))

    if request.method == "POST":
        thing = request.POST["thing"]
        price = request.POST["price"]
        notes = request.POST["notes"]
        add_row(their_name, [thing, price, notes])

    show_claimed = username.lower() != their_name.lower()

    context = {
        "rows": get_present_ideas(their_name),
        "username": username,
        "their_name": their_name,
        "show_claimed": show_claimed,
    }
    return render(request, "list.html", context)


def claim(
    request: HttpRequest, username: str, their_name: str, thing_index: int
) -> HttpResponse:
    """Mark a present as claimed."""

    claimed_index = 4
    row_index = get_row_index(thing_index)
    set_cell_value(their_name, row_index, claimed_index, username)

    return redirect(reverse("present_list", args=(username, their_name)))


def unclaim(
    request: HttpRequest, username: str, their_name: str, thing_index: int
) -> HttpResponse:
    """Mark a present as unclaimed."""

    claimed_index = 4
    row_index = get_row_index(thing_index)
    set_cell_value(their_name, row_index, claimed_index, "")

    return redirect(reverse("present_list", args=(username, their_name)))


def delete(
    request: HttpRequest, username: str, their_name: str, thing_index: int
) -> HttpResponse:
    """Delete a present idea."""

    if request.method == "POST":
        row_index = get_row_index(thing_index)
        delete_row(their_name, row_index)
        return redirect(reverse("present_list", args=(username, their_name)))

    # TODO: This offset thing make into func
    thing = get_present_ideas(their_name)[thing_index]

    context = {
        "thing": thing,
        "username": username,
        "their_name": their_name,
        "list_url": reverse("present_list", args=(username, their_name)),
        "delete_url": reverse("delete", args=(username, their_name, thing_index)),
    }

    return render(request, "delete.html", context)
