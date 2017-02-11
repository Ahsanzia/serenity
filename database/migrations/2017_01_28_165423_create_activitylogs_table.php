<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActivitylogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('activitylogs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('companiesid')->references('id')->on('companies')->onDelete('cascade');
            $table->date('reminder_date');
            $table->integer('director');
            $table->integer('manager');
            $table->integer('s_admin');
            $table->integer('admin');
            $table->integer('asst_admin');
            $table->integer('j_admin');
            //cost
            $table->integer('director_c');
            $table->integer('manager_c');
            $table->integer('s_admin_c');
            $table->integer('admin_c');
            $table->integer('asst_admin_c');
            $table->integer('j_admin_c');
            //cost
            $table->string('narration');
            $table->string('explanation');
            $table->string('justification');
            $table->string('cassification_id');
            $table->string('notification');
            $table->string('is_done');
            $table->string('userid');
            $table->integer('capproved');
            $table->integer('cbilled');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop('activitylogs');
    }
}
