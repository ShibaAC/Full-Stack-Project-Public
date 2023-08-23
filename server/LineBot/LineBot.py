from flask import Flask, request, abort
import re
from linebot import (
    LineBotApi
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    TextSendMessage,
    MessageEvent,
    TextMessage
)
from linebot.v3.webhook import WebhookHandler  # 修改這行，引入新版的 WebhookHandler
import os
import numpy as np
import random
import string
import pymysql
from linebot.v3.messaging import MessagingApi
import sys
import json

app = Flask(__name__)

# Channel Access Token
line_bot_api = LineBotApi(
    'vwlc6bKS2GMaHhUPrTQnykqRA6S6yBcmOem9NIHxosYclcKCKHrLJV6Pgz8ae8xD1ViEzm9dqRRoMuwp6PrIDPfnatJCxErdjW05EAUT3rerRbNKgTGf32l3NOooo7kEQJRN5U3oMlTADpoA2e7iaQdB04t89/1O/w1cDnyilFU=')
# Channel Secret
handler = WebhookHandler('6f1f732c7f3ee458fa277d7aa795cb73')


def delcase(lineID, caseName=None):  # 接收 caseName 参数
    if caseName:
        # 如果{caseName}內要帶值的話 要在前面加一個f讓他變成 f-string才可以用
        response_message = f'您的案件：{caseName} 已被下架，請上線確認是否違反使用者條款'
    else:
        response_message = 'Hello from delcase function!'

    line_bot_api.push_message(
        lineID, TextSendMessage(text=response_message))


def newBidder():
    if caseName:
        # 如果{caseName}內要帶值的話 要在前面加一個f讓他變成 f-string才可以用
        response_message = f'有新的專家對您的案件：『 {caseName} 』報價囉！趕快上線確認看看吧！'
    else:
        response_message = 'Hello from delcase function!'

    line_bot_api.push_message(
        lineID, TextSendMessage(text=response_message))


def caseStep(lineID, caseName, completedSteps, totalSteps):
    if caseName:
        # 如果{caseName}內要帶值的話 要在前面加一個f讓他變成 f-string才可以用
        response_message = f'您的案件：『 {caseName} 』有新進度囉！\n已完成進度 ( {completedSteps} / {totalSteps} ) 趕快上線確認看看吧！'
    else:
        response_message = 'Hello from delcase function!'

    line_bot_api.push_message(
        lineID, TextSendMessage(text=response_message))


# 使用 sys.argv 取得命令行參數有幾個
if len(sys.argv) < 2:
    response = {"error": "Usage: python LineBot.py function_name"}
else:
    # 收到的第一個設為function_name
    function_name = sys.argv[1]
    # 收到的第二個設為caseName
    caseName = sys.argv[2]
    # 第三個設lineID
    lineID = sys.argv[3]
    completedSteps = sys.argv[4]
    totalSteps = sys.argv[5]

    # 用function_name判定要叫哪個function
    if function_name == "delcase":
        response = delcase(lineID, caseName)
    elif function_name == "newBidder":
        response = newBidder()
    elif function_name == "caseStep":
        response = caseStep(lineID, caseName, completedSteps, totalSteps)
    else:
        response = {"error": "Unknown function: " + function_name}

# 輸出 JSON 格式的響應
print(json.dumps(response))
#####
#
#
#
#
#
# ###########################################################
# # 傳送'Hello World!'給管理人
# line_bot_api.push_message(
#     'U88a482f7e2856f75158f420fd4493d76', TextSendMessage(text='Hello World!'))

# # 連接資料庫


# # 連接資料庫
# conn = pymysql.connect(
#     host='127.0.0.1',  # 資料庫主機位址
#     user='root',       # 資料庫使用者名稱
#     password='',   # 資料庫使用者密碼
#     db='database',    # 資料庫名稱
#     port=33306
# )

# if conn:
#     print("資料庫連線成功")
# else:
#     print("無法連線至資料庫")
# cursor = conn.cursor()  # 啟用資料庫

# # 宣告全域變數 # 方便執行跨function的流程控制及資料傳遞
# serial = [0, 1]  # serial[0]為流水號 serial[1]為筆目

# # 監聽所有來自 /callback 的 Post Request


# @app.route("/callback", methods=['POST'])
# def callback():
#     # get X-Line-Signature header value
#     signature = request.headers['X-Line-Signature']
#     # get request body as text
#     body = request.get_data(as_text=True)
#     app.logger.info("Request body: " + body)
#     # handle webhook body
#     try:
#         handler.handle(body, signature)
#     except InvalidSignatureError:
#         abort(400)
#     return 'OK'


# def BBB():
#     userID = 'U88a482f7e2856f75158f420fd4493d76'

#     # 要推送的訊息
#     message = TextSendMessage(text='Hello, this is a test message!')

#     # 呼叫 push_message 函式推送訊息給使用者
#     line_bot_api.push_message(userID, message)


# @app.route("/BBB", methods=['GET'])
# def trigger_BBB():
#     BBB()
#     return "BBB function triggered."

# # ... 其他 Flask 相關程式碼 ...


if __name__ == "__main__":
    app.run()
    app.run(host='0.0.0.0', port=5000)
