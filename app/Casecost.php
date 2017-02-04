<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Casecost extends Model
{
    //
    protected $fillable = [
        'id', 'director', 'manager', 's_admin', 'admin', 'asst_admin', 'j_admin', 'created_at',
    ];
}
