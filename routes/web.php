<?php

use App\Exports\SiswaExport;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\PageController;
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
    Route::resource('siswa', SiswaController::class);
    Route::resource('profile', ProfileController::class);
    Route::resource('profile', ProfileController::class)->except('index, destroy');
    Route::resource('profile', ProfileController::class)->only(['index'])->middleware('userAkses:admin');
    Route::get('/siswa-export', [SiswaController::class, 'downloadFormat'])->name('siswa.download-format');
    Route::post('/siswa-import', [SiswaController::class, 'import'])->name('siswa.import');
});
