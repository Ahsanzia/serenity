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



class disbController extends Controller
{



    public function postProfile()
    {
        $disb = disb::create([
            'company_id' => Input::get('company_id'),
            'ddetail' => Input::get('ddetail'),
            'ddate' => Input::get('ddate'),
            'tcost' => Input::get('tcost'),
            'billed' => Input::get('billed')
        ]);
        return response()->success(compact('disbs'));
    }

    public function putShow(Request $request)
    {
          $clientForm = array_dot(
            app('request')->only(
                'data.company_id',
                'data.ddetail',
                'data.ddate',
                'data.tcost',
                'data.billed',
                'data.id'           
            )
        );
        $clientid = intval($clientForm['data.id']);
        $cientdata = [
            'company_id' => $clientForm['data.company_id'],
            'ddetail' => $clientForm['data.ddetail'],
            'ddate' => $clientForm['data.ddate'],
            'tcost' => $clientForm['data.tcost'],
            'billed' => $clientForm['data.billed']
        ];
        $affectedRows = disb::where('id', '=', $clientid)->update($cientdata);
        return response()->success('success');
    }
	public function getShow($id)
    {
        $disb = disb::find($id);
   
        return response()->success($disb);
    }

 
        public function deleteDisb($id)
    {
         $user = disb::find($id);
         $user->delete();
        return response()->success('success');
    }


   public function getIndex(Request $request)
    {
        $c_type = $request->input('c_type');
        if($c_type == "1"){
            $disbs = Companie::join('disbs', 'disbs.company_id', '=', 'companies.id')->where('casetype', 'CVL')->orWhere('casetype', 'MVL')->orWhere('casetype', 'CVA')->orWhere('casetype', 'CWU')->selectRaw('companies.name,companies.id,companies.casetype,companies.appdate ,SUM(tcost) as tcost,SUM(billed) as billed, (SUM(tcost)-SUM(billed)) as unbilled')->groupBy('companies.id','companies.name')->get();
        }else{
            $disbs = Companie::join('disbs', 'disbs.company_id', '=', 'companies.id')->where('casetype', 'IVA')->orWhere('casetype', 'BKY')->selectRaw('companies.name,companies.id,companies.casetype,companies.appdate ,SUM(tcost) as tcost,SUM(billed) as billed, (SUM(tcost)-SUM(billed)) as unbilled')->groupBy('companies.id','companies.name')->get();
        }
        return response()->success(compact('disbs'));
    }

    public function getTotal(Request $request)
    {
        $c_type = $request->input('c_type');
        if($c_type == "1"){
            $total = Companie::join('disbs', 'disbs.company_id', '=', 'companies.id')->where('casetype', 'CVL')->orWhere('casetype', 'MVL')->orWhere('casetype', 'CVA')->orWhere('casetype', 'CWU')->selectRaw('SUM(tcost) as tcost,SUM(billed) as billed, (SUM(tcost)-SUM(billed)) as unbilled,"Total" AS total')->get();
        }else{
            $total = Companie::join('disbs', 'disbs.company_id', '=', 'companies.id')->where('casetype', 'IVA')->orWhere('casetype', 'BKY')->selectRaw('SUM(tcost) as tcost,SUM(billed) as billed, (SUM(tcost)-SUM(billed)) as unbilled,"Total" AS total')->get();
        }
        return response()->success(compact('total'));
    }

 public function getTotalfull(Request $request)
    {
        $id = $request->input('id');
            $totalfull = Companie::join('disbs', 'disbs.company_id', '=', 'companies.id')->where('companies.id', $id)->selectRaw('SUM(tcost) as tcost,SUM(billed) as billed, (SUM(tcost)-SUM(billed)) as unbilled,"Total" AS total')->get();
         return response()->success(compact('totalfull'));
    }



  public function getCompany(Request $request)
    {
        $id = $request->input('id');
        $company = disb::Where('company_id',$id)->get();
         return response()->success(compact('company'));
    }    









}