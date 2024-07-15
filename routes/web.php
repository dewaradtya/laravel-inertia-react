<?php

use App\Exports\SiswaExport;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PresensiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiswaController;
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
    Route::resource('profile', ProfileController::class)->only(['index'])->middleware('userAkses:admin'); 
    Route::get('/profile/edit/{id}', [ProfileController::class, 'userEdit'])->name('profile.userEdit');
    Route::put('/profile-user/{id}', [ProfileController::class, 'userUpdate'])->name('profile.userUpdate');
    Route::resource('jadwal', JadwalController::class);
    Route::resource('presensi', PresensiController::class);
});
