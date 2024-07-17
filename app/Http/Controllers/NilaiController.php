<?php

namespace App\Http\Controllers;

use App\Models\Nilai;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class NilaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $nilai = Nilai::with('siswa')->paginate(10);

        return Inertia::render('Nilai/index', [
            'nilai' => $nilai,
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
        return Inertia::render('Nilai/create', ['siswa' => $siswa]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'siswa_id' => 'required|exists:siswa,id',
            'mapel' => 'required|string',
            'nilai' => 'required|string|max:3',
            'tanggal' => 'required|date',
        ]);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        $data = $request->all();
        Nilai::create($data);

        return Redirect::route('nilai.index')->with('success', 'Data nilai berhasil ditambahkan.');
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
        $nilai = Nilai::findOrFail($id);
        $siswa = Siswa::select('id', 'nama')->get();
        return Inertia::render('Nilai/edit', ['nilai' => $nilai, 'siswa' => $siswa]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'mapel' => 'required|string',
            'nilai' => 'required|string|max:3',
            'tanggal' => 'required|date',
        ]);

        $data = $request->all();

        $nilai = Nilai::findOrFail($id);
        $nilai->update($data);

        return Redirect::route('nilai.index')->with('success', 'Data nilai berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $nilai = Nilai::find($id);
        $nilai->delete();
        return Redirect::route('nilai.index')->with('success', 'Data nilai berhasil dihapus.');
    }
}
