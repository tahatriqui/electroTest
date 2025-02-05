<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function registerr(Request $request)
    {
        // Création de l'utilisateur
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
    }

      public function login(Request $request)
    {
                try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Email ou mot de passe incorrect.'], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json(['token' => $token], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
