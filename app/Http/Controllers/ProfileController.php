<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class ProfileController extends Controller
{
    public function index()
    {
        $users = User::whereIn('role', ['pengajar', 'siswa'])
            ->orderBy('created_at', 'DESC')
            ->paginate(10);

        return Inertia::render('Profile/index', [
            'users' => $users,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('Profile', [
            'user' => $user,
        ]);
    }

    public function edit(string $id)
    {
        $user = Auth::user();
        return Inertia::render('Profile', ['user' => $user]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'avatar' => 'nullable|image|max:2048',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $avatarPath;
        }

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return redirect()->route('profile.edit', $user->id)->with('success', 'Profile updated successfully.');
    }

    public function destroy(string $id)
    {
        $users = User::find($id);
        $users->delete();
        return Redirect::route('profile.index')->with('success', 'Data users berhasil dihapus.');
    }

    public function userEdit(string $id)
    {
        $user = User::findorfails($id);
        return Inertia::render('Profile/edit', ['user' => $user]);
    }
    public function userUpdate(Request $request, $id)
    {
        $user = User::findOrFail($id);
    
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'avatar' => 'nullable|image|max:2048',
        ]);
    
        $user->name = $request->name;
        $user->email = $request->email;
    
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $avatarPath;
        }
    
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
    
        $user->save();
    
        return redirect()->route('profile.index')->with('success', 'Profile updated successfully.');
    }    
}
