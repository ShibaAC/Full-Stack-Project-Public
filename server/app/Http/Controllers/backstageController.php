<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
////lineBot用
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;




class backstageController extends Controller
    {
        public function rootCheckUser(Request $request)
        {
            $page = $request['page'];
            $results = DB::select('CALL rootCheckAllUser(? , null)' , [$page]);
            return response()->json($results);
        }
        public function rootCheckCase(Request $request)
        {
            $page = $request['page'];
            // return $request;
            $results = DB::select('CALL rootCheckAllCase(? , null)' , [$page]);
            return response()->json($results);
        }
        public function rootDelCase(Request $request)
        {
            $caseID = $request['caseID'];
            $results = DB::select('CALL rootDelCase(?)' , [$caseID]);
            return response()->json($results);
        }

        public function rootCasePage(Request $request)
        {
            $results = DB::select('CALL rootCasePage()');
            return response()->json($results);
        }

        public function searchUser(Request $request)
    {
        $keyword = $request->input('keyword');
        return $keyword;
        $results = DB::select('CALL rootCheckAllUser(? , ?)' , [$page , $keyword]);

        return response()->json($results);
    }

    public function searchCase(Request $request)
    {
        $keyword = $request->input('keyword');
        return $keyword;
        $results = DB::select('CALL rootCheckAllUser(? , ?)' , [$page , $keyword]);

        return response()->json($results);
    }


    ///傳入functionName 設好路徑之後叫laravel執行CLI指令
    public function callLineBot($functionName, Request $request) {
        $caseName = $request->input('caseName'); // 抓輸入的caseName
        $lineID = $request->input('lineID');
        // return $caseName;
        // 假設虛擬環境的路徑以及 LineBot.py 的路徑
        $virtualEnvPath = "/Applications/XAMPP/xamppfiles/htdocs/Full-Stack-Project/myenv/bin/activate";
        $lineBotScriptPath = "/Applications/XAMPP/xamppfiles/htdocs/Full-Stack-Project/server/LineBot/LineBot.py";
        // 切換到虛擬環境並執行 LineBot.py 並傳遞命令行參數 然後指定要執行的函數 要帶給函數的參數
        $command = "source $virtualEnvPath && python3 $lineBotScriptPath $functionName $caseName $lineID";
        // return $command;
        //執行CLI指令
        $pythonResult = shell_exec($command);
        return response()->json(['result' => $pythonResult]);
    }
}
