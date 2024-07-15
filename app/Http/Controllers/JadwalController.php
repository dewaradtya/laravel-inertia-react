<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Jadwal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class JadwalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jadwal = Jadwal::with('guru')->paginate(10);
        return Inertia::render('Jadwal/index', [
            'jadwal' => $jadwal,
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
        $guru = Guru::select('id', 'nama')->get();
        return Inertia::render('Jadwal/create', ['guru' => $guru]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kelas' => 'required|string|max:10',
            'mapel' => 'required|string',
            'guru_id' => 'required|exists:gurus,id',
            'hari' => 'required|string',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $data = $request->all();
        Jadwal::create($data);

        return redirect()->route('jadwal.index')->with('success', 'Data jadwal berhasil ditambahkan.');
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
        $jadwal = Jadwal::findOrFail($id);
        $guru = Guru::select('id', 'nama')->get();
        return Inertia::render('Jadwal/edit', ['jadwal' => $jadwal, 'guru' => $guru]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'kelas' => 'required|string|max:10',
            'mapel' => 'required|string',
            'guru_id' => 'required|exists:gurus,id',
            'hari' => 'required|string',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i',
        ]);

        $data = $request->all();

        $jadwal = Jadwal::findOrFail($id);
        $jadwal->update($data);

        return redirect()->route('jadwal.index')->with('success', 'Data jadwal berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jadwal = Jadwal::find($id);
        $jadwal->delete();
        return Redirect::route('jadwal.index')->with('success', 'Data jadwal berhasil dihapus.');
    }
}
