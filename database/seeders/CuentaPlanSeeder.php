<?php

namespace Database\Seeders;

use App\Models\Contabilidad\CuentaPlan;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CuentaPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ( $this->get_data() as $data ) {
            CuentaPlan::create( $data );
        }
    }

    public function get_data() {
        $mytime = new Carbon("America/La_Paz");
        return [
            [
                "fkidcuentaplantipo"  => 1,
                "fkidcuentaplanpadre" => null,

                "codigo" => "1",
                "descripcion" => "Activo",
                "nivel" => "1",

                "x_idusuario" => null,

                "x_fecha" => $mytime->toDateString(),
                "x_hora"  => $mytime->toTimeString(),
                
                "isdelete" => "N",
                "estado"   => "A",
            ],
            [
                "fkidcuentaplantipo"  => 1,
                "fkidcuentaplanpadre" => null,

                "codigo" => "1",
                "descripcion" => "Pasivo",
                "nivel" => "1",

                "x_idusuario" => null,

                "x_fecha" => $mytime->toDateString(),
                "x_hora"  => $mytime->toTimeString(),
                
                "isdelete" => "N",
                "estado"   => "A",
            ],
            [
                "fkidcuentaplantipo"  => 1,
                "fkidcuentaplanpadre" => null,

                "codigo" => "1",
                "descripcion" => "Patrimonio",
                "nivel" => "1",

                "x_idusuario" => null,

                "x_fecha" => $mytime->toDateString(),
                "x_hora"  => $mytime->toTimeString(),
                
                "isdelete" => "N",
                "estado"   => "A",
            ],
            [
                "fkidcuentaplantipo"  => 1,
                "fkidcuentaplanpadre" => null,

                "codigo" => "1",
                "descripcion" => "Ingresos",
                "nivel" => "1",

                "x_idusuario" => null,

                "x_fecha" => $mytime->toDateString(),
                "x_hora"  => $mytime->toTimeString(),
                
                "isdelete" => "N",
                "estado"   => "A",
            ],
            [
                "fkidcuentaplantipo"  => 1,
                "fkidcuentaplanpadre" => null,

                "codigo" => "1",
                "descripcion" => "Costos",
                "nivel" => "1",

                "x_idusuario" => null,

                "x_fecha" => $mytime->toDateString(),
                "x_hora"  => $mytime->toTimeString(),
                
                "isdelete" => "N",
                "estado"   => "A",
            ],
            [
                "fkidcuentaplantipo"  => 1,
                "fkidcuentaplanpadre" => null,

                "codigo" => "1",
                "descripcion" => "Gastos",
                "nivel" => "1",

                "x_idusuario" => null,

                "x_fecha" => $mytime->toDateString(),
                "x_hora"  => $mytime->toTimeString(),
                
                "isdelete" => "N",
                "estado"   => "A",
            ],
        ];
    }
    
}
