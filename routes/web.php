<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\SiswaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::get('dashboard', [PageController::class, 'dashboard']);
Route::resource('siswa', SiswaController::class);