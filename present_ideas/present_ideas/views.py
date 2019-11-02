from django.shortcuts import redirect, render, reverse

from sheets.spreadsheet import get_worksheets


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

    context = {"username": username}

    return render(request, "what_do.html", context)
