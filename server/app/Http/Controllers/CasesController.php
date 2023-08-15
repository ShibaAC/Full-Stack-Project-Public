<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;



class CasesController extends Controller
{
    // 提案
    public function insertCase(Request $request)
    {
        $caseID = (int)$request['caseID'];
        $userID = (int)$request['userID'];
        $name = $request['name'];
        $category = $request['category'];
        $subCategory = $request['subCategory'];
        $budget = (int)$request['budget'];
        $deadline = $request['deadline'];
        $city = $request['city'];
        $subCity = $request['subCity'];
        $description = $request['description'];
        $contactName = $request['contactName'];
        $contactAble = (int)$request['contactAble'];
        $contactPhone = $request['contactPhone'];
        $contactTime = $request['contactTime'];
        $status = $request['status'];
        $Files = $request->file('allFiles');
        $allFileName = '';
    
        if ($Files !== null) {
            foreach ($Files as $file) {
                $fileName = $file->getClientOriginalName();
                $newFileName = time() . '_' . $fileName;
                $fileContents = file_get_contents($file);
                
                Storage::disk('s3')->put($newFileName, $fileContents, 'public');
                
                $fileUrl = Storage::disk('s3')->url($newFileName);
                
                $allFileUrls[] = $fileUrl;
            }
        }
    
        try {
            $results = DB::select("CALL addMyCase(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                $caseID, $userID, $name, $category, $subCategory, $budget, $deadline, $city, $subCity, 
                $description, $contactName, $contactAble, $contactPhone, $contactTime, $status, implode(',', $allFileUrls)
            ]);
            
            return $results;
        } catch (\Exception $e) {
            return response()->json(['result' => '插入案件失败']);
        }
    }

    // 獲取母、子類別
    public function getCategorys()
    {
        $results = DB::select('CALL caseListBigClass()');
        return response()->json($results);
    }
    public function getSubCategorys()
    {
        $results = DB::select('CALL caseClass()');
        return response()->json($results);
    }

    // 獲得母、子地區
    public function getCitys()
    {
        $results = DB::select('CALL caseListCity()');
        return $results;
    }
    public function getSubCitys()
    {
        $results = DB::select('CALL caseDistrict()');
        return $results;
    }


    // 搜尋並返回特定條件的案例
    public function getCases(Request $request)
    {
        $bigClassID = $request->input('bigClassID');
        $classID = $request->input('classID');
        $cityID = $request->input('cityID');
        $districtID = $request->input('districtID');
        $page = $request->input('page');
        $results = DB::select('CALL caseFilter(?,?,?,?,?)', [$bigClassID,$classID,$cityID,$districtID,$page]);
        // return $results;
        $filesName = [];
        // 取出每個物件的 files 欄位資料
        for($i = 0; $i < count($results); $i++) {
            array_push($filesName, $results[$i]->image);
        };
        // return $filesName;
        // 將其字串變為陣列
        for($i = 0; $i < count($filesName); $i++) {
            $filesName[$i] = explode(',', $filesName[$i]);
        };
        // 取得第一個的【jpg】||【jpeg】檔，否則為null
        $newFileArray=[];
        for($i = 0; $i < count($filesName); $i++) {
            // 假如一筆以上的資料，判斷有無【jpg】||【jpeg】檔
            if(count($filesName[$i]) > 1){
                for($j = 0; $j < count($filesName[$i]); $j++) {
                    if(strpos($filesName[$i][$j],'jpg')  !== false|| strpos($filesName[$i][$j],'jpeg')  !== false ){
                        array_push($newFileArray,$filesName[$i][$j]);
                        if(count($newFileArray) === 1){
                            break;
                        }
                    }
                }
                if(count($newFileArray) === 0){
                    array_push($newFileArray,null);
                }
            }

            // 只有一筆資料，判斷有無【jpg】||【jpeg】檔
            if(count($filesName[$i]) === 1){
                if(strpos($filesName[$i][0],'jpg')  !== false|| strpos($filesName[$i][0],'jpeg')  !== false){
                    // array_push($newFileArray,true);
                    array_push($newFileArray,$filesName[$i][0]);
                }else{
                    array_push($newFileArray,null);
                }
            }
        };
        // $filesObject = [];
        // for($i = 0; $i < count($newFileArray); $i++) {
        //     if($newFileArray[$i] === null ){
        //         $results[$i]->image = null;
        //     }else{
        //         // $results[$i]->image = base64_encode(Storage::get($newFileArray[$i]));// 一串長得很奇怪的亂碼
        //         $results[$i]->image = base64_encode(Storage::get($newFileArray[$i]));// 一串長得很奇怪的亂碼
        //         // array_push($filesObject,  $file); // 原本是想另外修改再丟到前端
        //     }
        //     return $results;
        // }
        for($i = 0; $i < count($newFileArray); $i++) {
            if($newFileArray[$i] === null ){
                // array_push($filesObject,  null);
                $results[$i]->image = null;
            }else{
                if(base64_encode(Storage::get($newFileArray[$i]))===''){
                    $file = null;
                }else{
                    $file = base64_encode(Storage::get($newFileArray[$i]));// 一串長得很奇怪的亂碼
                }
                // array_push($filesObject,  $file); // 原本是想另外修改再丟到前端
                $results[$i]->image = $file; // 直接修改 資料庫回傳的資料
            }
        }
        return $results;

    }

    // 取得當前被點擊案件資訊
    public function getCaseInfo(Request $request)
    {
        $caseID =  (int)$request['caseID'];
        $userID =  (int)$request['userID'];

        $results = DB::select('CALL enterCase(?,?)',[$caseID, $userID]);
        // return $results;
        // 處理檔案編碼
        $results[0]->image = explode(',', $results[0]->image);
        for($i = 0; $i < count($results[0]->image); $i++){
            $results[0]->image[$i] = base64_encode(Storage::get($results[0]->image[$i]));
        }
        // 處理頭像編碼
        $results[0]->profilePhoto = base64_encode(Storage::get($results[0]->profilePhoto));
        return $results;
    }

    // 取得當前被點擊案件的類似案件
    public function getSimilarCase(Request $request)
    {
        $currentCaseId =  $request['currentCaseId'];
        $currentUserId =  $request['currentUserId'];
        // return $classID;
        $results = DB::select('CALL similarCase(?,?)',[$currentCaseId,$currentUserId]);
        return $results;
    }

    // 新增報價人員
    public function newBidder(Request $request)
    {
        $caseID =  (int)$request['caseID'];
        $userID =  (int)$request['userID'];
        $quotation =  (int)$request['quotation'];
        $win =  $request['win']; // 前端為甚麼要傳這個，還有tinyint 是甚麼型別
        $selfRecommended =  $request['selfRecommended'];
        $results = DB::select('CALL newBidder(?,?,?,?,?)',[$caseID,$userID,$quotation,$win,$selfRecommended]);
        return $results;
    }

    // 取得當前被點擊案件的報價人員
    public function getBidder(Request $request)
    {
        $caseID =  (int)$request['caseID'];
        $results = DB::select('CALL getBidder(?)',[$caseID]);
        return $results;
    }

    // 取得當前被點擊案件的報價人員
    public function addCollection(Request $request)
    {
        $caseID =  (int)$request['caseID'];
        $userID =  (int)$request['userID'];
        $results = DB::select('CALL createCollection(?,?)',[$userID,$caseID]);
        return $results;
    }

    // 進到我的收藏
    public function collectionList(Request $request)
    {
        // return '123';
        $page = $request['page'];
        // $pagehead = ($page - 1) * 30;
        $myuserID = $request['userID'];
        // 呼叫存儲過程執行 SQL 查詢
        $results = DB::select('CALL enterCollection(?, ?)', [$myuserID, $page]);

        return response()->json($results);
    }



    // 收藏案件icon
    public function createCollection(Request $request) {
        $myuserID = $request['userID'];
        $mycaseID = $request['caseID'];
        
        $results = DB::select('CALL createCollection(?, ?)', [$myuserID, $mycaseID]);

        return response()->json($results);
    }

}




//3  image: "proposalFiles/Logo.png"
//3  "proposalFiles/Logo.png"

//11  image: "proposalFiles/Jason履歷.pdf,proposalFiles/S__19955786.jpg"


// 10 "\"proposalFiles/S__19955786.jpg\""