# Program to generate metrics using consolidated raw data of sales

import pandas as pd

df = pd.read_csv("Cleaned_DATA.csv")

years = [2015, 2016, 2017, 2018, 2019]

metrics = {
    'Years': years,
    'YearsInView': len(years),
    'TotalSalesInYears': df["Unnamed: 0"].nunique(),
    'Boroughs': df.BOROUGH.nunique(),
    'Neighborhoods': df.NEIGHBORHOOD.nunique(),
    'BuildingClasses': df['BUILDING CLASS CATEGORY'].nunique()
}
