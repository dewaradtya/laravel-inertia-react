<?php

namespace App\Imports;

use App\Models\Siswa;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\Importable;
use Carbon\Carbon;

class SiswaImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    public function model(array $row)
    {
        return new Siswa([
            'nama' => $row['nama'],
            'kelas' => $row['kelas'],
            'alamat' => $row['alamat'],
            'tanggal_lahir' => $row['tanggal_lahir'],
            'no_telp' => $row['no_telp'],
            'foto' => $row['foto'],
        ]);
    }

    public function rules(): array
    {
        return [
            'nama' => 'required',
            'kelas' => 'required',
            'alamat' => 'required',
            'tanggal_lahir' => 'required|date',
            'no_telp' => 'required',
            'foto' => 'nullable|image|max:2048',
        ];
    }

    public function customValidationMessages()
    {
        return [
            'nama.required' => 'Kolom Nama harus diisi.',
            'kelas.required' => 'Kolom Kelas harus diisi.',
            'alamat.required' => 'Kolom Alamat harus diisi.',
            'tanggal_lahir.required' => 'Kolom Tanggal Lahir harus diisi.',
            'tanggal_lahir.date_format' => 'Kolom Tanggal Lahir harus dalam format dd/mm/yyyy.',
            'no_telp.required' => 'Kolom No. Telp harus diisi.',
            'foto.image' => 'Kolom Foto harus berupa gambar.',
            'foto.max' => 'Ukuran Foto maksimal adalah 2MB.',
        ];
    }
}
