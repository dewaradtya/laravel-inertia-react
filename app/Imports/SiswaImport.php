<?php

namespace App\Imports;

use App\Models\Siswa;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\Importable;

class SiswaImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    public function model(array $row)
    {
        return new Siswa([
            'nis' => $row['nis'],
            'nama' => $row['nama'],
        ]);
    }

    public function rules(): array
    {
        return [
            'nis' => 'required|unique:siswa,nis',
            'nama' => 'required',
        ];
    }

    public function customValidationMessages()
    {
        return [
            'nis.required' => 'Kolom NIS harus diisi.',
            'nis.unique' => 'NIS :input sudah ada.',
            'nama.required' => 'Kolom Nama harus diisi.',
        ];
    }
}
