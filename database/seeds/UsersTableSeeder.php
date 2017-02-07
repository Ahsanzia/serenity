<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
            'id' => 1,
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'email_verified' => '1',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ],
             [
            'id' => 2,
            'name' => 'test1',
            'email' => 'test1@example.com',
            'password' => bcrypt('password'),
            'email_verified' => '1',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ],
             [
            'id' => 3,
            'name' => 'test2',
            'email' => 'test2@example.com',
            'password' => bcrypt('password'),
            'email_verified' => '1',
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ]
        ]);
    }
}
