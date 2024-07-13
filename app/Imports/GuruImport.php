<?php

namespace App\Imports;

use App\Models\Guru;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\Importable;
use Carbon\Carbon;

class GuruImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    public function model(array $row)
    {
        return new Guru([
            'nama' => $row['nama'],
            'mapel' => $row['mapel'],
            'alamat' => $row['alamat'],
            'tanggal_lahir' => $row['tanggal_lahir'],
            'no_telp' => $row['no_telp'],
            'email' => $row['email'],
            'foto' => $row['foto'],
        ]);
    }

    public function rules(): array
    {
        return [
            'nama' => 'required',
            'mapel' => 'required',
            'alamat' => 'required',
            'tanggal_lahir' => 'required|date',
            'no_telp' => 'required',
            'email' => 'required|email',
            'foto' => 'nullable|image|max:2048',
        ];
    }

    public function customValidationMessages()
    {
        return [
            'nama.required' => 'Kolom Nama harus diisi.',
            'mapel.required' => 'Kolom mapel harus diisi.',
            'alamat.required' => 'Kolom Alamat harus diisi.',
            'tanggal_lahir.required' => 'Kolom Tanggal Lahir harus diisi.',
            'tanggal_lahir.date_format' => 'Kolom Tanggal Lahir harus dalam format dd/mm/yyyy.',
            'no_telp.required' => 'Kolom No. Telp harus diisi.',
            'email.required' => 'Kolom Email harus diisi.',
            'email.email' => 'Kolom Email harus dalam format email.',
            'foto.image' => 'Kolom Foto harus berupa gambar.',
            'foto.max' => 'Ukuran Foto maksimal adalah 2MB.',
        ];
    }
}
