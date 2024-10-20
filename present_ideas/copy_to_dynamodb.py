from pprint import pprint
from typing import Iterable

import boto3
from sheets.spreadsheet import get_rows, get_worksheets


def main():
    client = boto3.resource("dynamodb", region_name="eu-west-2")
    table = client.Table("present-ideas")

    print("hi!")
    for person_name, rows in _get_person_and_presents():
        try:
            table.put_item(Item={"person": person_name, "presents": rows})
        except TypeError:
            pprint(rows)
            raise


def _get_person_and_presents() -> Iterable[tuple[str, list[dict]]]:
    for worksheet in get_worksheets():
        person_name = worksheet.title
        if person_name.startswith("Template"):
            continue
        _header_row, *rows = get_rows(person_name)
        rows = [{**row, "Price": str(row.get("Price", ""))} for row in rows]
        yield person_name, rows


if __name__ == "__main__":
    main()
