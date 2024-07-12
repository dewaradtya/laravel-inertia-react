<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;

    protected $fillable = [
        'kelas',
        'mapel',
        'guru_id',
        'hari',
        'jam_mulai',
        'jam_selesai',
    ];

    public function guru(){
        return $this->belongsTo(Guru::class, 'guru_id', 'id');
    }
}
