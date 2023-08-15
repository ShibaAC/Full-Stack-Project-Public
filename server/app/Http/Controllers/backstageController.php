<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class backstageController extends Controller
    {
        public function rootCheckUser(Request $request)
        {
            $page = $request['page'];
            $results = DB::select('CALL rootCheckAllUser(?)' , [$page]);
            return response()->json($results);
        }
        public function rootCheckCase(Request $request)
        {
            $page = $request['page'];
            // return $request;
            $results = DB::select('CALL rootCheckAllCase(?)' , [$page]);
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
}
