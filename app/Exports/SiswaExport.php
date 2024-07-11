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
        return Siswa::select('nis', 'nama')
            ->groupBy('nis','nama')
            ->get();
    }

    public function headings(): array
    {
        return ['NIS', 'Nama'];
    }

    public function title(): string
    {
        return 'Siswa';
    }
}
