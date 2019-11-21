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

class Caja extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    
use Authenticatable, Authorizable, CanResetPassword, SoftDeletes;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'caja';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['cantidad_caja','cantidad_maple','cantidad_huevo','id_tipo_caja'];
    protected $dates=['deleted_at'];
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
public static function ReporteTiposDecaja( $fechainicio,$fechafin, $idTipoCaja )
{
    $result = DB::select(" select sum(cantidad_caja) as total, tipo_caja.tipo,   DATE_FORMAT(caja.fecha,'%Y-%m-%d')as fecha  from caja,tipo_caja WHERE caja.fecha BETWEEN '".$fechainicio."' and '".$fechafin."' and caja.id_tipo_caja = tipo_caja.id and  id_tipo_caja=". $idTipoCaja ."  group by id_tipo_caja,caja.fecha ");
    return  $result;
}
public static function ReporteTiposDecajaGroupByType( $fechainicio,$fechafin, $idTipoCaja )//este solo me obtiene lso tipos de caja engrupados por tipo
{
    $result = DB::select(" select sum(cantidad_caja) as total, tipo_caja.tipo,   DATE_FORMAT(caja.fecha,'%Y-%m-%d')as fecha  from caja,tipo_caja WHERE caja.fecha BETWEEN '".$fechainicio."' and '".$fechafin."' and caja.id_tipo_caja = tipo_caja.id and  id_tipo_caja=". $idTipoCaja ." group by  id_tipo_caja ");
    return  $result;
}
    }
