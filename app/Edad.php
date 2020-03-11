<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use DB;

class Edad extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    
use Authenticatable, Authorizable, CanResetPassword, SoftDeletes;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'edad';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id_galpon','fecha_inicio','estado','fecha_descarte'];
    protected $dates=['deleted_at'];
    /**
    * @return retorna lista de la gestion de galpones activas
    * @param integer $edad_id = id de la edad de la gallina
    * @param sting $fase = fase de la gallina  EJM: 'PONEDORA', 'FASE 1', 'FASE 2', 'FASE 3'
    */
    public function getGallinasByIdEdad( $edad_id = 0, $fase = '' )
    {
        $query = 'SELECT
                        galpon.id AS id_galpon,
                        edad.id AS id_edad,
                        fases_galpon.id AS id_fase_galpon,
                        galpon.numero,
                        galpon.capacidad_total,
                        DATEDIFF( now( ), edad.fecha_inicio ) AS edad,
                        fases_galpon.cantidad_inicial,
                        fases_galpon.cantidad_actual,
                        fases.nombre,
                        fases_galpon.total_muerta 
                    FROM
                        edad,
                        fases_galpon,
                        galpon,
                        fases 
                    WHERE
                        edad.id_galpon = galpon.id 
                        AND edad.id = fases_galpon.id_edad 
                        AND fases.id = fases_galpon.id_fase 
                        ';
        if ( !empty( $fase ) )
        {
            $query .=  ' AND fases.nombre ="'. $fase .'"' ;
        }
        if ( $edad_id )
        {
            $query .=  ' AND edad.id  ='. $edad_id;
        }

        $query .= ' AND edad.estado = 1 
                    ORDER BY
                        numero ';
        $result = DB::select( $query );
        return $result;

    }
}
