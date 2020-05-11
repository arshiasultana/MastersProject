import pandas as pd
import numpy as np


def CheckBorough(input):
    a = [0, 0, 0, 0, 0]
    if input == "Bronx":
        a[0] = 1
        return a
    elif input == "Brooklyn":
        a[1] = 1
        return a
    elif input == "Manhattan":
        a[2] = 1
        return a
    elif input == "Queens":
        a[3] = 1
        return a
    elif input == "Staten Island":
        a[4] = 1
        return a
    else:
        return "Invalid Input"


def CheckBuildingCategory(input):
    a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    if input == "ONE FAMILY DWELLINGS":
        a[0] = 1
        return a
    elif input == "TWO FAMILY DWELLINGS":
        a[1] = 1
        return a
    elif input == "THREE FAMILY DWELLINGS":
        a[2] = 1
        return a
    elif input == "TAX CLASS 1 CONDOS":
        a[3] = 1
        return a
    elif input == "RENTALS - WALKUP APARTMENTS":
        a[4] = 1
        return a
    elif input == "RENTALS - ELEVATOR APARTMENTS":
        a[5] = 1
        return a
    elif input == "SPECIAL CONDO BILLING LOTS":
        a[6] = 1
        return a
    elif input == "CONDOS - WALKUP APARTMENTS":
        a[7] = 1
        return a
    elif input == "CONDOS - ELEVATOR APARTMENTS":
        a[8] = 1
        return a
    elif input == "RENTALS - 4-10 UNIT":
        a[9] = 1
        return a
    elif input == "CONDOS - 2-10 UNIT RESIDENTIAL":
        a[10] = 1
        return a
    elif input == "OFFICE BUILDINGS":
        a[11] = 1
        return a
    elif input == "STORE BUILDINGS":
        a[12] = 1
        return a
    elif input == "LOFT BUILDINGS":
        a[13] = 1
        return a
    elif input == "OTHER HOTELS":
        a[14] = 1
        return a
    elif input == "FACTORIES":
        a[15] = 1
        return a
    elif input == "COMMERCIAL GARAGES":
        a[16] = 1
        return a
    elif input == "WAREHOUSES":
        a[17] = 1
        return a
    elif input == "HOSPITAL AND HEALTH FACILITIES":
        a[18] = 1
        return a
    elif input == "INDOOR PUBLIC AND CULTURAL FACILITIES":
        a[19] = 1
        return a
    elif input == "RELIGIOUS FACILITIES":
        a[20] = 1
        return a
    elif input == "TAX CLASS 4 - OTHER":
        a[21] = 1
        return a
    elif input == "CONDO PARKING":
        a[22] = 1
        return a
    else:
        return "Invalid Input"
