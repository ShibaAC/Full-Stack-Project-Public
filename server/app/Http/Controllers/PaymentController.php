<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function payByECPay(Order $order)
{
    // 判斷訂單是否屬於當前用戶
    $this->authorize('own', $order);
    // 訂單已支付或關閉
    if ($order->paid_at || $order->closed) {
        throw new InvalidRequestException('訂單狀態錯誤');
    }

    // 調用綠界的網頁支付
    try {
        $obj = new \ECPay_AllInOne();
       
        //服務參數
        $obj->ServiceURL  = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";   //服務位置
        $obj->HashKey     = '5294y06JbISpM5x9';                                            //測試用Hashkey，請自行帶入ECPay提供的HashKey，可存放至 .env 變數中
        $obj->HashIV      = 'v77hoKGq4kWxNNIS';                                            //測試用HashIV，請自行帶入ECPay提供的HashIV，可存放至 .env 變數中
        $obj->MerchantID  = '2000132';                                                     //測試用MerchantID，請自行帶入ECPay提供的MerchantID，可存放至 .env 變數中
        $obj->EncryptType = '1';                                                           //CheckMacValue加密類型，請固定填入1，使用SHA256加密
    
    
        //基本參數(請依系統規劃自行調整)
        $MerchantTradeNo = $order->no;
        $obj->Send['ReturnURL']         = "https://shop.mrhanji.com/callback";      //消費者付款完成後，綠界科技會以 Server POST (背景接收)方式傳送付款結果參數到商家的Server
        $obj->Send['ClientBackURL']     = "https://shop.mrhanji.com/success";       //若使用Server端接收參數，付款完成、取號完成頁面上會出現「返回商店」按鈕 ，用來返回您的商店網站的
        $obj->Send['MerchantTradeNo']   = $MerchantTradeNo;                         //訂單編號
        $obj->Send['MerchantTradeDate'] = date('Y/m/d H:i:s');                      //交易時間
        $obj->Send['TotalAmount']       = $order->total_amount;                     //交易金額
        $obj->Send['TradeDesc']         = "good to drink";                          //交易描述
        $obj->Send['ChoosePayment']     = ECPayMethod::Credit;                      //付款方式:Credit
        $obj->Send['IgnorePayment']     = ECPayMethod::GooglePay;                   //不使用付款方式:GooglePay
    
        //訂單的商品資料
        foreach ($order->items as $item) {
            array_push($obj->Send['Items'], array('Name' => $item->product->title, 'Price' => (int)$item->price, 'Currency' => "元", 'Quantity' => $item->amount, 'URL' => "dedwed"));
        }

        //產生訂單(auto submit至ECPay)
        $obj->CheckOut();

    } catch (Exception $e) {
        echo $e->getMessage();
    }
}
}

