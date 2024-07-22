<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PengumumanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pengumuman = Pengumuman::paginate(10);
        return Inertia::render('Pengumuman/index', [
            'pengumuman' => $pengumuman,
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
        return Inertia::render('Pengumuman/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $data = $request->all();

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $path = $file->store('images/pengumuman', 'public');
            $data['foto'] = $path;
        }

        Pengumuman::create($data);

        return redirect()->route('pengumuman.index')->with('success', 'Data pengumuman berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pengumuman = Pengumuman::findOrFail($id);
        return Inertia::render('Pengumuman/detail', [
            'pengumuman' => $pengumuman,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $pengumuman = Pengumuman::findOrFail($id);
        return Inertia::render('Pengumuman/Edit', [
            'pengumuman' => $pengumuman,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $pengumuman = Pengumuman::findOrFail($id);

        $pengumuman->judul = $request->input('judul');
        $pengumuman->isi = $request->input('isi');

        if ($request->hasFile('foto')) {
            // Hapus foto lama jika ada
            if ($pengumuman->foto) {
                Storage::disk('public')->delete($pengumuman->foto);
            }

            $file = $request->file('foto');
            $path = $file->store('images/pengumuman', 'public');
            $pengumuman->foto = $path;
        }

        $pengumuman->save();

        return redirect()->route('pengumuman.index')->with('success', 'Data pengumuman berhasil diperbarui!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pengumuman = Pengumuman::find($id);

        if ($pengumuman) {
            if ($pengumuman->foto) {
                Storage::disk('public')->delete($pengumuman->foto);
            }
            $pengumuman->delete();
            return Redirect::route('pengumuman.index')->with('success', 'Data pengumuman berhasil dihapus.');
        } else {
            return Redirect::route('pengumuman.index')->with('error', 'Data pengumuman tidak ditemukan.');
        }
    }
}
