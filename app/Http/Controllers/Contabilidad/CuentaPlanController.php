<?php

namespace App\Http\Controllers\Contabilidad;

use App\Http\Controllers\Controller;
use App\Models\Contabilidad\CuentaPlan;
use App\Models\Contabilidad\CuentaPlanTipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CuentaPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( Request $request )
    {
        try {
            
            $cuenplan = new CuentaPlan();
            $arraycuentaplan = $cuenplan->get_data( $cuenplan, $request );
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Servicio realizado exitosamente",
                "arrayCuentaPlan" => $arraycuentaplan,
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

            $cuenpltipo = new CuentaPlanTipo();
            $arraycuentaplantipo = $cuenpltipo->get_data( $cuenpltipo, $request );
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Servicio realizado exitosamente",
                "arrayCuentaPlanTipo" => $arraycuentaplantipo,
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
                'fkidcuentaplanpadre' => "nullable|numeric",
                'fkidcuentaplantipo'  => "nullable|numeric",

                'codigo'      => "required",
                'descripcion' => "required|max:300",
                'nivel'       => "required|numeric",

                'x_idusuario' => "nullable|numeric",
                'x_fecha'     => "required|date",
                'x_hora'      => "required|date_format:H:i:s",
            ];

            $messages = [
                "fkidcuentaplanpadre.numeric" => "Campo permite tipo número",
                "fkidcuentaplantipo.numeric"  => "Campo permite tipo número",

                "codigo.required" => "Campo requerido",

                "descripcion.required" => "Campo requerido",
                "descripcion.max"      => "Se permite máximo 300 caracteres",

                "nivel.required" => "Campo requerido",
                "nivel.numeric"   => "Campo permite tipo número",

                "x_idusuario.numeric" => "Campo permite tipo número",

                "x_fecha.required" => "Campo requerido",
                "x_fecha.date"     => "Campo permite tipo fecha",

                "x_hora.required" => "Campo requerido",
                "x_hora.time"     => "Campo permite tipo hora",
            ];

            $validator = Validator::make( $request->all(), $rules, $messages );

            if ( $validator->fails() ) {

                return response()->json( [
                    "rpta" => -1,
                    "message" => "Advertencia llenar campos requeridos",
                    "errors" => $validator->errors(),
                ] );
            }

            $cuenplan = new CuentaPlan();
            $cuentaplan = $cuenplan->guardar( $cuenplan, $request );
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Cuenta Plan creado exitosamente",
                "cuentaplan" => $cuentaplan,
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
    public function show( Request $request, $idcuentaplan )
    {
        try {

            $cuenplan = new CuentaPlan();
            $cuentaplan = $cuenplan->detalle( $cuenplan, $idcuentaplan );

            if ( is_null( $cuentaplan ) ) {
                return response()->json( [
                    "rpta" => -1,
                    "message" => "Cuenta Plan no existente",
                ] );
            }
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Servicio realizado exitosamente",
                "cuentaplan" => $cuentaplan,
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
    public function edit( Request $request, $idcuentaplan )
    {
        try {

            $cuenplan = new CuentaPlan();
            $cuentaplan = $cuenplan->detalle( $cuenplan, $idcuentaplan );

            if ( is_null( $cuentaplan ) ) {
                return response()->json( [
                    "rpta" => -1,
                    "message" => "Cuenta Plan no existente",
                ] );
            }

            $cuenpltipo = new CuentaPlanTipo();
            $arraycuentaplantipo = $cuenpltipo->get_data( $cuenpltipo, $request );
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Servicio realizado exitosamente",
                "cuentaplan" => $cuentaplan,
                "arrayCuentaPlanTipo" => $arraycuentaplantipo,
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
                'idcuentaplan' => "required|numeric",

                'fkidcuentaplanpadre' => "nullable|numeric",
                'fkidcuentaplantipo'  => "nullable|numeric",

                'codigo'      => "required",
                'descripcion' => "required|max:300",
                'nivel'       => "required|numeric",
            ];

            $messages = [
                "idcuentaplan.required" => "Campo requerido",
                "idcuentaplan.numeric"   => "Campo permite tipo número",

                "fkidcuentaplanpadre.numeric" => "Campo permite tipo número",
                "fkidcuentaplantipo.numeric"  => "Campo permite tipo número",

                "codigo.required" => "Campo requerido",

                "descripcion.required" => "Campo requerido",
                "descripcion.max"      => "Se permite máximo 300 caracteres",

                "nivel.required" => "Campo requerido",
                "nivel.numeric"   => "Campo permite tipo número",

            ];

            $validator = Validator::make( $request->all(), $rules, $messages );

            if ( $validator->fails() ) {

                return response()->json( [
                    "rpta" => -1,
                    "message" => "Advertencia llenar campos requeridos",
                    "errors" => $validator->errors(),
                ] );
            }

            $cuenplan = new CuentaPlan();

            if ( is_null( $cuenplan->find( $request->idcuentaplan ) ) ) {
                
                return response()->json( [
                    "rpta" => 0,
                    "message" => "Cuenta Plan no existente.",
                ] );
            }
            $cuentaplan = $cuenplan->actualizar( $cuenplan, $request );
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Cuenta Plan actualizado exitosamente",
                "cuentaplan" => $cuentaplan,
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
    public function destroy( Request $request, $idcuentaplan )
    {
        try {

            $cuenplan = new CuentaPlan();
            $cuentaplan = $cuenplan->find( $idcuentaplan );

            if ( is_null( $cuentaplan ) ) {
                return response()->json( [
                    "rpta" => -1,
                    "message" => "Tipo Cuenta Plan no existente",
                ] );
            }

            if ( $cuentaplan->isdelete == "N" ) {
                return response()->json( [
                    "rpta" => 0,
                    "message" => "Cuenta Plan no permitido eliminar.",
                ] );
            }

            $getcuentaplanhijo = $cuenplan
                ->where( 'fkidcuentaplanpadre', '=', $cuentaplan->idcuentaplan )
                ->get();

            if ( sizeof( $getcuentaplanhijo ) > 0 ) {
                return response()->json( [
                    "rpta" => 0,
                    "message" => "Cuenta Plan no permitido eliminar.",
                ] );
            }

            $cuentaplandelete = $cuentaplan->delete();
            
            return response()->json( [
                "rpta" => 1,
                "message" => "Cuenta Plan eliminado exitosamente",
                "cuentaplan" => $cuentaplandelete,
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
