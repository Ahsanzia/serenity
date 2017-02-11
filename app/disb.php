<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class disb extends Model
{
	protected $fillable = [
        'id', 'company_id', 'ddetail', 'ddate', 'tcost', 'billed', 'user_id' , 'created_at', 'updated_at'
    ];  
}
