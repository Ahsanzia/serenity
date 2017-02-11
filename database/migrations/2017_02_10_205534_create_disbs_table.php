<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDisbsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    
            Schema::create('disbs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id');
            $table->string('ddetail')->nullable();
            $table->date('ddate')->nullable();
            $table->integer('tcost')->nullable();
            $table->integer('billed')->nullable();
            $table->integer('user_id');
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
            Schema::drop('disbs');
    }
}
