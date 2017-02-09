<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Companie extends Model
{
    //

    //
    protected $fillable = [
        'id', 'name', 'regno', 'casetype', 'appdate', 'userid', 'created_at', 'updated_at'
    ];
}
