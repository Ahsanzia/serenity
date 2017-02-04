<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCasecostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('casecosts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('director');
            $table->integer('manager');
            $table->integer('s_admin');
            $table->integer('admin');
            $table->integer('asst_admin');
            $table->integer('j_admin');
            $table->integer('userid');
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
        Schema::drop('casecosts');
    }
}
