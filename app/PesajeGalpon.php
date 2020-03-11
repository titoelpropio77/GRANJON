<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PesajeGalpon extends Model
{
   	// estado = pendiente, terminado, anulado
	protected $table = 'pesaje_galpon';
   	protected $fillable = ['id','fecha','cod_grupo','edad_id', 'estado', 'observacion'];

   	/**
   	* verificar si ya existe un codigo de grupo igual, dado la edad
   	* @param $cod_grupo codigo del grupo
   	* @param $edad_id
   	*/
   	static function verifyCodGrupo( $cod_grupo, $edad_id )
   	{
   		$result = self::where( [ 'cod_grupo' => $cod_grupo, 'edad_id' => $edad_id ] )->first();
   		return $result ? $result : [];
   	}
}
