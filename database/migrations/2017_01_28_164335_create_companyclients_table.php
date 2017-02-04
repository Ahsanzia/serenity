<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyclientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        //
        Schema::create('companyclients', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('clientid')->references('id')->on('clients')->onDelete('cascade');
            $table->integer('companyid')->references('id')->on('companies')->onDelete('cascade');
            $table->integer('type');
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
        Schema::drop('companyclients');
    }
}
