from typing import Iterable, List

from sheets.spreadsheet import (
    add_row,
    delete_row,
    get_rows,
    get_worksheets,
    set_cell_value,
)


def check_name(name: str) -> bool:
    """Check if the provided name is a sheet."""

    worksheet_names = get_all_names()
    return name.lower() in worksheet_names


def get_all_names() -> Iterable[str]:
    """Return people's names."""

    return (
        worksheet.title.lower()
        for worksheet in get_worksheets()
        if "template" not in worksheet.title.lower()
    )


def get_present_ideas(their_name: str) -> List[dict]:
    # TODO: Embed urls
    _header, *rows = get_rows(their_name)
    presents = [{**row, "index": index} for index, row in enumerate(rows)]
    return presents


def get_row_index(thing_index: int) -> int:
    # TODO: Why is it plus 3?!
    return thing_index + 3
