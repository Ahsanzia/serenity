<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Http\Requests;
use Auth;
use Hash;
use Input;
use Validator;
use App\activitylog;
use App\Casecost;
use App\disb;
use App\Companie;

class tscController extends Controller
{
    //
    //
    //
    public function getIndex(Request $request)
    {
        $c_type = $request->input('c_type');
        if($c_type == "1"){
            $tcs = Companie::join('activitylogs', 'activitylogs.companiesid', '=', 'companies.id')->where('casetype', 'CVL')->orWhere('casetype', 'MVL')->orWhere('casetype', 'CVA')->orWhere('casetype', 'CWU')->selectRaw('companies.name,companies.id,companies.casetype,companies.appdate , (SUM(director) + SUM(manager)  + SUM(s_admin)+SUM(admin)+ SUM(asst_admin)+SUM(j_admin)) As tunits , (SUM(director) + SUM(manager)+SUM(s_admin)+SUM(admin)+SUM(asst_admin)+SUM(j_admin))*3 As thours ,
            	SUM(((director*director_c)+(manager * manager_c)+(s_admin * s_admin_c)+(admin * admin_c)+(asst_admin * asst_admin_c)+(j_admin*j_admin_c)))*3 as tcost , SUM(capproved) as capproved ,  SUM(cbilled) as cbilled , (SUM(capproved) -  SUM(cbilled)) as unbilled
				')->groupBy('companies.id','companies.name')->get();
        }else{


            $tcs = Companie::join('activitylogs', 'activitylogs.companiesid', '=', 'companies.id')->where('casetype', 'IVA')->orWhere('casetype', 'BKY')->selectRaw('companies.name,companies.id,companies.casetype,companies.appdate , (SUM(director)+ SUM(manager) + SUM(s_admin)+SUM(admin)+ SUM(asst_admin)+SUM(j_admin)) As tunits , (SUM(director) +SUM(manager) + SUM(s_admin)+SUM(admin)+SUM(asst_admin)+SUM(j_admin))*3 As thours ,
            	SUM(((director*director_c)+(manager * manager_c)+(s_admin * s_admin_c)+(admin * admin_c)+(asst_admin * asst_admin_c)+(j_admin*j_admin_c)))*3 as tcost , SUM(capproved) as capproved ,  SUM(cbilled) as cbilled , (SUM(capproved) -  SUM(cbilled)) as unbilled
				')->groupBy('companies.id','companies.name')->get();
        }
        return response()->success(compact('tcs'));
    }

 public function getTotal(Request $request)
    {
        $c_type = $request->input('c_type');
        if($c_type == "1"){
            $total = Companie::join('activitylogs', 'activitylogs.companiesid', '=', 'companies.id')->where('casetype', 'CVL')->orWhere('casetype', 'MVL')->orWhere('casetype', 'CVA')->orWhere('casetype', 'CWU')->selectRaw('"Total" as total,companies.name,companies.id,companies.casetype,companies.appdate , (SUM(director) +SUM(manager) +SUM(s_admin)+SUM(admin)+ SUM(asst_admin)+SUM(j_admin)) As tunits , (SUM(director) + SUM(manager) +SUM(s_admin)+SUM(admin)+SUM(asst_admin)+SUM(j_admin))*3 As thours ,
            	SUM(((director*director_c)+(manager * manager_c)+(s_admin * s_admin_c)+(admin * admin_c)+(asst_admin * asst_admin_c)+(j_admin*j_admin_c)))*3 as tcost , SUM(capproved) as capproved ,  SUM(cbilled) as cbilled , (SUM(capproved) -  SUM(cbilled)) as unbilled
				')->get();
        }else{
            $total = Companie::join('activitylogs', 'activitylogs.companiesid', '=', 'companies.id')->where('casetype', 'IVA')->orWhere('casetype', 'BKY')->selectRaw('"Total" as total,companies.name,companies.id,companies.casetype,companies.appdate , (SUM(director) +SUM(manager)+ SUM(s_admin)+SUM(admin)+ SUM(asst_admin)+SUM(j_admin)) As tunits , (SUM(director) + SUM(manager) +SUM(s_admin)+SUM(admin)+SUM(asst_admin)+SUM(j_admin))*3 As thours ,
            	SUM(((director*director_c)+(manager * manager_c)+(s_admin * s_admin_c)+(admin * admin_c)+(asst_admin * asst_admin_c)+(j_admin*j_admin_c)))*3 as tcost , SUM(capproved) as capproved ,  SUM(cbilled) as cbilled , (SUM(capproved) -  SUM(cbilled)) as unbilled
				')->get();
        }
        return response()->success(compact('total'));
    }

 public function getTotalfull(Request $request)
    {
        $id = $request->input('id');
            $totalfull = activitylog::where('companiesid', $id)->selectRaw('SUM(director) as director , SUM(manager) as manager  ,SUM(s_admin) as s_admin,SUM(admin) as admin, SUM(asst_admin) as asst_admin,SUM(j_admin) as j_admin,  (SUM(director) +SUM(manager) + SUM(s_admin)+SUM(admin)+ SUM(asst_admin)+SUM(j_admin)) As tunits , (SUM(director) + SUM(manager)+SUM(s_admin)+SUM(admin)+SUM(asst_admin)+SUM(j_admin))*3 As thours ,
                SUM(((director*director_c)+(manager * manager_c)+(s_admin * s_admin_c)+(admin * admin_c)+(asst_admin * asst_admin_c)+(j_admin*j_admin_c)))*3 as tcost , SUM(capproved) as capproved ,  SUM(cbilled) as cbilled , (SUM(capproved) -  SUM(cbilled)) as unbilled,"Total" AS total')->get();
         return response()->success(compact('totalfull'));
    }


   public function getCompany(Request $request)
    {
        $id = $request->input('id');
            $company = activitylog::where('companiesid', $id)->selectRaw('activitylogs.reminder_date,activitylogs.narration,activitylogs.cassification_id,activitylogs.director,activitylogs.manager,activitylogs.s_admin,activitylogs.admin,activitylogs.asst_admin,activitylogs.j_admin,(activitylogs.director+activitylogs.manager+activitylogs.s_admin+activitylogs.admin+activitylogs.asst_admin+activitylogs.j_admin) as tunits,(activitylogs.director+activitylogs.manager+activitylogs.s_admin+activitylogs.admin+activitylogs.asst_admin+activitylogs.j_admin)*3 as thours , ((director*director_c)+(manager * manager_c)+(s_admin * s_admin_c)+(admin * admin_c)+(asst_admin * asst_admin_c)+(j_admin*j_admin_c))*3 as tcost,activitylogs.capproved,activitylogs.cbilled,(activitylogs.capproved-activitylogs.cbilled) as unbilled')->get();
         return response()->success(compact('company'));
    }
}
