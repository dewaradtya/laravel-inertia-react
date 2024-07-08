<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::get('dashboard', [PageController::class, 'dashboard']);
Route::get('siswa', [PageController::class, 'siswa'])->name('Siswa.index');