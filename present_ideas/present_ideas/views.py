from django.shortcuts import redirect, render, reverse

from sheets.spreadsheet import add_row, get_rows, get_worksheets


def index(request):
    if request.method == "POST":
        name = request.POST.get("name")
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
        their_name = request.POST.get("name")
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

    context = {"rows": get_rows(their_name)[1:]}
    return render(request, "list.html", context)
