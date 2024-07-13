<?php

namespace App\Exports;

use App\Models\Guru;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class GuruExport implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        return Guru::select('nama', 'mapel', 'tanggal_lahir','alamat', 'no_telp', 'email', 'foto')
            ->get();
    }

    public function headings(): array
    {
        return ['Nama', 'Mapel', 'Tanggal Lahir', 'Alamat', 'No. Telp', 'Email', 'Foto'];
    }

    public function title(): string
    {
        return 'Guru';
    }
}
