from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import joblib
import json
# Create your views here.

model = joblib.load('C:\\Users\\tarun\\Downloads\\project_api\\house_income_model.pkl')

def api_home(request):
    return JsonResponse({"Server response": "This is the himepage of the API."})

@csrf_exempt
def predict_model(request_model):
    print('ENTERED')
    print(request_model.body)
    if request_model.method == 'POST':

        requirments = json.loads(request_model.body.decode('utf-8'))
        print(requirments)

        feature_names = [
            "HouseAge",
            "AveRooms",
            "AveBedrms",
            "Population",
            "AveOccup",
            "Latitude",
            "Longitude",]

        features = [[requirments[x] for x in feature_names]]
        print(features)

        prediction = model.predict(features)
        print(prediction)

        return JsonResponse({'Predicted Median Income': str(prediction)})