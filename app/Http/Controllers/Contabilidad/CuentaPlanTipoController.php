<?php

namespace App\Http\Controllers\Contabilidad;

use App\Http\Controllers\Controller;
use App\Models\Contabilidad\CuentaPlan;
use App\Models\Contabilidad\CuentaPlanTipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CuentaPlanTipoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( Request $request )
    {
        try {
            
            $cuenpltipo = new CuentaPlanTipo();
            $arraycuentaplantipo = $cuenpltipo->get_paginate( $cuenpltipo, $request );
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Servicio realizado exitosamente",
                "arrayCuentaPlanTipo" => $arraycuentaplantipo->getCollection(),
                "pagination" => [
                    "total" => $arraycuentaplantipo->total(),
                ],
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
                'descripcion' => "required|max:150",
                'x_idusuario' => "nullable|number",
                'x_fecha' => "required|date",
                'x_hora' => "required|date_format:H:i:s",
            ];

            $messages = [
                "descripcion.required" => "Campo requerido",
                "descripcion.max" => "Se permite máximo 150 caracteres",

                "x_idusuario.number" => "Campo permite tipo número",

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

            $cuenpltipo = new CuentaPlanTipo();
            $cuentaplantipo = $cuenpltipo->guardar( $cuenpltipo, $request );
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Tipo Cuenta Plan creado exitosamente",
                "cuentaplantipo" => $cuentaplantipo,
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
    public function show( Request $request, $idcuentaplantipo )
    {
        try {

            $cuenpltipo = new CuentaPlanTipo();
            $cuentaplantipo = $cuenpltipo->detalle( $cuenpltipo, $idcuentaplantipo );

            if ( is_null( $cuentaplantipo ) ) {
                return response()->json( [
                    "rpta" => -1,
                    "message" => "Tipo Cuenta Plan no existente",
                ] );
            }
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Servicio realizado exitosamente",
                "cuentaplantipo" => $cuentaplantipo,
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
    public function edit( Request $request, $idcuentaplantipo )
    {
        try {

            $cuenpltipo = new CuentaPlanTipo();
            $cuentaplantipo = $cuenpltipo->detalle( $cuenpltipo, $idcuentaplantipo );

            if ( is_null( $cuentaplantipo ) ) {
                return response()->json( [
                    "rpta" => -1,
                    "message" => "Tipo Cuenta Plan no existente",
                ] );
            }
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Servicio realizado exitosamente",
                "cuentaplantipo" => $cuentaplantipo,
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
                'idcuentaplantipo' => "required|number",
                'descripcion' => "required|max:150",
            ];

            $messages = [
                "idcuentaplantipo.required" => "Campo requerido",
                "idcuentaplantipo.number" => "Campo permite tipo número",

                "descripcion.required" => "Campo requerido",
                "descripcion.max" => "Se permite máximo 150 caracteres",
            ];

            $validator = Validator::make( $request->all(), $rules, $messages );

            if ( $validator->fails() ) {

                return response()->json( [
                    "rpta" => -1,
                    "message" => "Advertencia llenar campos requeridos",
                    "errors" => $validator->errors(),
                ] );
            }

            $cuenpltipo = new CuentaPlanTipo();

            if ( is_null( $cuenpltipo->find( $request->idcuentaplantipo ) ) ) {
                
                return response()->json( [
                    "rpta" => 0,
                    "message" => "Tipo Cuenta Plan no existente.",
                ] );
            }
            $cuentaplantipo = $cuenpltipo->actualizar( $cuenpltipo, $request );
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Tipo Cuenta Plan actualizado exitosamente",
                "cuentaplantipo" => $cuentaplantipo,
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
    public function destroy( Request $request, $idcuentaplantipo )
    {
        try {

            $cuenpltipo = new CuentaPlanTipo();
            $cuentaplantipo = $cuenpltipo->find( $idcuentaplantipo );

            if ( is_null( $cuentaplantipo ) ) {
                return response()->json( [
                    "rpta" => -1,
                    "message" => "Tipo Cuenta Plan no existente",
                ] );
            }

            if ( $cuentaplantipo->isdelete == "N" ) {
                return response()->json( [
                    "rpta" => 0,
                    "message" => "Tipo Cuenta Plan no permitido eliminar.",
                ] );
            }

            $cuenplan = new CuentaPlan();
            $getcuentaplan = $cuenplan
                ->where( 'fkidcuentaplantipo', '=', $cuentaplantipo->idcuentaplantipo )
                ->get();

            if ( sizeof( $getcuentaplan ) > 0 ) {
                return response()->json( [
                    "rpta" => 0,
                    "message" => "Tipo Cuenta Plan no permitido eliminar.",
                ] );
            }

            $cuentaplantipodelete = $cuentaplantipo->delete();
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Tipo Cuenta Plan eliminado exitosamente",
                "cuentaplantipo" => $cuentaplantipodelete,
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
