import requests

"""endpoint = 'http:localhost:8000/api/'

app_response = requests.get(endpoint, json = {'blabla': 'helloo!!!!'})
print(app_response)
print(app_response.status_code)"""

import pandas as pd

expected_columns = [
    "HouseAge", "AveRooms", "AveBedrms",
    "Population", "AveOccup", "Latitude", "Longitude"
]

data = {
    "Population":1000,
    "HouseAge": 20,
    "AveRooms": 6.0,
    "AveBedrms": 1.0,
    "AveOccup": 3.0,
    "Latitude": 35.0,
    "Longitude": -118.0
}

data1 = {
    "Population":100,
    "HouseAge": 2,
    "AveRooms": 6.0,
    "AveBedrms": 1.0,
    "AveOccup": 8.0,
    "Latitude": 3.0,
    "Longitude": -11.0
}
df = pd.DataFrame([data,data1])
print(df)
