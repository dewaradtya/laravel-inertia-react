<?php

namespace App\Exports;

use App\Models\Siswa;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class SiswaExport implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        return Siswa::select('nama', 'kelas', 'alamat', 'tanggal_lahir', 'no_telp', 'foto')
            ->get();
    }

    public function headings(): array
    {
        return ['Nama', 'Kelas', 'Alamat', 'Tanggal Lahir', 'No. Telp', 'Foto'];
    }

    public function title(): string
    {
        return 'Siswa';
    }
}
