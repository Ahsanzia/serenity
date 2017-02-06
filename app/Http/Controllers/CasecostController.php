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

**/
}
