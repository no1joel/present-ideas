from django.shortcuts import redirect, render, reverse

from sheets.spreadsheet import (
    add_row,
    delete_row,
    get_rows,
    get_worksheets,
    set_cell_value,
)


def get_present_ideas(their_name):
    # TODO: Embed urls
    _header, *rows = get_rows(their_name)
    presents = [{**row, "index": index} for index, row in enumerate(rows)]
    return presents


def get_row_index(thing_index):
    # TODO: Why is it plus 3?!
    return thing_index + 3


def index(request):
    if request.method == "POST":
        name = request.POST.get("name", "").title()
        return redirect(reverse("what_do", args=(name,)))

    return render(request, "index.html")


def check_name(name: str) -> bool:
    """Check if the provided name is a sheet."""

    worksheet_names = (worksheet.title.lower() for worksheet in get_worksheets())
    return name.lower() in worksheet_names


def what_do(request, username):
    if not check_name(username):
        return redirect(reverse("index"))

    context = {
        "who_url": reverse("who", args=(username,)),
        "me_url": reverse("present_list", args=(username, username)),
    }

    return render(request, "what_do.html", context)


def who(request, username):
    """Ask who's list they wanna look at."""

    if request.method == "POST":
        their_name = request.POST.get("name", "").title()
        return redirect(reverse("present_list", args=(username, their_name)))

    return render(request, "who.html")


def present_list(request, username: str, their_name: str):
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


def claim(request, username: str, their_name: str, thing_index: int):

    claimed_index = 4
    row_index = get_row_index(thing_index)
    set_cell_value(their_name, row_index, claimed_index, username)

    return redirect(reverse("present_list", args=(username, their_name)))


def unclaim(request, username: str, their_name: str, thing_index: int):

    claimed_index = 4
    row_index = get_row_index(thing_index)
    set_cell_value(their_name, row_index, claimed_index, "")

    return redirect(reverse("present_list", args=(username, their_name)))


def delete(request, username: str, their_name: str, thing_index: int):

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
