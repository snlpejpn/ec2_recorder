from flask import Flask, redirect, url_for
from flask import request
from flask import render_template
import os


application = Flask(__name__)


@application.route("/", methods=['POST', 'GET'])
def index():
    image_key = 0
    if request.method == "POST":
        f = open('./file.wav', 'wb')
        f.write(request.files["audio_data"].read())
        f.close()
        return render_template('index.html', val="val")
        # return render_template('index.html')
        # return render_template('index.html', method="POST") *original
    else:
        return render_template('index.html')

@application.route('/test', methods=["POST", "GET"])
def test():
    if request.method == "POST":
        count = request.form['nclick']
        print(count)
        return "return"
    else:
        return render_template('test.html')


# @application.route('/counter')
# def counter():
#     count
#     return render_template('test.html')


if __name__ == "__main__":
    application.run(debug=True)