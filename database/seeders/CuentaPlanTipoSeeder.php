<?php

namespace Database\Seeders;

use App\Models\Contabilidad\CuentaPlanTipo;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CuentaPlanTipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ( $this->get_data() as $data ) {
            CuentaPlanTipo::create( $data );
        }
    }

    public function get_data() {
        $mytime = new Carbon("America/La_Paz");
        return [
            [
                "descripcion" => "Ninguno",
                "x_idusuario" => null,

                "x_fecha" => $mytime->toDateString(),
                "x_hora"  => $mytime->toTimeString(),
                
                "isdelete" => "N",
                "estado"   => "A",
            ]
        ];
    }
}
