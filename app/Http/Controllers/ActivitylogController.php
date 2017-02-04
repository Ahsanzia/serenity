<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Http\Requests;
use Hash;
use Input;
use Validator;
use App\activitylog;

class ActivitylogController extends Controller
{


    public function postProfile()
    {
        $client = activitylog::create([
            'narration' => Input::get('narration'),
            'reminder_date' => Input::get('reminder_date'),
            'companiesid' => Input::get('companiesid')
        ]);

        return response()->success(compact('client'));
    }
    public function putTaskShow(Request $request)
    {
        $caseForm = Input::get('data');
        $caseId = intval($caseForm["id"]);
        $caseData = [
            'director'=>$request->input('director'),
            'manager'=>$request->input('manager'),
            's_admin'=>$request->input('s_admin'),
            'admin'=>$request->input('admin'),
            'asst_admin'=>$request->input('asst_admin'),
            'j_admin'=>$request->input('j_admin'),
            'narration'=>$request->input('narration'),
            'explanation'=>$request->input('explanation'),
            'justification'=>$request->input('justification'),
            'is_done'=>$request->input('is_done'),
        ];
        $affectedRows = activitylog::where('id', '=', $caseId)->update($caseData);
        return response()->success('success');
    }
    public function getCompany(Request $request)
    {
        $id = $request->input('id');
        $company = activitylog::where('companiesid', '=', $id)->get();

        return response()->success(compact('company'));
    }
    public function getTaskShow($id)
    {
        $tasks = activitylog::find($id);
        return response()->success($tasks);
    }


    public function getTaskp(Request $request)
    {

          $companyid = $request->input('id');
        $taskp = activitylog::where([
          ['companiesid', 'like', $companyid],
          ['is_done', '=', 0],
      ])->get();
      return response()->success(compact('taskp'));
    }
    public function getTaskc(Request $request)
    {

        $companyid = $request->input('id');
        $taskc = activitylog::where([
            ['companiesid', 'like', $companyid],
            ['is_done', '=', 1],
        ])->get();
        return response()->success(compact('taskc'));
    }
    //
    //
    //  public function getfinishedtasks(Request $request)
    // {

    //  $companyid = $request->input('id');
    //  $companyclients = activitylog::where([
    //      ['companyid', '=', $companyid],
    //      ['is_done', '=', 1],
    //  ])->get();
    //  return response()->success(compact('companyclients'));
    // }

}
