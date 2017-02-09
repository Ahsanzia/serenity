<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;
use Hash;
use Input;
use Validator;
use App\Casecost;


class CasecostController extends Controller
{
      public function getIndex()
    {
        $costs = Casecost::all();

        return response()->success(compact('costs'));
    }

      public function postProfile()
    {
        $casecost = Casecost::create([
            'director' => Input::get('director'),
            'manager' => Input::get('manager'),
            's_admin' => Input::get('s_admin'),
            'admin' => Input::get('admin'),
            'asst_admin' => Input::get('asst_admin'),
            'j_admin' => Input::get('j_admin'),
        ]);

        return response()->success(compact('casecost'));
    }


      public function putCostShow(Request $request)
    {
    $clientForm = array_dot(
            app('request')->only(
                'data.director',
                'data.manager',
                'data.s_admin',
                'data.admin',
                'data.asst_admin',
                'data.j_admin',
                'data.active',
                'data.id'
            )
        );

        $clientid = intval($clientForm['data.id']);

        $cientdata = [
            'director' => $clientForm['data.director'],
            'manager' => $clientForm['data.manager'],
            's_admin' => $clientForm['data.s_admin'],
            'admin' => $clientForm['data.admin'],
            'asst_admin' => $clientForm['data.asst_admin'],
            'j_admin' => $clientForm['data.j_admin'],
            'active' => $clientForm['data.active'],
    
        ];

        $affectedRows = Casecost::where('id', '=', $clientid)->update($cientdata);
        return response()->success('success');
   
    }
 public function getCostShow($id)
    {
        $clients = Casecost::find($id);

        return response()->success($clients);
    }



/***
    public function getClientShow($id)
    {
        $clients = Client::find($id);

        return response()->success($clients);
    }

    

    public function putClientShow(Request $request)
    {
        $clientForm = array_dot(
            app('request')->only(
                'data.fname',
                'data.mname',
                'data.lname',
                'data.drivinglicence',
                'data.passport',
                'data.utilitybill',
                'data.idcard',
                'data.dob',
                'data.ninumber',
                'data.id'
            )
        );

        $clientid = intval($clientForm['data.id']);

        $cientdata = [
            'fname' => $clientForm['data.fname'],
            'mname' => $clientForm['data.mname'],
            'lname' => $clientForm['data.lname'],
            'drivinglicence' => $clientForm['data.drivinglicence'],
            'passport' => $clientForm['data.passport'],
            'idcard' => $clientForm['data.idcard'],
            'utilitybill' => $clientForm['data.utilitybill'],
            'dob' => $clientForm['data.dob'],
            'ninumber' => $clientForm['data.ninumber'],
        ];

        $affectedRows = Client::where('id', '=', $clientid)->update($cientdata);

        return response()->success('success');
    }
}
