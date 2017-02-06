<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Companies;
use App\Client;
use App\Companyclient;
use App\Http\Requests;

class CompanyclientController extends Controller
{
    public function getcompanyclient(Request $request)
    {

        $id = $request->input('id');
        $type = $request->input('type');
        $companyclients = Companyclient::join('clients', 'clients.id', '=', 'companyclients.clientid')
            ->where([
                ['companyid', '=', $id],
                ['type', '=', $type],
            ])->select('companyclients.id as id','clients.fname','clients.lname') ->get();
        return response()->success(compact('companyclients'));
    }

    public function getclientcompanies(Request $request)
    {    $id = $request->input('id');
        $clientcompnies = Companyclient::join('companies', 'companies.id', '=', 'companyclients.companyid')->where('companyclients.clientid', '=', $id)->get();
        return response()->success(compact('clientcompnies'));
    }
    public function deleteCompanyclient($id)
    {
        Companyclient::destroy($id);
        return response()->success('success');
    }
}
