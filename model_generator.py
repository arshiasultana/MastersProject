
# Import the modules

from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn import metrics
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import KFold
from sklearn.externals import joblib
import pandas as pd
import numpy as np
import re
from scipy import stats
import sklearn as sk
import itertools
import warnings
warnings.filterwarnings('ignore')

data_model = pd.read_csv(
    '/Users/ArshiaSultana/Desktop/Master_Project/flask-backend/SALES DATA.CSV')

# Select the variables to be one-hot encoded
one_hot_features = ['BOROUGH', 'BUILDING CLASS CATEGORY']

# Convert categorical variables into dummy/indicator variables (i.e. one-hot encoding).
one_hot_encoded = pd.get_dummies(data_model[one_hot_features])

data_model = data_model.drop(one_hot_features, axis=1)

# ...and add the new one-hot encoded variables
data_model = pd.concat([data_model, one_hot_encoded], axis=1)

scaler_y = StandardScaler().fit(
    np.log(data_model['SALE PRICE']).values.reshape(-1, 1))
data_model['SALE PRICE'] = scaler_y.transform(
    np.log(data_model['SALE PRICE']).values.reshape(-1, 1))


# Add 1 to Units
data_model['COMMERCIAL UNITS'] = data_model['COMMERCIAL UNITS'] + 1
data_model['RESIDENTIAL UNITS'] = data_model['RESIDENTIAL UNITS'] + 1

# Take the log and standardise

scaler_CommercialUnits = StandardScaler().fit(
    np.log(data_model['COMMERCIAL UNITS']).values.reshape(-1, 1))
data_model['COMMERCIAL UNITS'] = scaler_CommercialUnits.transform(
    np.log(data_model['COMMERCIAL UNITS']).values.reshape(-1, 1))

scaler_ResidentialUnits = StandardScaler().fit(
    np.log(data_model['RESIDENTIAL UNITS']).values.reshape(-1, 1))
data_model['RESIDENTIAL UNITS'] = scaler_ResidentialUnits.transform(
    np.log(data_model['RESIDENTIAL UNITS']).values.reshape(-1, 1))

# Add 1 to Units
data_model['GROSS SQUARE FEET'] = data_model['GROSS SQUARE FEET'] + 1
data_model['LAND SQUARE FEET'] = data_model['LAND SQUARE FEET'] + 1

scaler_GrossSquareFeet = StandardScaler().fit(
    np.log(data_model['GROSS SQUARE FEET']).values.reshape(-1, 1))
data_model['GROSS SQUARE FEET'] = scaler_GrossSquareFeet.transform(
    np.log(data_model['GROSS SQUARE FEET']).values.reshape(-1, 1))

scaler_LandSquareFeet = StandardScaler().fit(
    np.log(data_model['LAND SQUARE FEET']).values.reshape(-1, 1))
data_model['LAND SQUARE FEET'] = scaler_LandSquareFeet.transform(
    np.log(data_model['LAND SQUARE FEET']).values.reshape(-1, 1))


# Split data into training and testing set with 80% of the data going into training
training, testing = train_test_split(data_model, test_size=0.2, random_state=0)


# X are the variables/features that help predict y,  This is done for both
#training and testing
df_train_s = training.loc[:, data_model.columns]
X_train_s = df_train_s.drop(['SALE PRICE'], axis=1)
y_train_s = df_train_s.loc[:, ['SALE PRICE']]

df_test_s = testing.loc[:, data_model.columns]
X_test_s = df_test_s.drop(['SALE PRICE'], axis=1)
y_test_s = df_test_s.loc[:, ['SALE PRICE']]

# Create the regressor: linreg
classifier = LinearRegression()

# Fit the regressor to the training data
classifier.fit(X_train_s, y_train_s)

# Predict the labels of the test set: y_pred
prediction = classifier.predict(X_test_s)

# Compute 5-fold cross-validation scores: cv_scores
cv_scores_linreg = cross_val_score(classifier, X_train_s, y_train_s, cv=5)

# Save the model to disk
joblib.dump(
    classifier, '/Users/ArshiaSultana/Desktop/Master_Project/flask-backend/classifier.joblib')

print('model saved')
