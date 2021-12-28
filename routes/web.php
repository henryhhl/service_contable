<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/plancuenta/index', [App\Http\Controllers\HomeController::class, 'index']);

Route::get('/plancuentatipo/index', [App\Http\Controllers\HomeController::class, 'index']);

Route::get('/formulario/index', [App\Http\Controllers\HomeController::class, 'index']);
Route::get('/formulario/create', [App\Http\Controllers\HomeController::class, 'index']);
Route::get('/formulario/edit/{idformulario}', [App\Http\Controllers\HomeController::class, 'index']);
Route::get('/formulario/show/{idformulario}', [App\Http\Controllers\HomeController::class, 'index']);

Route::get('/grupousuario/index', [App\Http\Controllers\HomeController::class, 'index']);
Route::get('/grupousuario/create', [App\Http\Controllers\HomeController::class, 'index']);
Route::get('/grupousuario/edit/{idgrupousuario}', [App\Http\Controllers\HomeController::class, 'index']);
Route::get('/grupousuario/show/{idgrupousuario}', [App\Http\Controllers\HomeController::class, 'index']);

Route::get('/usuario/index', [App\Http\Controllers\HomeController::class, 'index']);
Route::get('/usuario/create', [App\Http\Controllers\HomeController::class, 'index']);
Route::get('/usuario/edit/{idusuario}', [App\Http\Controllers\HomeController::class, 'index']);
Route::get('/usuario/show/{idusuario}', [App\Http\Controllers\HomeController::class, 'index']);

Route::get('/usuario/asignar', [App\Http\Controllers\HomeController::class, 'index']);
