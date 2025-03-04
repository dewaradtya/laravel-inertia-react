<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Visit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PageController extends Controller
{
    public function dashboard()
    {
        $totalPengajar = User::where('role', 'pengajar')->count();
        $totalSiswa = User::where('role', 'siswa')->count();
        $totalUsers = $totalPengajar + $totalSiswa;
        $visitsToday = Visit::whereDate('created_at', Carbon::today())->count();
    
        $visitsByDay = Visit::selectRaw('DAYNAME(created_at) as day, COUNT(*) as count')
            ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
            ->groupBy('day')
            ->orderByRaw("FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')")
            ->get()
            ->pluck('count', 'day')
            ->toArray();
    
        $daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $visitsData = array_merge(array_fill_keys($daysOfWeek, 0), $visitsByDay);
    
        return Inertia::render('home', [
            'totalUsers' => $totalUsers,
            'visitsToday' => $visitsToday,
            'visitsData' => $visitsData,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function cek()
    {
        $response = Http::withHeaders([
            'key' => '0dbcf59e8838200744bb7f7d4dbebf8b'
        ])->get('https://api.rajaongkir.com/starter/city');

        $cities = $response['rajaongkir']['results'];
        return Inertia::render('cek', ['cities' => $cities, 'ongkir'=> '']);
    }

    public function cekOngkir(Request $request)
    {
        $response = Http::withHeaders([
            'key' => '0dbcf59e8838200744bb7f7d4dbebf8b'
        ])->get('https://api.rajaongkir.com/starter/city');
        $responseCost = Http::withHeaders([
            'key' => '0dbcf59e8838200744bb7f7d4dbebf8b'
        ])->post('https://api.rajaongkir.com/starter/cost', [
            'origin' => $request->origin,
            'destination' => $request->destination,
            'weight' => $request->weight,
            'courier' => $request->courier
        ]);

        $cities = $response['rajaongkir']['results'];
        $ongkir = $responseCost['rajaongkir']['results'];
        return Inertia::render('cek', ['cities' => $cities, 'ongkir' => $ongkir]);
    }
}
