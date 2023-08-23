<?php
// 引入所有 Controller
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// 處理登入、註冊、登出
Route::post('/auth/signup', [UserController::class, 'signup']);
Route::post('/auth/login', [UserController::class, 'login']);
Route::post('/auth/logout', [UserController::class, 'logout']);
//進入前比對token
Route::post('checktoken',[UserController::class, 'checkToken']);


//InformationController
// prefix是前綴，域名/api/upload-photo
// Route::group(['prefix' => 'api'], function () {
// 上傳圖片
// Route::post('uploadphoto', [InformationController::class, 'uploadPhoto']);
Route::post('update-user/{myUserName}/{myUserID}', [InformationController::class, 'updateUser']);
Route::post('update-phone', [InformationController::class, 'updatePhone']);
Route::post('update-email/{myuserID}/{myemail}', [InformationController::class, 'updateEmail']);
Route::post('update-portfolio/{myuserID}/{myportfolio}', [InformationController::class, 'updatePortfolio']);
//修改學經歷
Route::post('update-education', [InformationController::class, 'updateExperience']);
//修改作品集
Route::post('update-portfolio', [InformationController::class, 'updatePortfolio']);
//顯示作品集

//修改擅長工具
Route::post('update-skills', [InformationController::class, 'updateSkills']);
//修改自傳
Route::post('update-SelfIntroduction', [InformationController::class, 'updateSelfIntroduction']);
//提案進度條
Route::get('enterCaseStepClient', [InformationController::class, 'enterCaseStepClient']);
//接案進度條
Route::get('enterCaseStepBidder', [InformationController::class, 'enterCaseStepBidder']);
//點擊進度條的完成
Route::post('stepConfirm', [InformationController::class, 'stepConfirm']);
// 案件確認呼叫linebot
Route::get('/caseStepConfirmCallLine/{functionName}', [InformationController::class, 'callLineBot']);

//修改密碼
Route::post('checkoldpassword', [InformationController::class, 'checkOldPassword']);
// 軟新增
Route::get('enterprofile/{token}',[InformationController::class, 'enterProfile']);
// Route::post('upload-photo', [InformationController::class, 'uploadPhoto']);
Route::post('update-user/{myUserID}/{myUserName}', [InformationController::class, 'updateUser']);


// 上傳頭像
Route::post('/upload-photo', 'App\Http\Controllers\InformationController@uploadPhoto');

Route::get('/user/{userID}', 'InformationController@uploadPhoto');

// 顯示頭像
Route::get('/show-photo/{userID}', 'App\Http\Controllers\InformationController@showPhoto');
// 更新頭像
Route::put('/update-photo/{userID}', 'App\Http\Controllers\InformationController@updatePhoto');


// 個人中心
Route::get('/getProposeCase', [InformationController::class, 'getProposeCase']); // 提案紀錄
Route::get('/getBidderCase', [InformationController::class, 'getBidderCase']);  // 接案紀錄
Route::get('/deleteCase', [InformationController::class, 'deleteCase']);  // 刪除案件
Route::get('/cancelCase', [InformationController::class, 'cancelCase']);  // 下架案件
Route::get('/caseRevise', [InformationController::class, 'caseRevise']);  // 修改案件
Route::get('/checkProfile', [InformationController::class, 'checkProfile']);  // 案主查看資訊


// 新增案件、取的案件、地區篩選、類別篩選
Route::post('cases/addCase', [CasesController::class, 'insertCase']); // 新增案件
Route::post('cases', [CasesController::class, 'getCases']); // 取得所有案件
Route::get('cases/getCitys', [CasesController::class, 'getCitys']); // 取得母地區
Route::get('cases/getSubCitys', [CasesController::class, 'getSubCitys']); // 取得子地區
Route::get('cases/getCategorys', [CasesController::class, 'getCategorys']); // 取得母類別
Route::get('cases/getSubCategorys', [CasesController::class, 'getSubCategorys']); // 取得子類別
Route::get('cases/getCaseInfo', [CasesController::class, 'getCaseInfo']); // 取得當前被點擊案件資訊
Route::get('cases/getSimilarCase', [CasesController::class, 'getSimilarCase']); // 取得當前被點擊案件的類似案件
Route::get('cases/getBidder', [CasesController::class, 'getBidder']); // 取得當前被點擊案件的報價人員
Route::post('cases/newBidder', [CasesController::class, 'newBidder']); // 新增報價人員
Route::get('/cases/newBidderCallLine/{functionName}', [CasesController::class, 'newBidderCallLine']); //
Route::post('cases/addCollection', [CasesController::class, 'addCollection']); // 收藏案件

// 聊天室
Route::get('chat/getMessage', [ChatController::class, 'getMessage']); // 獲得當前被點擊【聊聊】的使用者訊息
Route::get('chat/getChatOtherUser', [ChatController::class, 'getChatOtherUser']); // 獲得其他曾經聊過的使用者
Route::post('chat/sendMessage', [ChatController::class, 'sendMessage']); // 發送訊息

// 排程 API
Route::post('scheme/newCaseStep', [SchemeController::class, 'newCaseStep']); // 發送訊息


// ECPay
Route::post('/payment/pay', [PaymentController::class, 'checkout']); // 將資料送給 ECPay
Route::post('/payment/collaboration', [PaymentController::class, 'collaboration']); //* 合作
Route::post('/payment/callback', [PaymentController::class, 'callback']); // 取得 ECPay 的回傳資料

//後台
Route::get('backstage/alluser', [backstageController::class, 'rootCheckUser']); //去backstageController叫function rootCheckUserphp
Route::get('backstage/allcase', [backstageController::class, 'rootCheckCase']); 
Route::post('backstage/deluser', [backstageController::class, '']);//ban使用者
Route::post('backstage/delcase', [backstageController::class, 'rootDelCase']);//下架案件
// Route::get('backstage/allcase', [backstageController::class, 'rootCheckCase']); 
Route::get('backstage/CasePage', [backstageController::class, 'rootCasePage']);//取案件頁數
Route::get('backstage/searchUser', [backstageController::class, 'searchUser']);//
Route::get('backstage/searchCase', [backstageController::class, 'searchCase']);//
//後台的lineBot function傳名字過去就好不用再加{}
Route::get('backstage/callLineBot/{functionName}', [backstageController::class, 'callLineBot']);


//忘記密碼
Route::get('Forgetpwd', [UserController::class, 'FoegetPwd']);

//忘記密碼驗證碼
Route::get('verCodeCheck', [UserController::class, 'verCodeCheck']);

//重設密碼
Route::get('newPassword', [UserController::class, 'newPassword']);

//google登入
Route::post('googleLogin',[UserController::class, 'googleLogin']);



// 進入我的收藏
Route::post('/enterFavorite', [CasesController::class, 'collectionList']);
// icon收藏狀態
Route::post('/collectionState', [CasesController::class, 'createCollection']);
