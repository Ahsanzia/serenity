<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class CasecostController extends Controller
{
    //
    /**
     * Get all users.
     *
     * @return JSON
     */
    public function getCasecosts()
    {
        $casecost = CaseCost::all();
        return response()->success(compact('casecost'));
    }
    /**
     * Get all users.
     *
     * @return JSON
     */
    public function getCasecost($id)
    {
        $cases = CaseCost::find($id);
        return response()->success($cases);
    }
    /**
     * Post Case.
     *
     * @return JSON
     */
    public function postCasecost()
    {
        $cases = CaseCost::create([
            'director' => Input::get('director'),
            'manager' => str_slug(Input::get('manager'), '.'),
            's_admin' => Input::get('s_admin'),
            'admin' => Input::get('admin'),
            'asst_admin' => Input::get('asst_admin'),
            'j_admin' => Input::get('j_admin')
        ]);
        return response()->success(compact('cases'));
    }
    /**
     * Post Case.
     *
     * @return JSON
     */
    public function putCasecost()
    {
        $caseForm = Input::get('data');
        $caseId = intval($caseForm["id"]);
        $caseData = [
            'director' => $caseForm["director"],
            'manager' => $caseForm["manager"],
            's_admin' => $caseForm["s_admin"],
            'admin' => $caseForm["admin"],
            'asst_admin' => $caseForm["asst_admin"],
            'j_admin' => $caseForm["j_admin"],
        ];
        $affectedRows = CaseCost::where('id', '=', $caseId)->update($caseData);
        return response()->success('success');
    }
    /**
     * Post Case.
     *
     * @return JSON
     */
    public function deleteCase($id)
    {
        CaseCost::destroy($id);
        return response()->success('success');
    }
}
