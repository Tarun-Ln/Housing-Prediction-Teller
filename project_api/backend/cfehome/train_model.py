from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.linear_model import LinearRegression
import joblib
import pandas as pd


data = fetch_california_housing(as_frame=True)
df = data.frame

X = df.drop('MedInc', axis=1)
y = df['MedInc']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.50, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)


mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

#print(y_test)
print(mse)
print(r2)

#joblib.dump(model, 'house_income_model.pkl')

