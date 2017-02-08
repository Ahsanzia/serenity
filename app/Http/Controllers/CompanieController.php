<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Companie;
use App\Companyclient;
use App\Http\Requests;
use Hash;
use Input;
use Validator;

class CompanieController extends Controller
{
    //

    public function getIndex(Request $request)
    {

         $c_type = $request->input('c_type');
        if($c_type == "1"){
        $companies = Companie::where('casetype', 'CVL')->orWhere('casetype', 'MVL')->orWhere('casetype', 'CVA')->orWhere('casetype', 'CWU')->get();
        }else{
            $companies = Companie::where('casetype', 'IVA')->orWhere('casetype', 'BKY')->get();
        }
        

        return response()->success(compact('companies'));
    }

    public function getCompanyShow($id)
    {
        $clients = Companie::find($id);

        return response()->success($clients);
    }

    public function postProfile()
    {
        $client = Companie::create([
            'name' => Input::get('name'),
            'regno' => Input::get('regno'),
            'casetype' => Input::get('casetype'),
            'appdate' => Input::get('appdate'),
            'userid' => 1,
        ]);

        return response()->success(compact('client'));
    }

    public function putCompanyShow(Request $request)
    {
        $clientForm = array_dot(
            app('request')->only(
                'data.name',
                'data.regno',
                'data.casetype',
                'data.appdate',
                'data.id'
            )
        );

        $clientid = intval($clientForm['data.id']);

        $cientdata = [
            'name' => $clientForm['data.name'],
            'regno' => $clientForm['data.regno'],
            'casetype' => $clientForm['data.casetype'],
            'appdate' => $clientForm['data.appdate'],
        ];

        $affectedRows = Companie::where('id', '=', $clientid)->update($cientdata);

        return response()->success('success');
    }

    public function postCompanyclient()
    {
        $companyclient = Companyclient::create([
            'clientid' => Input::get('clientid'),
            'companyid' => Input::get('companyid'),
            'type' => Input::get('type')

        ]);

        return response()->success('success');
    }

    public function deleteCompanie($id)
    {
        Companie::destroy($id);

        return response()->success('success');
    }
}
