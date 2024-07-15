<?php

namespace App\Http\Controllers;

use App\Models\Presensi;
use App\Models\Siswa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PresensiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $today = Carbon::today();
        $presensi = Presensi::with('siswa')->whereDate('created_at', $today)->paginate(10);

        return Inertia::render('Presensi/index', [
            'presensi' => $presensi,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $siswa = Siswa::select('id', 'nama')->get();
        return Inertia::render('Presensi/create', ['siswa' => $siswa]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'siswa_id' => 'required|exists:siswa,id|unique:presensis,siswa_id',
            'keterangan' => 'required|in:Hadir,Absen,Izin,Sakit'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $data = $request->all();
        Presensi::create($data);

        return redirect()->route('presensi.index')->with('success', 'Data presensi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $presensi = Presensi::findOrFail($id);
        $siswa = Siswa::select('id', 'nama')->get();
        return Inertia::render('Presensi/edit', ['presensi' => $presensi, 'siswa' => $siswa]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'keterangan' => 'required|in:Hadir,Absen,Izin,Sakit'
        ]);

        $data = $request->all();

        $presensi = Presensi::findOrFail($id);
        $presensi->update($data);

        return redirect()->route('presensi.index')->with('success', 'Data presensi berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $presensi = Presensi::find($id);
        $presensi->delete();
        return Redirect::route('presensi.index')->with('success', 'Data presensi berhasil dihapus.');
    }
}
