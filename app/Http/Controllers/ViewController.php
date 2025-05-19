<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ViewController extends Controller
{
    /**
     * Display the main page.
     */
    public function index(): Response
    {
        return Inertia::render('Books/Index');
    }
}
