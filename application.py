from flask import Flask, redirect, url_for
from flask import request
from flask import render_template
import os


application = Flask(__name__)


@application.route("/", methods=['POST', 'GET'])
def index():
    if request.method == "POST":
        f = open('./file.wav', 'wb')
        f.write(request.files["audio_data"].read())
        f.close()
        return "task End"
        # return render_template('index.html')
        # return render_template('index.html', method="POST") *original
    else:
        return render_template('index.html')

# @application.route('/')
# def test():
#     return "This is the test page."