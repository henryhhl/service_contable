<?php

namespace App\Http\Controllers\Seguridad;

use App\Http\Controllers\Controller;
use App\Models\Functions;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( Request $request )
    {
        try {

            $search    = isset( $request->search ) ? $request->search : null;
            $order     = isset( $request->order ) ? $request->order : "ASC";
            $column    = isset( $request->column ) ? $request->column : "idusers";
            $paginate  = isset( $request->search ) ? $request->search : 10;

            $functions = new Functions();

            if ( strtoupper( $order ) !== "DESC" ) $order = "ASC";
            if ( !is_numeric( $paginate ) ) $paginate = 10;
            
            $user = new User();

            $arrayusuario = $user
                ->select( [
                    'idusers', 'nombre', 'apellido', 'email', 'login', 'imagen',
                    'estado', 'isdelete', 'x_fecha', 'x_hora',
                    DB::raw( "CONCAT(nombre, ' ', apellido) as nombrecompleto" )
                ] )
                ->where( function ( $query ) use ( $search, $functions ) {
                    if ( !is_null( $search ) ) {
                        return $query
                            ->where( 'nombre', $functions->isLikeOrIlike(), "%" . $search . "%" )
                            ->orWhere( 'apellido', $functions->isLikeOrIlike(), "%" . $search . "%" )
                            ->orWhere( DB::raw( "CONCAT(nombre, ' ', apellido)" ), $functions->isLikeOrIlike(), "%" . $search . "%" )
                            ->orWhere( 'email', $functions->isLikeOrIlike(), "%" . $search . "%" )
                            ->orWhere( 'login', $functions->isLikeOrIlike(), "%" . $search . "%" );
                    }
                    return;
                } )
                ->orderBy( $column, $order )
                ->get();
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Servicio realizado exitosamente",
                "arrayUsuario" => $arrayusuario,
            ] );

        } catch (\Throwable $th) {
            return response()->json( [
                'rpta' => -5,
                "message" => "Error al realizar servicio",
                "errors" => [
                    "file" => $th->getFile(),
                    "line" => $th->getLine(),
                    "message" => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create( Request $request )
    {
        try {
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Servicio realizado exitosamente",
            ] );

        } catch (\Throwable $th) {
            return response()->json( [
                'rpta' => -5,
                "message" => "Error al realizar servicio",
                "errors" => [
                    "file" => $th->getFile(),
                    "line" => $th->getLine(),
                    "message" => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( Request $request )
    {
        try {

            $rules = [
                'nombre' => "required|max:150",
                'apellido' => "required|max:250",

                'email' => "required|max:350",
                'login' => "required|max:350",
                'password' => "required|min:6|max:150",

                'x_idusuario' => "nullable|numeric",
                'x_fecha' => "required|date",
                'x_hora' => "required|date_format:H:i:s",
            ];

            $messages = [
                "nombre.required" => "Campo requerido",
                "nombre.max" => "Se permite máximo 150 caracteres",

                "apellido.required" => "Campo requerido",
                "apellido.max" => "Se permite máximo 250 caracteres",

                "email.required" => "Campo requerido",
                "email.max" => "Se permite máximo 350 caracteres",

                "login.required" => "Campo requerido",
                "login.max" => "Se permite máximo 350 caracteres",

                "password.required" => "Campo requerido",
                "password.max" => "Se permite máximo 150 caracteres",
                "password.min" => "Se permite minimo 6 caracteres",

                "x_idusuario.numeric" => "Campo permite tipo número",

                "x_fecha.required" => "Campo requerido",
                "x_fecha.date" => "Campo permite tipo fecha",

                "x_hora.required" => "Campo requerido",
                "x_hora.date_format" => "Campo permite tipo hora",
            ];

            $validator = Validator::make( $request->all(), $rules, $messages );

            if ( $validator->fails() ) {

                return response()->json( [
                    "rpta" => -1,
                    "message" => "Advertencia llenar campos requeridos",
                    "errors" => $validator->errors(),
                ] );
            }

            $arrayExistLogin = DB::table('users')
                ->where('login', '=', $request->login)
                ->get();

            if ( sizeof($arrayExistLogin) > 0 ) {
                return response()->json( [
                    "rpta" => 0,
                    "message" => "Usuario ya existe.",
                ] );
            }

            $nombre   = isset( $request->nombre ) ? $request->nombre : null;
            $apellido = isset( $request->apellido ) ? $request->apellido : null;

            $email = isset( $request->email ) ? $request->email : null;
            $login = isset( $request->login ) ? $request->login : null;
            $imagen = isset( $request->imagen ) ? $request->imagen : null;

            $password = isset( $request->password ) ? $request->password : null;

            $x_idusuario  = isset( $request->x_idusuario ) ? $request->x_idusuario : null;
            $x_fecha      = isset( $request->x_fecha ) ? $request->x_fecha : null;
            $x_hora       = isset( $request->x_hora ) ? $request->x_hora : null;

            $usuario = new User();
            $usuario->nombre = $nombre;
            $usuario->apellido = $apellido;
            $usuario->imagen = $imagen;
            $usuario->email = $email;
            $usuario->login = $login;
            $usuario->password = bcrypt($password);

            $usuario->x_idusuario = $x_idusuario;
            $usuario->x_fecha = $x_fecha;
            $usuario->x_hora = $x_hora;

            $usuario->save();
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Usuario creado exitosamente",
                "usuario" => $usuario,
            ] );

        } catch (\Throwable $th) {
            return response()->json( [
                'rpta' => -5,
                "message" => "Error al realizar servicio",
                "errors" => [
                    "file" => $th->getFile(),
                    "line" => $th->getLine(),
                    "message" => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( Request $request, $idusuario )
    {
        try {

            $user = new User();

            $usuario = $user
                ->select( [
                    'idusers', 'nombre', 'apellido', 'email', 'login', 'imagen',
                    'estado', 'isdelete', 'x_fecha', 'x_hora',
                ] )
                ->where('idusers', '=', $idusuario)
                ->orderBy('idusers', 'ASC')
                ->first();

            if ( is_null( $usuario ) ) {
                return response()->json( [
                    "rpta" => -1,
                    "message" => "Usuario no existente",
                ] );
            }
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Servicio realizado exitosamente",
                "usuario" => $usuario,
            ] );

        } catch (\Throwable $th) {
            return response()->json( [
                'rpta' => -5,
                "message" => "Error al realizar servicio",
                "errors" => [
                    "file" => $th->getFile(),
                    "line" => $th->getLine(),
                    "message" => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit( Request $request, $idusuario )
    {
        try {

            $user = new User();

            $usuario = $user
                ->select( [
                    'idusers', 'nombre', 'apellido', 'email', 'login', 'imagen',
                    'estado', 'isdelete', 'x_fecha', 'x_hora',
                ] )
                ->where('idusers', '=', $idusuario)
                ->orderBy('idusers', 'ASC')
                ->first();

            if ( is_null( $usuario ) ) {
                return response()->json( [
                    "rpta" => -1,
                    "message" => "Usuario no existente",
                ] );
            }
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Servicio realizado exitosamente",
                "usuario" => $usuario,
            ] );

        } catch (\Throwable $th) {
            return response()->json( [
                'rpta' => -5,
                "message" => "Error al realizar servicio",
                "errors" => [
                    "file" => $th->getFile(),
                    "line" => $th->getLine(),
                    "message" => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update( Request $request )
    {
        try {

            $rules = [
                'idusers' => "required|numeric",
                'nombre' => "required|max:150",
                'apellido' => "required|max:250",

                'email' => "required|max:350",
                'password' => "nullable|min:6|max:150",
            ];

            $messages = [
                "idusers.required" => "Campo requerido",
                "idusers.numeric" => "Campo permite tipo número",

                "nombre.required" => "Campo requerido",
                "nombre.max" => "Se permite máximo 150 caracteres",

                "apellido.required" => "Campo requerido",
                "apellido.max" => "Se permite máximo 250 caracteres",

                "email.required" => "Campo requerido",
                "email.max" => "Se permite máximo 350 caracteres",

                "password.max" => "Se permite máximo 150 caracteres",
                "password.min" => "Se permite minimo 6 caracteres",

            ];

            $validator = Validator::make( $request->all(), $rules, $messages );

            if ( $validator->fails() ) {

                return response()->json( [
                    "rpta" => -1,
                    "message" => "Advertencia llenar campos requeridos",
                    "errors" => $validator->errors(),
                ] );
            }


            $nombre   = isset( $request->nombre ) ? $request->nombre : null;
            $apellido = isset( $request->apellido ) ? $request->apellido : null;

            $email = isset( $request->email ) ? $request->email : null;
            $imagen = isset( $request->imagen ) ? $request->imagen : null;
            $password = isset( $request->password ) ? $request->password : null;

            $user = new User();
            $usuario = $user->find( $request->idusers );

            if ( is_null( $usuario ) ) {
                
                return response()->json( [
                    "rpta" => 0,
                    "message" => "Usuario no existente.",
                ] );
            }

            $usuario->nombre = $nombre;
            $usuario->apellido = $apellido;
            $usuario->imagen = $imagen;
            $usuario->email = $email;
            $usuario->password = bcrypt($password);

            $usuario->update();
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Usuario creado exitosamente",
                "usuario" => $usuario,
            ] );

        } catch (\Throwable $th) {
            return response()->json( [
                'rpta' => -5,
                "message" => "Error al realizar servicio",
                "errors" => [
                    "file" => $th->getFile(),
                    "line" => $th->getLine(),
                    "message" => $th->getMessage(),
                ],
            ] );
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy( $idusuario )
    {
        try {

            $user = new User();
            $usuario = $user->find( $idusuario );

            if ( is_null( $usuario ) ) {
                return response()->json( [
                    "rpta" => -1,
                    "message" => "Usuario no existente",
                ] );
            }

            if ( $usuario->isdelete == "N" ) {
                return response()->json( [
                    "rpta" => 0,
                    "message" => "Usuario no permitido eliminar.",
                ] );
            }

            $usuariodelete = $usuario->delete();
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Usuario eliminado exitosamente",
                "usuario" => $usuariodelete,
            ] );

        } catch (\Throwable $th) {
            return response()->json( [
                'rpta' => -5,
                "message" => "Error al realizar servicio",
                "errors" => [
                    "file" => $th->getFile(),
                    "line" => $th->getLine(),
                    "message" => $th->getMessage(),
                ],
            ] );
        }
    }
}
