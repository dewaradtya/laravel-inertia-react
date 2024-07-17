<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserAkses
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  ...$roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (in_array(Auth::user()->role, $roles)) {
            return $next($request);
        }

        return redirect()
            ->back()
            ->with('error', 'Anda tidak memiliki akses ke halaman ini');
    }
}
