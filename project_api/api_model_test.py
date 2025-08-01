import requests

endpoint  = 'http://127.0.0.1:8000/predict/'

post_request = requests.post(endpoint, data='''{
    "HouseAge": 41.0,
    "AveRooms": 6.984127,
    "AveBedrms": 1.023810,
    "Population": 322.0,
    "AveOccup": 2.555556,
    "Latitude": 37.88,
    "Longitude": -122.23,
    "MedHouseVal": 4.526
}''')

print(post_request.text)