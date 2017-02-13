<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Http\Requests;
use Hash;
use Input;
use Validator;
use App\activitylog;
use App\Casecost;

class ActivitylogController extends Controller
{
    public function postProfile()
    {
        $client = activitylog::create([
            'narration' => Input::get('narration'),
            'reminder_date' => Input::get('reminder_date'),
            'companiesid' => Input::get('companiesid'),
            'is_done' => "0",
             
        ]);

        return response()->success(compact('client'));
    }
    public function putTaskShow(Request $request)
    {
          $clientForm = array_dot(
            app('request')->only(
                'data.director',
                'data.manager',
                'data.s_admin',
                'data.admin',
                'data.asst_admin',
                'data.j_admin',
                'data.explanation',
                'data.justification',
                'data.is_done',
                'data.cassification_id',
                'data.cbilled',
                'data.capproved',
                'data.id'           
            )
        );
        $clientid = intval($clientForm['data.id']);
        $latestcost = Casecost::where('active', '=', 1)->take(1)->get();
        if ($latestcost === null) {
                $latestcost[0]->director=1;
                $latestcost[0]->manager=1;
                $latestcost[0]->s_admin=1;
                $latestcost[0]->admin=1;
                $latestcost[0]->asst_admin=1;
                $latestcost[0]->j_admin=1;
        } 
        $cientdata = [
            'director' => $clientForm['data.director'],
            'manager' => $clientForm['data.manager'],
            's_admin' => $clientForm['data.s_admin'],
            'admin' => $clientForm['data.admin'],
            'asst_admin' => $clientForm['data.asst_admin'],
            'j_admin' => $clientForm['data.j_admin'],
            'explanation' => $clientForm['data.explanation'],
            'justification' => $clientForm['data.justification'],
            'cassification_id' => $clientForm['data.cassification_id'],
            'is_done' => $clientForm['data.is_done'],
            'capproved' => $clientForm['data.capproved'],
            'cbilled' => $clientForm['data.cbilled'],
            'director_c' => $latestcost[0]->director,
            'manager_c' => $latestcost[0]->manager,
            's_admin_c' => $latestcost[0]->s_admin,
            'admin_c' => $latestcost[0]->admin,
            'asst_admin_c' =>$latestcost[0]->asst_admin,
            'j_admin_c' => $latestcost[0]->j_admin
        ];
        $affectedRows = activitylog::where('id', '=', $clientid)->update($cientdata);
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
          ['companiesid', '=', $companyid],
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
    public function getTaskpt()
    {
        $taskpt = activitylog::join('companies', 'companies.id', '=', 'activitylogs.companiesid')->where([
          ['is_done', '=', 0],
          ['reminder_date', '<=', date('Y-m-d')],
      ])->select('activitylogs.*','companies.name')->get();
      return response()->success(compact('taskpt'));
    }
    public function getTaskct()
    {
        $taskct = activitylog::join('companies', 'companies.id', '=', 'activitylogs.companiesid')->where([
          ['is_done', '=', 1],
          ['reminder_date', '=', date('Y-m-d')],
      ])->select('activitylogs.*','companies.name')->get();
        return response()->success(compact('taskct'));
    }
    public function getSummaryfull(Request $request)
    {
        $companyid = $request->input('id');
        $summaryfull = activitylog::where([
                ['companiesid', '=', $companyid],
                ['is_done', '=', 1]
            ])->groupBy('cassification_id')->selectRaw('cassification_id , SUM(director) as director,SUM(manager) as manager
    ,SUM(s_admin) as s_admin
    ,SUM(admin) as admin
    ,SUM(asst_admin) as asst_admin
    ,SUM(j_admin) as j_admin
    ,(director+manager+s_admin+admin+asst_admin+j_admin) as totalval
    ,((director*director_c)+(manager * manager_c)+(s_admin * s_admin_c)+(admin * admin_c)+(asst_admin * asst_admin_c)+(j_admin*j_admin_c)) as totalcost
    , (((director*director_c)+(manager * manager_c)+(s_admin * s_admin_c)+(admin * admin_c)+(asst_admin * asst_admin_c)+(j_admin*j_admin_c)) /  (director+manager+s_admin+admin+asst_admin+j_admin)) as avgcost
    ')
   ->get();
    return response()->success(compact('summaryfull'));
    }
    public function getSummaryfulltotal(Request $request)
    {
        $companyid = $request->input('id');
        $summaryfulltotal = activitylog::where([
                ['companiesid', '=', $companyid],
                ['is_done', '=', 1]
            ])->selectRaw('"Total" AS total,SUM(director) as director,SUM(manager) as manager
    ,SUM(s_admin) as s_admin
    ,SUM(admin) as admin
    ,SUM(asst_admin) as asst_admin
    ,SUM(j_admin) as j_admin
    ,SUM(director+manager+s_admin+admin+asst_admin+j_admin) as totalval
    ,SUM((director*director_c)+(manager * manager_c)+(s_admin * s_admin_c)+(admin * admin_c)+(asst_admin * asst_admin_c)+(j_admin*j_admin_c)) as totalcost
    ,(SUM(((director*director_c)+(manager * manager_c)+(s_admin * s_admin_c)+(admin * admin_c)+(asst_admin * asst_admin_c)+(j_admin*j_admin_c)) /  (director+manager+s_admin+admin+asst_admin+j_admin))/4) as avgcost
    ')
   ->get();
    return response()->success(compact('summaryfulltotal'));
    }
}
