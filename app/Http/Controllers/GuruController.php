<?php

namespace App\Http\Controllers;

use App\Exports\GuruExport;
use App\Imports\GuruImport;
use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class GuruController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $guru = Guru::paginate(10);
        return Inertia::render('Guru/index', [
            'guru' => $guru,
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
        return Inertia::render('Guru/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'mapel' => 'required|string',
            'alamat' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'no_telp' => 'required|string|max:15',
            'email' => 'required|email',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $data = $request->all();

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $path = $file->store('images/guru', 'public');
            $data['foto'] = $path;
        }

        Guru::create($data);

        return redirect()->route('guru.index')->with('success', 'Data guru berhasil ditambahkan.');
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
        $guru = Guru::findOrFail($id);
        return Inertia::render('Guru/Edit', [
            'guru' => $guru,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'mapel' => 'required|string',
            'alamat' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'no_telp' => 'required|string|max:15',
            'email' => 'required|email',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $path = $file->store('images/guru', 'public');
            $data['foto'] = $path;
        }

        $guru = Guru::findOrFail($id);
        $guru->update($data);

        return redirect()->route('guru.index')->with('success', 'Data guru berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $guru = Guru::find($id);

        if ($guru) {
            if ($guru->foto) {
                Storage::disk('public')->delete($guru->foto);
            }
            $guru->delete();
            return Redirect::route('guru.index')->with('success', 'Data guru berhasil dihapus.');
        } else {
            return Redirect::route('guru.index')->with('error', 'Data guru tidak ditemukan.');
        }
    }

    public function downloadFormat()
    {
        return Excel::download(new GuruExport, 'Guru.xlsx');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
        ]);

        try {
            Excel::import(new GuruImport, $request->file('file'));
            return Redirect::back()->with('success', 'Data guru berhasil diimport.');
        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
            $failures = $e->failures();
            $errorMessages = [];
            foreach ($failures as $failure) {
                $errorMessages[] = 'Baris ' . $failure->row() . ': ' . implode(', ', $failure->errors());
            }
            return Redirect::back()->with('error', 'Kesalahan saat mengimport data: ' . implode('. ', $errorMessages));
        } catch (\Exception $e) {
            return Redirect::back()->with('error', 'Terjadi kesalahan saat mengimport data: ' . $e->getMessage());
        }
    }
}
