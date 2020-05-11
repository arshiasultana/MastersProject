
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_restplus import Api, Resource, fields
from sklearn.externals import joblib
from model_generator import scaler_CommercialUnits, scaler_GrossSquareFeet, scaler_LandSquareFeet, scaler_ResidentialUnits, scaler_y
import json
import sys
import pandas as pd
import numpy as np
from functions import CheckBuildingCategory, CheckBorough
import metrics

app = Flask(__name__)
CORS(app)


# api for Metrics

@app.route('/Metrics', methods=['GET', 'POST'])
def Metrics():
    response1 = jsonify(metrics.metrics)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/data.json') as f:
    group_data = json.load(f)


@app.route('/data_group', methods=['GET', 'POST'])
def data_group():
    response1 = jsonify(group_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


# api for Manhattan borough
with open('json/ManhattanGroup.json') as f:
    Manhattan_group_data = json.load(f)


@app.route('/Manhattan_group', methods=['GET', 'POST'])
def Manhattan_group():
    response1 = jsonify(Manhattan_group_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/ManhattanLineGroup.json') as f:
    ManhattanLine_data = json.load(f)


@app.route('/Manhattan_line', methods=['GET', 'POST'])
def Manhattan_Line():
    response1 = jsonify(ManhattanLine_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


# api for bronx group
with open('json/BronxGroup.json') as f:
    Bronx_group_data = json.load(f)


@app.route('/Bronx_group', methods=['GET', 'POST'])
def Bronx_group():
    response1 = jsonify(Bronx_group_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/BronxLineGroup.json') as f:
    BronxLine_data = json.load(f)


@app.route('/Bronx_line', methods=['GET', 'POST'])
def Bronx_Line():
    response1 = jsonify(BronxLine_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


# api for Brooklyn borough
with open('json/BrooklynGroup.json') as f:
    Brooklyn_group_data = json.load(f)


@app.route('/Brooklyn_group', methods=['GET', 'POST'])
def Brooklynn_group():
    response1 = jsonify(Brooklyn_group_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/BrooklynLineGroup.json') as f:
    BrooklynLine_data = json.load(f)


@app.route('/Brooklyn_line', methods=['GET', 'POST'])
def Brooklyn_Line():
    response1 = jsonify(BrooklynLine_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


# api for Queens borough
with open('json/QueensGroup.json') as f:
    Queens_group_data = json.load(f)


@app.route('/Queens_group', methods=['GET', 'POST'])
def Queens_group():
    response1 = jsonify(Queens_group_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/QueensLineGroup.json') as f:
    QueensLine_data = json.load(f)


@app.route('/Queens_line', methods=['GET', 'POST'])
def Queens_Line():
    response1 = jsonify(QueensLine_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


# api for Staten Island borough
with open('json/StatenGroup.json') as f:
    Statengroup_data = json.load(f)


@app.route('/Staten_group', methods=['GET', 'POST'])
def Staten_group():
    response1 = jsonify(Statengroup_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1
    Staten_group_data = json.load(f)


with open('json/StatenLineGroup.json') as f:
    Staten_Line_data = json.load(f)


@app.route('/Staten_line', methods=['GET', 'POST'])
def Staten_Line():
    response1 = jsonify(Staten_Line_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


# api for 2015
with open('json/box_2015.json') as f:
    data_box_2015 = json.load(f)


@app.route('/box_2015', methods=['GET', 'POST'])
def box_2015():
    response1 = jsonify(data_box_2015)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/median_2015.json') as f:
    median_2015_data = json.load(f)


@app.route('/median_2015', methods=['GET', 'POST'])
def median_2015():
    response1 = jsonify(median_2015_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


# api for 2016
with open('json/box_2016.json') as f:
    data_box_2016 = json.load(f)


@app.route('/box_2016', methods=['GET', 'POST'])
def box_2016():
    response1 = jsonify(data_box_2016)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/median_2016.json') as f:
    median_2016_data = json.load(f)


@app.route('/median_2016', methods=['GET', 'POST'])
def median_2016():
    response1 = jsonify(median_2016_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


# api for 2017
with open('json/median_2017.json') as f:
    median_2017_data = json.load(f)


@app.route('/median_2017', methods=['GET', 'POST'])
def median_2017():
    response1 = jsonify(median_2017_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/box_2017.json') as f:
    data_box_2017 = json.load(f)


@app.route('/box_2017', methods=['GET', 'POST'])
def box_2017():
    response1 = jsonify(data_box_2017)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/scatter_2017.json') as f:
    data_scatter_2017 = json.load(f)


@app.route('/scatter_2017', methods=['GET', 'POST'])
def scatter_2017():
    response1 = jsonify(data_scatter_2017)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1

# api for 2018


with open('json/median_2018.json') as f:
    median_2018_data = json.load(f)


@app.route('/median_2018', methods=['GET', 'POST'])
def median_2018():
    response1 = jsonify(median_2018_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/box_2018.json') as f:
    data_box_2018 = json.load(f)


@app.route('/box_2018', methods=['GET', 'POST'])
def box_2018():
    response1 = jsonify(data_box_2018)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/scatter_2018.json') as f:
    data_scatter_2018 = json.load(f)


@app.route('/scatter_2018', methods=['GET', 'POST'])
def scatter_2018():
    response1 = jsonify(data_scatter_2018)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/scatter_2019.json') as f:
    data_scatter_2019 = json.load(f)


@app.route('/scatter_2019', methods=['GET', 'POST'])
def scatter_2019():
    response1 = jsonify(data_scatter_2019)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


with open('json/box_2019.json') as f:
    data_box_2019 = json.load(f)


@app.route('/box_2019', methods=['GET', 'POST'])
def box_2019():
    response1 = jsonify(data_box_2019)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1

# old api data


with open('json/brooklyn1_2019.json') as f:
    data_brooklyn = json.load(f)
with open('json/iris.json') as f:
    iris_Data = json.load(f)
with open('json/bronx1_2019.json') as f:
    data_bronx = json.load(f)
with open('json/Manhattan_line_1.json') as f:
    data_Manhattan_line1 = json.load(f)
with open('json/median_2019.json') as f:
    median_2019_data = json.load(f)
with open('json/building_category_median_2019.json') as f:
    building_category_median_2019_data = json.load(f)


@app.route('/', methods=['GET', 'POST'])
def index():
    return "Hello"


@app.route('/iris', methods=['GET', 'POST'])
def iris():
    response1 = jsonify(iris_Data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


@app.route('/building_category_median_2019', methods=['GET', 'POST'])
def building_category_median_2019():
    response1 = jsonify(building_category_median_2019_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


@app.route('/median_2019', methods=['GET', 'POST'])
def median_2019():
    response1 = jsonify(median_2019_data)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


@app.route('/bronx2019', methods=['GET', 'POST'])
def bronx():
    response1 = jsonify(data_bronx)
    response1.headers.add("Access-Control-Allow-Origin", "*")
    response1.headers.add('Access-Control-Allow-Headers', "*")
    response1.headers.add('Access-Control-Allow-Methods', "*")
    return response1


@app.route('/brooklyn2019', methods=['GET', 'POST'])
def brooklyn():
    response = jsonify(data_brooklyn)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


@app.route('/ML1', methods=['GET', 'POST'])
def ML1():
    response = jsonify(data_Manhattan_line1)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


classifier = joblib.load('classifier.joblib')


@app.route("/prediction", methods=['POST'])
def prediction():

    formData = request.json
    borough = formData["borough"]
    building = formData["building"]
    cu = int(formData["cu"])
    ru = int(formData["ru"])
    lsf = int(formData["lsf"])
    gsf = int(formData["gsf"])

    transformed_Borough = CheckBorough(borough)
    transformed_Building = CheckBuildingCategory(building)
    Borough_Building = transformed_Borough+transformed_Building

    Comm_units = cu+1
    Gross_sq_feet = gsf+1
    Land_sq_feet = lsf+1
    Res_units = ru+1

    transformed_Comm_units = scaler_CommercialUnits.transform(
        np.log(Comm_units).reshape(-1, 1))
    transformed_Gross_sq_feet = scaler_GrossSquareFeet.transform(
        np.log(Gross_sq_feet).reshape(-1, 1))
    transformed_Land_sq_feet = scaler_LandSquareFeet.transform(
        np.log(Land_sq_feet).reshape(-1, 1))
    transformed_Res_units = scaler_ResidentialUnits.transform(
        np.log(Res_units).reshape(-1, 1))

    print(transformed_Comm_units, transformed_Gross_sq_feet,
          transformed_Land_sq_feet, transformed_Res_units)
    concat = np.concatenate(
        (transformed_Comm_units[0], transformed_Gross_sq_feet[0], transformed_Land_sq_feet[0], transformed_Res_units[0]))
    concat = concat.tolist()

    transformed_input = concat+Borough_Building

    output = classifier.predict([transformed_input])

    inversed = scaler_y.inverse_transform(output)

    final_output = np.exp(inversed)

    # predicted_value = json.dumps({'a':final_output})
    final_output = final_output.tolist()
    print(final_output)

    response = jsonify(
        {"result": final_output})

    # response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "Content-Type")
    response.headers.add('Access-Control-Allow-Methods',
                         "GET,POST,PUT,DELETE,OPTIONS")

    return response
# print(cu)
# return formData["cu"]


if __name__ == '__main__':
    app.run()
