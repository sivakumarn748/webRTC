from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

text = None

def page(request) :
    global text
    print(text)
    return render(request, "clippage.html", {'text': text})

@csrf_exempt
def submit(request) :
    global text
    content = json.loads(request.body.decode('utf-8'))['text']
    print(content)
    text = content
    return HttpResponse(text)