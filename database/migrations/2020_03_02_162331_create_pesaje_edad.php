<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePesajeEdad extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pesaje_galpon', function( Blueprint $table ){

            $table->increments( 'id' );
            $table->date( 'fecha' );
            $table->string( 'cod_grupo' );
            $table->integer( 'edad_id' );
            $table->smallInteger( 'estado' );
            $table->text( 'observacion' );
            $table->timestamps();
        });

        Schema::create('pesaje_galpon_pollita', function( Blueprint $table )
        {
            $table->increments( 'id' );
            $table->string( 'codigo_referencia' )->nullable();
            $table->float( 'peso', 12, 2 );
            $table->enum( 'unidad', [ 'GRAMO', 'KILO' ] )->nullable();
            $table->date( 'fecha' );
            $table->integer( 'pesaje_galpon_id' );
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists( 'pesaje_grupo' );
        Schema::dropIfExists( 'pesaje_edad' );
    }
}
