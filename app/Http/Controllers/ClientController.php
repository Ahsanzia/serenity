<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;
use Auth;
use App\Http\Requests;
use Hash;
use Input;
use Validator;

class ClientController extends Controller
{

    public function getIndex(Request $request)
    {
      
        $clients = Client::all();
        return response()->success(compact('clients'));
    }

    public function getClientShow($id)
    {
        $clients = Client::find($id);

        return response()->success($clients);
    }

    public function postProfile()
    {
        $client = Client::create([
            'fname' => Input::get('fname'),
            'mname' => Input::get('mname'),
            'lname' => Input::get('lname'),
            'drivinglicence' => Input::get('drivinglicence'),
            'passport' => Input::get('passport'),
            'utilitybill' => Input::get('utilitybill'),
            'dob' => Input::get('dob'),
            'idcard' => Input::get('idcard'),
            'ninumber' => Input::get('ninumber'),
            'userid' => 1,
        ]);

        return response()->success(compact('client'));
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


    public function deleteClient($id)
    {
        Client::destroy($id);

        return response()->success('success');
    }
}
