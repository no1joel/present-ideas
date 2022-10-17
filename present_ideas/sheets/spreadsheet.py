import os
from enum import IntEnum
from typing import TYPE_CHECKING, List

import gspread
from oauth2client.service_account import ServiceAccountCredentials

if TYPE_CHECKING:
    from gspread import Spreadsheet, Worksheet


class ColumnIndex(IntEnum):
    thing = 1
    price = 2
    notes = 3
    claimed = 4
    added_by = 5


def get_sheet() -> "Spreadsheet":
    # use creds to create a client to interact with the Google Drive API
    scope = ["https://spreadsheets.google.com/feeds"]
    path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "client_secret.json"
    )
    creds = ServiceAccountCredentials.from_json_keyfile_name(path, scope)

    client = gspread.authorize(creds)

    # Find a workbook by name and open the first sheet
    # Make sure you use the right name here.
    sheet = client.open_by_key("1oU6YZdEjnUKdsYgfIgvX_96BxM_Cae66ZWDolVWHJXA")
    return sheet


def get_worksheets() -> list["Worksheet"]:
    sheet = get_sheet()
    return sheet.worksheets()


def get_rows(name: str) -> list[dict]:
    sheet = get_sheet()
    worksheet = sheet.worksheet(name)
    return worksheet.get_all_records()


def add_row(name: str, row: List[str]) -> None:
    sheet = get_sheet()
    worksheet = sheet.worksheet(name)
    index = len(worksheet.get_all_records()) + 2
    worksheet.insert_row(row, index)


def set_cell_value(name: str, row_index: int, cell: ColumnIndex, value: str) -> None:
    sheet = get_sheet()
    worksheet = sheet.worksheet(name)
    cell_index = cell.value
    worksheet.update_cell(row_index, cell_index, value)


def delete_row(name: str, row_index: int) -> None:
    sheet = get_sheet()
    worksheet = sheet.worksheet(name)
    worksheet.delete_row(row_index)
