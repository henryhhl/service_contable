<?php

namespace App\Models\Contabilidad;

use App\Models\Functions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CuentaPlanTipo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "cuentaplantipo";
    protected $primaryKey = "idcuentaplantipo";

    public $timestamps = true;

    protected $dates = [
        "created_at", "updated_at", "deleted_at",
    ];

    protected $attributes = [
        "x_idusuario" => null,
        "isdelete" => "A", "estado" => "A",
    ];
    
    protected $fillable = [
        "descripcion",
        "x_idusuario", "x_fecha", "x_hora", "isdelete", "estado",
    ];

    public function get_data( $query, $request ) {

        $search = isset( $request->search ) ? $request->search : null;
        $order = isset( $request->order ) ? $request->order : "ASC";
        $column = isset( $request->column ) ? $request->column : "idcuentaplantipo";

        $functions = new Functions();

        if ( strtoupper( $order ) !== "DESC" ) $order = "ASC";

        $cuentaplantipo = $query
            ->select( [
                'idcuentaplantipo', 'descripcion',
                'estado', 'isdelete', 'x_fecha', 'x_hora',
            ] )
            ->where( function ( $query ) use ( $search, $functions ) {
                if ( !is_null( $search ) ) {
                    return $query->where( 'descripcion', $functions->isLikeOrIlike(), "%" . $search . "%" );
                }
                return;
            } )
            ->orderBy( $column, $order )
            ->get();

        return $cuentaplantipo;
    }

    public function get_paginate( $query, $request ) {

        $search    = isset( $request->search ) ? $request->search : null;
        $order     = isset( $request->order ) ? $request->order : "ASC";
        $column    = isset( $request->column ) ? $request->column : "idcuentaplantipo";
        $paginate  = isset( $request->search ) ? $request->search : 10;

        $functions = new Functions();

        if ( strtoupper( $order ) !== "DESC" ) $order = "ASC";
        if ( !is_numeric( $paginate ) ) $paginate = 10;

        $cuentaplantipo = $query
            ->select( [
                'idcuentaplantipo', 'descripcion',
                'estado', 'isdelete', 'x_fecha', 'x_hora',
            ] )
            ->where( function ( $query ) use ( $search, $functions ) {
                if ( !is_null( $search ) ) {
                    return $query->where( 'descripcion', $functions->isLikeOrIlike(), "%" . $search . "%" );
                }
                return;
            } )
            ->orderBy( $column, $order )
            ->paginate($paginate);

        return $cuentaplantipo;
    }

    public function guardar( $query, $request ) 
    {
        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;

        $x_idusuario  = isset( $request->x_idusuario ) ? $request->x_idusuario : null;
        $x_fecha      = isset( $request->x_fecha ) ? $request->x_fecha : null;
        $x_hora       = isset( $request->x_hora ) ? $request->x_hora : null;

        $cuentaplantipo = $query->create( [
            'descripcion' => $descripcion,

            'x_idusuario' => $x_idusuario,
            'x_fecha'     => $x_fecha,
            'x_hora'      => $x_hora,
        ] );

        return $cuentaplantipo;
    }

    public function actualizar( $query, $request ) 
    {
        $idcuentaplantipo  = isset( $request->idcuentaplantipo ) ? $request->idcuentaplantipo : null;
        $descripcion  = isset( $request->descripcion ) ? $request->descripcion : null;

        $cuentaplantipo = $query->where( 'idcuentaplantipo', '=', $idcuentaplantipo )
            ->update( [
                'descripcion' => $descripcion,
            ] );

        return $cuentaplantipo;
    }

    public function detalle( $query, $idcuentaplantipo )
    {

        $cuentaplantipo = $query
            ->select( [
                'idcuentaplantipo', 'descripcion',
                'estado', 'isdelete', 'x_fecha', 'x_hora',
            ] )
            ->where( 'idcuentaplantipo', '=', $idcuentaplantipo )
            ->orderBy( 'idcuentaplantipo', 'ASC' )
            ->first();

        return $cuentaplantipo;
    }

}
