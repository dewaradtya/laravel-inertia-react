<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function dashboard () {
        return Inertia::render('home');
    }

    public function siswa () {
        return Inertia::render('Siswa/index');
    }
}
