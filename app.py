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
        # return "get"

# if __name__ == "__main__":
#     app.run(debug=True)








# from flask import Flask, redirect, url_for, render_template, request, session
# # from os import listdir
# from os.path import isfile, join
# # import random
# import os
# import wave

# # awsではapplicationにしないと動かない
# application = Flask(__name__)
# app = application

# @app.route('/')
# def start():
#     return render_template("start.html")

# @app.route('/test', methods = ["GET", "POST"])
# def test():
#     if request.method == "POST":
#         name = request.form['name']
#         f = open('test.txt', 'w')
#         f.write(name)
#         f.close()
#         return 'submitted'
#     else:
#         return render_template('test.html')


# @app.route('/record', methods=["GET", "POST"])
# # ここにpostをいれとかないと、method not allowedのエラーが出てくる。
# def record():
#     if request.method == "POST": # 音声受け取り
#         blob = request.files['xhr'].read()
#         print(blob)
#         f = open('test_audio2.wav', 'wb')
#         f.write(blob)
#         f.close()
#     else: # "GET"
#         return render_template("record.html")


# # @app.route('/upload', methods=["GET", "POST"])
# # def upload():
# #     # print("keys", list(request.files.keys()))
# #     if request.method == "POST":
# #         print('keys', request.files.keys())
# #         blob = request.files['audio'].read()
# #         print(blob)
        
# #         filename = 'test_audio1.wav'
# #         filepath = os.path.join(os.getcwd(), filename)
# #         f = open(filepath, 'wb')
# #         f.write(blob)
# #         f.close()
        
# #         n_channels = 1
# #         samplewidth = 1
# #         framerate = 8000
# #         n_frames = 100

# #         audio = wave.open(filepath, 'wb')
# #         audio.setnchannels(n_channels)
# #         audio.setsampwidth(samplewidth)
# #         audio.setframerate(framerate)
# #         audio.setnframes(n_frames)
# #         audio.writeframes(blob)
# #         audio.close()
# #     return redirect(url_for('record'))
    
#     # filename = 'test_audio.wav'
#     # filepath = os.path.join(os.getcwd(), filename)
#     # f = open(filepath, 'wb')
#     # f.write(blob)
#     # f.close()

# if __name__ == "__main__":
#  # webサーバーの立ち上
#     app.run(debug=True)

# # @application.route("/record")
# # def record():
# #     # if request.method == "POST":
# #     #     return redirect(url_for("upload"))
# #     # else: # "GET"
# #     return render_template("record.html")


# # @application.route("/upload", methods=["POST"])
# # def upload():
# #     if request.method == "POST":
# #         # print('files', request.files)
# #         # print('type', type(request.files))
# #         # print('\nkeysこれがキー', request.files.keys())
# #         # print('\nvalues', request.files.values())
# #         # return "success"
        
# #         # # BadRequestKeyError 'audio'
# #         blob = request.files['audio'].read()
# #         print('これがデータの中身\n', blob)
# #         filename = 'test_audio.wav'
# #         filepath = os.path.join(os.getcwd(), filename)
# #         f = open(filepath, 'wb')
# #         f.write(blob)
# #         f.close()
# #         return "success"

# #         n_channels = 1
# #         samplewidth = 1
# #         framerate = 8000
# #         n_frames = 100

# #         audio = wave.open(filepath, 'wb')
# #         audio.setnchannels(n_channels)
# #         audio.setsampwidth(samplewidth)
# #         audio.setframerate(framerate)
# #         audio.setnframes(n_frames)
# #         audio.writeframes(blob)
# #         audio.close()
# #     else: 
# #         return redirect(url_for("record"))
# #     # return redirect(url_for("record"))
# #     # return "Success"
	    
    

# # if __name__ == "__main__":
# #  # webサーバーの立ち上げ
# #     application.run(use_reloader=False, debug=True)
