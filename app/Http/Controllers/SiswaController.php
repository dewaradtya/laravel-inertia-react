<?php

namespace App\Http\Controllers;

use App\Exports\SiswaExport;
use App\Imports\SiswaImport;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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
            'nama' => 'required|string|max:255',
            'kelas' => 'required|string|max:10',
            'alamat' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'no_telp' => 'required|string|max:15',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $data = $request->all();

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $path = $file->store('images/siswa', 'public');
            $data['foto'] = $path;
        }

        Siswa::create($data);

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
            'nama' => 'required|string|max:255',
            'kelas' => 'required|string|max:10',
            'alamat' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'no_telp' => 'required|string|max:15',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $path = $file->store('images/siswa', 'public');
            $data['foto'] = $path;
        }

        $siswa = Siswa::findOrFail($id);
        $siswa->update($data);

        return redirect()->route('siswa.index')->with('success', 'Data siswa berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $siswa = Siswa::find($id);

        if ($siswa) {
            if ($siswa->foto) {
                Storage::disk('public')->delete($siswa->foto);
            }
            $siswa->delete();
            return Redirect::route('siswa.index')->with('success', 'Data siswa berhasil dihapus.');
        } else {
            return Redirect::route('siswa.index')->with('error', 'Data siswa tidak ditemukan.');
        }
    }

    public function downloadFormat()
    {
        return Excel::download(new SiswaExport, 'Siswa.xlsx');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
        ]);

        try {
            Excel::import(new SiswaImport, $request->file('file'));
            return Redirect::back()->with('success', 'Data siswa berhasil diimport.');
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
