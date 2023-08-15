<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendEmail;
// use Mail;

class UserController extends Controller
{
    // 註冊
    public function signup(Request $request)
    {
        // return $request;
        // get 前端輸入的資訊
        $validatedData = $request->validate([
            'userName' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        // 轉成變數
        $userName = $validatedData['userName'];
        $email = $validatedData['email'];
        $password = $validatedData['password'];

        // Check if email already exists
        $emailExists = DB::select("SELECT COUNT(*) AS count FROM users WHERE email = ?", [$email])[0]->count;
        if ($emailExists) {
            return response()->json(['message' => 'Email has already registered', 'state' => '400']);
        }

        // 將使用者的密碼以安全的方式存儲在資料庫中
        $hashPassword = Hash::make($password);

        $result = DB::select("call signUp('$userName', '$email', '$hashPassword')");
        // return $result;
        return response()->json(['result' => $result, 'state' => '200']);
    }

    // 登錄
    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // 轉成變數
        $email = $validatedData['email'];
        $password = $validatedData['password'];
        // return DB::select("call getHashPassword(?)",[$email]);
        // get hash password
        if (!DB::select("call getHashPassword(?)",[$email])){
            return '帳號或密碼錯誤';
        }
        $hashPassword = DB::select("call getHashPassword(?)",[$email])[0]->hashpassword;
        // 假如密碼匹配成功就登入
        if (Hash::check($password, $hashPassword)){
            //2023/8/3 login改多回傳一個membershipLevel讓前端判斷是否為管理員
            $result = DB::select("CALL login('$email', '$hashPassword')");
            if ($result[0]->profilePhoto != null){
                $result[0]->profilePhoto = base64_encode(Storage::get($result[0]->profilePhoto));
            } else if ($result[0]->profilePhoto == null){
                $filename = 'upload/images.jpeg';
                // 更新使用者的個人頭像
                DB::select("UPDATE users SET profilePhoto = '$filename' WHERE email = '$email'");
                // 取回更新後的頭像資料
                $profilePhoto = DB::select("SELECT profilePhoto FROM users WHERE email = '$email'");
                $result[0]->profilePhoto = base64_encode(Storage::get($profilePhoto[0]->profilePhoto));
            }
            return $result;
        }else{
            return '帳號或密碼錯誤';
        }

//         // 查詢資料庫以獲取已雜湊的密碼
//         $user = DB::selectOne("SELECT hashpassword FROM users WHERE email = ?", [$email]);

//         if ($user) {
//             $hashPassword = $user->hashpassword;

//             // 使用 Hash::check 方法比對密碼
//             if (Hash::check($password, $hashPassword)) {
//                 $result = DB::select("CALL login(?, ?, @mytoken)", [$email, $password]);
//                 $tokenResult = DB::select("SELECT @mytoken AS token")[0]->token;
//                 if ($result[0]->result == '登入成功') {
//                     $response = [
//                         'result' => $result[0]->result,
//                         'token' => $tokenResult
//                     ];
//                 } else {
//                     $response = [
//                         'result' => $result[0]->result,
//                         'token' => null
//                     ];
//                 }
//                 return response($response, 201);
// >>>>>>> 02c247eb00d2f7d4304bcacdcaedec1bbdf90f07
//             } else {
//                 $response = [
//                     'result' => '帳號或密碼錯誤',
//                     'token' => null
//                 ];
//                 return response($response, 401);
//             }
//         } else {
//             $response = [
//                 'result' => '帳號不存在',
//                 'token' => null
//             ];
//             return response($response, 401);
//         }

    }


    // 登出
    public function logout(Request $request)
    {
        $token = $request->token;

        // 調用儲存過程
        $result = DB::select("CALL logout(?)", [$token]);

        // 獲取儲存結果資料
        // DB::select("SELECT @result AS result")[0]->result;

        return [
            'message' => $result
        ];
    }

    //比對token
    public function checkToken(Request $request)
    {
        $token = $request->token;
        $userID = $request->userID;
        // return substr($token, 1, -1);
        $dataBaseToken = DB::select('select token from users where userID = ?', [$userID])[0]->token;
        // return $dataBaseToken;
        if($token != '' && substr($token, 1, -1) == $dataBaseToken) {
            return '已登入';
        }else if($dataBaseToken == Null) {
            return '未登入';
        }else {
            DB::update('UPDATE users SET token = NULL WHERE userID = ?',[$userID]);
            return '請重新登入';
        }
    }

    //忘記密碼比對Email
    public function FoegetPwd(Request $request)
    {
        $stringNumber = '';
        for($i = 0; $i < 6; $i++){
            $stringNumber .= rand(0, 9);
        }
        $changeEmail = $request['changeEmail'];
        $emailCheck = DB::select('call emailCheck(?,?)', [$changeEmail, $stringNumber])[0]->result;
        // return $emailCheck;
        if ($emailCheck === 1){
            Mail::to($changeEmail)->send(new SendEmail($stringNumber));
            return 1;
        }else{
            return 0;
        }
    }

    //忘記密碼比對驗證碼
    public function verCodeCheck(Request $request)
    {
        $verCode = $request['verCode'];
        $verCodeCheck = DB::select('call verCodeCheck(?)', [$verCode])[0]->result;
        return $verCodeCheck;
    }

    //忘記密碼 重設密碼
    public function newPassword(Request $request)
    {
        $password = $request['password'];
        $verCode = $request['verCode'];
        $hashPassword = Hash::make($password);
        $newPassword = DB::select('call newPassword(?,?)',[$hashPassword, $verCode])[0]->result;
        return $newPassword;
    }

    //google登入
    public function googleLogin(Request $request)
    {
        // return $request;
        $userName = $request['userName'];
        $email = $request['email'];
        $photoURL = $request['photoURL'];
        $googleLogin = DB::select('call googleLogin(?,?,?)',[$userName, $email, $photoURL]);
        return $googleLogin;
    }
}
