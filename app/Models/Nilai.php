<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    use HasFactory;

    protected $fillable = [
        'siswa_id',
        'mapel',
        'nilai',
        'tanggal'
    ];

    public function siswa(){
        return $this->belongsTo(Siswa::class, 'siswa_id', 'id');
    }
}
