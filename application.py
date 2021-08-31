from typing import ContextManager
from flask import Flask, redirect, url_for
from flask import request
from flask import render_template
import os
from image_list import image_list
import random

IMAGE_FOLDER = os.path.join('static', 'images')

application = Flask(__name__)
application.config['UPLOAD_FOLDER'] = IMAGE_FOLDER




@application.route("/", methods=['POST', 'GET'])
def index():
    if request.method == "POST":
        # store audio
        f = open('./file.wav', 'wb')
        f.write(request.files["audio_data"].read())
        f.close()

        # change image
        key = random.choice([i for i in range(1, 7)])
        full_filename = os.path.join(application.config["UPLOAD_FOLDER"], image_list[key])
        return render_template('index.html', random_image=full_filename)
        # return render_template('index.html', method="POST") *original
    else:
        key = random.choice([i for i in range(1, 7)])
        full_filename = os.path.join(application.config["UPLOAD_FOLDER"], image_list[key])
        return render_template('index.html', random_image=full_filename)

@application.route("/test", methods=['POST', 'GET'])
def test():
    if request.method == "POST":
        # store input data

        # change image
        key = random.choice([i for i in range(1, 7)])
        filename = os.path.join(application.config["UPLOAD_FOLDER"], image_list[key])
        return render_template('test.html', image_url=filename)

    else:
        key = random.choice([i for i in range(1, 7)])
        filename = os.path.join(application.config["UPLOAD_FOLDER"], image_list[key])
        return render_template('test.html', image_url=filename)


# @application.route('/select_image')
# def select_image():
#     images = image_df['url']



# @application.route('/test', methods=["POST", "GET"])
# def test():
#     if request.method == "POST":
#         count = request.form['nclick']
#         print(count)
#         return "return"
#     else:
#         return render_template('test.html')


# @application.route('/counter')
# def counter():
#     count
#     return render_template('test.html')


if __name__ == "__main__":
    application.run(debug=True)