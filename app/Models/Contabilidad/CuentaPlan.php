<?php

namespace App\Models\Contabilidad;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CuentaPlan extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "cuentaplan";
    protected $primaryKey = "idcuentaplan";

    public $timestamps = true;

    protected $dates = [
        "created_at", "updated_at", "deleted_at",
    ];

    protected $attributes = [
        "fkidcuentaplanpadre" => null, "fkidcuentaplantipo" => null, "nivel" => 0,
        "x_idusuario" => null,
        "isdelete" => "A", "estado" => "A",
    ];
    
    protected $fillable = [
        "fkidcuentaplanpadre", "fkidcuentaplantipo", "codigo", "descripcion", "nivel",
        "x_idusuario", "x_fecha", "x_hora", "isdelete", "estado",
    ];

    public function get_data( $query, $request ) {

        $search = isset( $request->search ) ? $request->search : null;
        $order = isset( $request->order ) ? $request->order : "ASC";
        $column = isset( $request->column ) ? $request->column : "cuentaplan.idcuentaplan";

        $functions = new Functions();

        if ( strtoupper( $order ) !== "DESC" ) $order = "ASC";

        $cuentaplan = $query
            ->select( [
                'cuentaplan.idcuentaplan', 'cuentaplan.fkidcuentaplanpadre', 'cuentaplan.fkidcuentaplantipo', 
                'cuentaplan.codigo', 'cuentaplan.descripcion', 'cuentaplan.nivel',
                'cuentaplan.estado', 'cuentaplan.isdelete', 'cuentaplan.x_fecha', 'cuentaplan.x_hora',
                'tipo.descripcion as cuentaplantipo'
            ] )
            ->leftJoin('cuentaplantipo as tipo', 'cuentaplan.fkidcuentaplantipo', '=', 'tipo.idcuentaplantipo')
            ->where( function ( $query ) use ( $search, $functions ) {
                if ( !is_null( $search ) ) {
                    return $query->where( 'cuentaplan.descripcion', $functions->isLikeOrIlike(), "%" . $search . "%" );
                }
                return;
            } )
            ->orderBy( $column, $order )
            ->get();

        return $cuentaplan;
    }

    public function get_paginate( $query, $request ) {

        $search = isset( $request->search ) ? $request->search : null;
        $order = isset( $request->order ) ? $request->order : "ASC";
        $column = isset( $request->column ) ? $request->column : "cuentaplan.idcuentaplan";
        $paginate  = isset( $request->search ) ? $request->search : 10;

        $functions = new Functions();

        if ( strtoupper( $order ) !== "DESC" ) $order = "ASC";
        if ( !is_numeric( $paginate ) ) $paginate = 10;

        $cuentaplan = $query
            ->select( [
                'cuentaplan.idcuentaplan', 'cuentaplan.fkidcuentaplanpadre', 'cuentaplan.fkidcuentaplantipo', 
                'cuentaplan.codigo', 'cuentaplan.descripcion', 'cuentaplan.nivel',
                'cuentaplan.estado', 'cuentaplan.isdelete', 'cuentaplan.x_fecha', 'cuentaplan.x_hora',
                'tipo.descripcion as cuentaplantipo'
            ] )
            ->leftJoin('cuentaplantipo as tipo', 'cuentaplan.fkidcuentaplantipo', '=', 'tipo.idcuentaplantipo')
            ->where( function ( $query ) use ( $search, $functions ) {
                if ( !is_null( $search ) ) {
                    return $query->where( 'cuentaplan.descripcion', $functions->isLikeOrIlike(), "%" . $search . "%" );
                }
                return;
            } )
            ->orderBy( $column, $order )
            ->paginate($paginate);

        return $cuentaplan;
    }

    public function guardar( $query, $request ) 
    {
        $fkidcuentaplanpadre  = isset( $request->fkidcuentaplanpadre ) ? $request->fkidcuentaplanpadre : null;
        $fkidcuentaplantipo  = isset( $request->fkidcuentaplantipo ) ? $request->fkidcuentaplantipo : null;

        $codigo  = isset( $request->codigo ) ? $request->codigo : null;
        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;
        $nivel  = isset( $request->nivel ) ? $request->nivel : null;

        $x_idusuario  = isset( $request->x_idusuario ) ? $request->x_idusuario : null;
        $x_fecha      = isset( $request->x_fecha ) ? $request->x_fecha : null;
        $x_hora       = isset( $request->x_hora ) ? $request->x_hora : null;

        $cuentaplan = $query->create( [
            'fkidcuentaplanpadre' => $fkidcuentaplanpadre,
            'fkidcuentaplantipo'  => $fkidcuentaplantipo,
            
            'codigo'      => $codigo,
            'descripcion' => $descripcion,
            'nivel'       => $nivel,

            'x_idusuario' => $x_idusuario,
            'x_fecha'     => $x_fecha,
            'x_hora'      => $x_hora,
        ] );

        return $cuentaplan;
    }

    public function actualizar( $query, $request ) 
    {
        $idcuentaplan  = isset( $request->idcuentaplan ) ? $request->idcuentaplan : null;

        $fkidcuentaplanpadre  = isset( $request->fkidcuentaplanpadre ) ? $request->fkidcuentaplanpadre : null;
        $fkidcuentaplantipo  = isset( $request->fkidcuentaplantipo ) ? $request->fkidcuentaplantipo : null;

        $codigo  = isset( $request->codigo ) ? $request->codigo : null;
        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;
        $nivel  = isset( $request->nivel ) ? $request->nivel : null;

        $cuentaplan = $query->where( 'idcuentaplan', '=', $idcuentaplan )
            ->update( [
                'fkidcuentaplanpadre' => $fkidcuentaplanpadre,
                'fkidcuentaplantipo'  => $fkidcuentaplantipo,
                
                'codigo'      => $codigo,
                'descripcion' => $descripcion,
                'nivel'       => $nivel,
            ] );

        return $cuentaplan;
    }

    public function detalle( $query, $idcuentaplan )
    {

        $cuentaplan = $query
            ->select( [
                'cuentaplan.idcuentaplan', 'cuentaplan.fkidcuentaplanpadre', 'cuentaplan.fkidcuentaplantipo', 
                'cuentaplan.codigo', 'cuentaplan.descripcion', 'cuentaplan.nivel',
                'cuentaplan.estado', 'cuentaplan.isdelete', 'cuentaplan.x_fecha', 'cuentaplan.x_hora',
                'tipo.descripcion as cuentaplantipo'
            ] )
            ->leftJoin('cuentaplantipo as tipo', 'cuentaplan.fkidcuentaplantipo', '=', 'tipo.idcuentaplantipo')
            ->where( 'cuentaplan.idcuentaplan', '=', $idcuentaplan )
            ->orderBy( 'cuentaplan.idcuentaplan', 'ASC' )
            ->first();

        return $cuentaplan;
    }

}
