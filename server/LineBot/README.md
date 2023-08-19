建立虛擬環境
python3 -m venv myenv

切換到虛擬環境

source myenv/bin/activate

安裝 fkask , numpy , line-bot-sdk , pymysql

pip3 install flask
pip3 install numpy
pip3 install line-bot-sdk
pip3 install pymysql

檢查有沒有安裝了

pip3 list
或者
pip show 套件名稱

＃＃＃記得每次測試都要先去 webhook 更新，然後 python3 linebot.py 再去 ngrok http 5000
