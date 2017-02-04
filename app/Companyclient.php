<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Companyclient extends Model
{
    //
    protected $fillable = [
        'id', 'clientid', 'companyid','type',
    ];
    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
