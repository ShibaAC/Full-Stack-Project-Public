<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use ECPay_AllInOne;
use Ecpay\Sdk\Factories\Factory;
use Ecpay\Sdk\Services\UrlService;
use Ecpay\Sdk\Services\CheckMacValueService;
use Ecpay\Sdk\Response\VerifiedArrayResponse;


class PaymentController extends Controller
{

    // 只有計算 CheckMacValue 這個值之後附加到表單再送到綠界，送出之後的所有錯誤綠界都會清楚的回應
    public function checkout(Request $request)
    {
        /*
        $obj = new ECPay_AllInOne();

        // 服務參數
        $obj->ServiceURL = $request->input('ServiceURL');
        $obj->HashKey = $request->input('HashKey');
        $obj->HashIV = $request->input('HashIV');
        $obj->MerchantID = $request->input('MerchantID');

        // 設定訂單資料
        $obj->Send['MerchantTradeNo'] = $request->input('MerchantTradeNo');
        $obj->Send['MerchantTradeDate'] = $request->input('MerchantTradeDate');
        $obj->Send['PaymentType'] = $request->input('PaymentType');
        $obj->Send['TotalAmount'] = (int) $request->input('TotalAmount');
        $obj->Send['TradeDesc'] = $request->input('TradeDesc');
        $obj->Send['ReturnURL'] = $request->input('ReturnURL');
        $obj->Send['ChoosePayment'] = $request->input('ChoosePayment');
        $obj->Send['CreditInstallment'] = $request->input('CreditInstallment');

        // 訂單的商品資料
        $item = [
            'Name' => 'aaa',
            'Price' => 100,
            'Currency' => '元',
            'Quantity' => (int) '1',
        ];
        array_push($obj->Send['Items'], $item);

        // 產生訂單(auto submit至ECPay)
        $Response = $obj->CheckOutString();

        return view('checkout', ['response' => $Response]);
        */

        // ECPay 預設資料
        $factory = new Factory([
            'hashKey' => '5294y06JbISpM5x9',
            'hashIv' => 'v77hoKGq4kWxNNIS',
        ]);
        $autoSubmitFormService = $factory->create('AutoSubmitFormWithCmvService');
        // ECPay 所需參數
        $input = [
            // 'MerchantID' => $request['MerchantID'],
            'MerchantID' => 2000132, // 特店編號
            'MerchantTradeNo' => $request['MerchantTradeNo'].time(), // 訂單編號
            // 'MerchantTradeNo' => $request['MerchantTradeNo'], // 訂單編號
            'MerchantTradeDate' => date('Y/m/d H:i:s'), // 交易時間
            'PaymentType' => 'aio', // 交易類型
            'TotalAmount' => $request['TotalAmount'], // 訂單總金額
            'TradeDesc' => UrlService::ecpayUrlEncode($request['TradeDesc']), // 訂單描述
            'ItemName' => $request['ItemName'], // 訂單名稱
            'ChoosePayment' => 'Credit', // 付款方式(信用卡)
            // CheckMacValue
            'EncryptType' => 1, // CheckMacValue加密類型，固定填入1，使用SHA256加密
            // 請勿設定與Client端接收付款結果網址OrderResultURL相同位置，避免程式判斷錯誤。
            'ReturnURL' => 'https://02e3-2401-e180-8991-1968-ecaf-e0fb-d793-fa42.ngrok-free.app/index.php/callback', // 付款完成通知回傳網址
            'ClientBackURL' => 'http://localhost:3000/caseview/'.$request['caseID'], // 消費者點選此按鈕後，會將頁面導回到此設定的網址
            //'OrderResultURL' => 'https://08b2-118-163-218-100.ngrok-free.app/GetEcpayResult', // Client端回傳付款結果網址，綠界會將付款結果參數以POST方式回傳到到該網址
            // 'OrderResultURL' => 'https://ebb3-118-163-218-100.ngrok-free.app/index.php/api/payment/callback', // Client端回傳付款結果網址，綠界會將付款結果參數以POST方式回傳到到該網址
            // 付款結果 https://developers.ecpay.com.tw/?p=2878
        ];
        // return $input;
        // 綠界測試用網址
        $action = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5';
        // 綠界正式用網址
        // $action = 'https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5';
        return $autoSubmitFormService->generate($input, $action);
    }

    public function collaboration(Request $request)
    {
        $factory = new Factory([
            'hashKey' => '5294y06JbISpM5x9',
            'hashIv' => 'v77hoKGq4kWxNNIS',
        ]);
        $autoSubmitFormService = $factory->create('AutoSubmitFormWithCmvService');
        // ECPay 所需參數
        $input = [
            'MerchantID' => 2000132, // 特店編號
            'MerchantTradeNo' => $request['MerchantTradeNo'].time(), // 訂單編號
            'MerchantTradeDate' => date('Y/m/d H:i:s'), // 交易時間
            'PaymentType' => 'aio', // 交易類型
            'TotalAmount' => $request['TotalAmount'], // 訂單總金額
            'TradeDesc' => UrlService::ecpayUrlEncode($request['TradeDesc']), // 訂單描述
            'ItemName' => $request['ItemName'], // 訂單名稱
            'ChoosePayment' => 'Credit', // 付款方式(信用卡)
            'EncryptType' => 1, // CheckMacValue加密類型，固定填入1，使用SHA256加密
            'ReturnURL' => 'https://29ba-118-163-218-100.ngrok-free.app/index.php/callback', // 付款完成通知回傳網址
            // 'ClientBackURL' => 'http://localhost:3000/caseview/'.$request['bidderID'], // 消費者點選此按鈕後，會將頁面導回到此設定的網址
            'ClientBackURL' => 'http://localhost:3000/', // 消費者點選此按鈕後，會將頁面導回到此設定的網址
        ];
        // return $input;
        // 綠界測試用網址
        $action = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5';
        // 綠界正式用網址
        // $action = 'https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5';
        return $autoSubmitFormService->generate($input, $action);
    }


    public function callback(Request $request)
    {
        // 請參考 example/Payment/GetCheckoutResponse.php 範例開發
        $postData = $request->all();
        $string = print_r($postData, true);
        file_put_contents('/tmp/ECPay.txt', $string, FILE_APPEND);

    //     define('ECPay_MerchantID', '2000132');
    //     define('ECPay_HashKey', '5294y06JbISpM5x9');
    //     define('ECPay_HashIV', 'v77hoKGq4kWxNNIS');

    //     // 重新整理回傳參數。
    //     $arParameters = $postData;
    //     $arFeedback = [];
    //     foreach ($arParameters as $key => $value) {
    //         if ($key != 'CheckMacValue') {
    //             if ($key == 'PaymentType') {
    //                 $value = str_replace('_CVS', '', $value);
    //                 $value = str_replace('_BARCODE', '', $value);
    //                 $value = str_replace('_CreditCard', '', $value);
    //             }
    //             if ($key == 'PeriodType') {
    //                 $value = str_replace('Y', 'Year', $value);
    //                 $value = str_replace('M', 'Month', $value);
    //                 $value = str_replace('D', 'Day', $value);
    //             }
    //             $arFeedback[$key] = $value;
    //         }
    //     }

    //     // 計算出 CheckMacValue
    //     $CheckMacValue = ECPay_CheckMacValue::generate($arParameters, ECPay_HashKey, ECPay_HashIV);

        // 必須要支付成功並且驗證碼正確
        // if ($postData['RtnCode'] == '1' && $CheckMacValue == $postData['CheckMacValue']) {
        //     // 要處理的程式放在這裡，例如將線上服務啟用、更新訂單資料庫付款資訊等
        // }

    //     // 回應綠界
    //     return response('1|OK');
    }
}
