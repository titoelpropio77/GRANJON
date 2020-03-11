<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
class PesajeGalponPollita extends Model
{
	const peso_ideal = [
 		'0' => 0,
 		'1' => 50,
 		'2' => 120,
 		'3' => 200,
 		'4' => 300,
 		'5' => 400,
 		'6' => "460-500",
 		'7' => "560-600",
 		'8' => "650-700",
 		'9' => "750-800",
 		'10' => 850,
 		'11' => 950,
 		'12' => "1000-1050",
 		'13' => "1100-1150",
 		'14' => "1200-1250",
 		'15' => "1250-1300",
 		'16' => "1350-1400",
 		'17' => "1450-1500",
 		'18' => "1520-1580",
 		'19' => "1580-1650",
 		'20' => "1650-1710",
 		'21' => "1710-1790",
 		'22' => "1710-1790",
 		'23' => "1710-1830",
 		'24' => "1760-1850",
 		'25' => "1800-1880",
 	];
    protected $table = 'pesaje_galpon_pollita';
    protected $fillable = 
    [
    	'codigo_referencia',
    	'peso',
    	'unidad',
    	'fecha',
    	'pesaje_galpon_id',
    ];
    /**
    * Obtiene el promedio del pesage dato el id del grupo del pesaje del galpon
    */
    public static function getPesoIdealByIdPesajeGalpon( $id )
    {
    	$query = "SELECT
						AVG( peso ) as promedio_peso,
						DATEDIFF( now( ), edad.fecha_inicio ) AS edad,
						galpon.numero,
						fases.nombre
					FROM
						pesaje_galpon_pollita,
						pesaje_galpon,
						edad,
						fases_galpon,
						fases,
						galpon 
					WHERE
						pesaje_galpon_id = ". $id ."
						AND pesaje_galpon.id = pesaje_galpon_pollita.pesaje_galpon_id 
						AND pesaje_galpon.edad_id = edad.id
						and edad.id_galpon = galpon.id 
						AND edad.id = fases_galpon.id_edad 	
					  AND fases.id = fases_galpon.id_fase ";
		$result = DB::select( $query );
		return $result ? $result[0] : [];
    }
    public static function obtenerPesoIdeal( $semana )
    {
    	return self::peso_ideal[ $semana ];
    }
}
