<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $siswa = Siswa::paginate(10);
        return Inertia::render('Siswa/index', [
            'siswa' => $siswa,
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
        return Inertia::render('Siswa/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nis' => 'required|unique:siswa,nis',
            'nama' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        Siswa::create([
            'nis' => $request->nis,
            'nama' => $request->nama,
        ]);

        return redirect()->route('siswa.index')->with('success', 'Data siswa berhasil ditambahkan.');
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
        $siswa = Siswa::findOrFail($id);
        return Inertia::render('Siswa/Edit', [
            'siswa' => $siswa,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nis' => 'required|string',
            'nama' => 'required|string',
        ]);

        $siswa = Siswa::findOrFail($id);
        $siswa->update([
            'nis' => $request->nis,
            'nama' => $request->nama,
        ]);

        return redirect()->route('siswa.index')->with('success', 'Data siswa berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $siswa = Siswa::find($id);

        if ($siswa) {
            $siswa->delete();
            return Redirect::route('siswa.index')->with('success', 'Data siswa berhasil dihapus.');
        } else {
            return Redirect::route('siswa.index')->with('error', 'Data siswa tidak ditemukan.');
        }
    }
}
