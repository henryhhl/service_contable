<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCuentaplanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cuentaplan', function (Blueprint $table) {
            $table->id("idcuentaplan");
            $table->integer("fkidcuentaplanpadre")->unsigned()->nullable();
            $table->integer("fkidcuentaplantipo")->unsigned()->nullable();
            $table->integer("x_idusuario")->unsigned()->nullable();

            $table->text("codigo");
            $table->string("descripcion", 300);
            $table->integer("nivel")->default(0);

            $table->date("x_fecha");
            $table->time("x_hora");
            $table->enum("isdelete", ["A", "N"])->default("A");
            $table->enum("estado", ["A", "N"])->default("A");

            $table->timestamps();
            $table->softDeletes();
            // $table->foreign("fkidcuentaplanpadre")->references("idcuentaplan")->on("cuentaplan")->onDelete("cascade")->onUpdate("cascade");
            // $table->foreign("fkidcuentaplantipo")->references("idcuentaplantipo")->on("cuentaplantipo")->onDelete("cascade")->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cuentaplan');
    }
}
