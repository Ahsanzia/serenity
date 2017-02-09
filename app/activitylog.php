<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class activitylog extends Model
{
    //

    protected $fillable = [
        'id', 'companiesid', 'reminder_date', 'director', 'manager', 's_admin', 'admin', 'asst_admin', 'j_admin', 'director_c', 'manager_c', 's_admin_c', 'admin_c', 'asst_admin_c', 'j_admin_c', 'narration', 'explanation', 'justification', 'cassification_id', 'notification', 'is_done', 'userid', 'created_at', 'updated_at'
    ];
}
