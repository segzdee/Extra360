<?php

namespace App\Controllers\Api\Auth;

use App\Controllers\BaseController;
use Illuminate\Http\Request;

class AuthController extends BaseController
{
    public function login(Request $request)
    {
        // Validate request
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('auth-token')->plainTextToken;
            return $this->response(['token' => $token], 'Login successful');
        }

        return $this->error('Invalid credentials', 401);
    }

    public function register(Request $request)
    {
        // Registration logic
        return $this->response(null, 'Registration successful');
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return $this->response(null, 'Logged out successfully');
    }
}
