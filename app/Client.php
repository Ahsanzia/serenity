<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    //
    protected $fillable = [
        'id', 'fname', 'mname', 'lname', 'drivinglicence', 'idcard', 'passport', 'utilitybill', 'dob', 'ninumber', 'userid', 'created_at', 'updated_at',
    ];



}
