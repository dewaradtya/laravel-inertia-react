<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;
    
    protected $table = 'siswa';

    protected $fillable = [
        'nama',
        'kelas',
        'alamat',
        'tanggal_lahir',
        'alamat',
        'no_telp',
        'foto'
    ];

    protected $timestaps = false;
}
