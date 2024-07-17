<?php

use App\Exports\SiswaExport;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PresensiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiswaController;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/register', [AuthController::class, 'doregister']);
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'dologin']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [PageController::class, 'dashboard']);
    Route::resource('siswa', SiswaController::class)->middleware('userAkses:admin');
    Route::get('/siswa-export', [SiswaController::class, 'downloadFormat'])->name('siswa.download-format');
    Route::post('/siswa-import', [SiswaController::class, 'import'])->name('siswa.import');
    Route::resource('guru', GuruController::class)->middleware('userAkses:admin');
    Route::get('/guru-export', [GuruController::class, 'downloadFormat'])->name('guru.download-format');
    Route::post('/guru-import', [GuruController::class, 'import'])->name('guru.import');
    Route::resource('profile', ProfileController::class)->except('index, destroy');
    Route::put('/profile-user/{id}', [ProfileController::class, 'userUpdate'])->name('profile.userUpdate');
    Route::resource('jadwal', JadwalController::class)->except('create,edit');
    Route::group(['middleware' => ['userAkses:admin,pengajar']], function () {
        Route::get('jadwal/create', [JadwalController::class, 'create'])->name('jadwal.create');
        Route::get('nilai/create', [NilaiController::class, 'create'])->name('nilai.create');
        Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
        Route::delete('profile/{profile}', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    Route::resource('presensi', PresensiController::class);
    Route::resource('nilai', NilaiController::class)->except('create');
});

Route::get('/cek', [PageController::class, 'cek'])->name('cek');
Route::post('/cek', [PageController::class, 'cekOngkir']);
