<?php

namespace App\Http\Controllers;

class OpenAPIController extends Controller
{
    public function getSpec()
    {
        $path = public_path('openapi.json');

        return response()->file($path);
    }

    public function index()
    {
        return view('swagger');
    }
}
