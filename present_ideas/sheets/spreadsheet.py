import os
from typing import List

import gspread
from oauth2client.service_account import ServiceAccountCredentials

# worksheet = sheet.worksheet("Joel")

# # Extract and print all of the values
# list_of_hashes = worksheet.get_all_records()
# print(list_of_hashes)


def get_sheet():
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


def get_worksheets():
    sheet = get_sheet()
    return sheet.worksheets()


def get_rows(name: str) -> List[dict]:
    sheet = get_sheet()
    worksheet = sheet.worksheet(name)
    return worksheet.get_all_records()


def add_row(name: str, row: List[str]):
    sheet = get_sheet()
    worksheet = sheet.worksheet(name)
    index = len(worksheet.get_all_records()) + 2
    worksheet.insert_row(row, index)


def set_cell_value(name: str, row_index: int, cell_index: int, value: str):
    sheet = get_sheet()
    worksheet = sheet.worksheet(name)
    worksheet.update_cell(row_index, cell_index, value)


def delete_row(name: str, row_index: int):
    sheet = get_sheet()
    worksheet = sheet.worksheet(name)
    worksheet.delete_row(row_index)
