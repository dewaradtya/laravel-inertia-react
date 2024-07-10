<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Visit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function dashboard()
    {
        $totalUsers = User::count();
        $visitsToday = Visit::whereDate('created_at', Carbon::today())->count();

        return Inertia::render('home', [
            'totalUsers' => $totalUsers,
            'visitsToday' => $visitsToday,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }
}
