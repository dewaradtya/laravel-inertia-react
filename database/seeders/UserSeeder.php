<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userData = [
            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('admin123'),
                'role'  => 'admin',
            ],

            [
                'name' => 'pengajar',
                'email' => 'pengajar@gmail.com',
                'password' => bcrypt('pengajar123'),
                'role'  => 'pengajar',
            ],

            [
                'name' => 'siswa',
                'email' => 'siswa@gmail.com',
                'password' => bcrypt('siswa123'),
                'role'  => 'siswa',
            ],
        ];

        foreach($userData as $key => $val)(
            User::create($val)
        );
    }
}