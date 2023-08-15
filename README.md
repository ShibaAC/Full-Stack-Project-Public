# git clone 問題

## react 問題

1. 因 .gitignore 原因所以要取得依賴包
   ```
   npm i react-scripts
   ```

## laravel 問題

1. 因 .gitignore 原因所以要取得依賴包

   ```
   composer install
   ```

2. 複製【.env.example】名稱改為【.env】修改設定檔

   #### Linux

   ```
   cp .env.example .env
   ```

   #### Windows

   ```
   copy .env.example .env
   ```

3. 取得 APP_KEY 在終端機輸入
   ```
   php artisan key:generate
   ```

## ECPay 問題

1. 安裝 ECPay

   ```
   composer require ecpay/sdk
   ```

2. 假如報版本更新就

   ```
    composer update
   ```

3. 利用 Ngrok 進入 ECPay 測試網站
   [Ngrok 官網](https://ngrok.com/)

   在終端機輸入這段程式碼

   ```
      ngrok http http://127.0.0.1:8000/
   ```

   Laravel 的 server 記得開

   ```
    php artisan serve
   ```

   會回傳字串原始碼，前端想辦法渲染

   ### 卡號

   4311 9522 2222 2222

   ### 有效期限

   比當天日期大即可

   ### 安全碼

   222

## Storage 檔案儲存

先將有儲存到 storage/app 底下的檔案都 cope 一份到 public/files

## Module not found 錯誤

![messageImage_1690803651946](https://github.com/Jason999220/Full-Stack-Project/assets/36446806/0a0d253b-850e-4361-85f3-fbf54c8e9671)

上圖的錯誤，是因為其他組員使用 npm 安裝了新套件，但 pull 並不會在你本地 client/node_module 中一同安裝( gitignore 的關係)，所以需要於終端機在 client 資料夾路徑下輸入以下指令進行安裝

```
 npm install
```

修改 BUG
提案畫面尚未登入

韓文檢定

3000

讓我通過韓文考試

李大王

0917517442

我很會教高中生，非常有經驗。
