<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Session;
use Redirect;
use App\Caja;
use App\TipoCaja;
use DB;
use Hash;


class  ReporteGraficoController  extends Controller {
  public function __construct() {
   $this->middleware('auth');
   $this->middleware('admin');
   $this->middleware('auth',['only'=>'admin']);
 }

 function index(Request $request) {
   $opcion=0;
   $galpon_numero="";
   $result=array();
   if (!is_null($request->fecha_inicio) && !is_null($request->fecha_fin)) {
    $opcion=$request->opcion;

    $result=DB::select('SELECT galpon.numero, postura_huevo.postura_p as porsentaje,day(postura_huevo.fecha) as fecha ,month(postura_huevo.fecha) as mes  FROM galpon,edad,fases_galpon,fases,postura_huevo WHERE galpon.id=edad.id_galpon and edad.id=fases_galpon.id_edad AND fases_galpon.id_fase=fases.id AND fases_galpon.id=postura_huevo.id_fases_galpon and edad.id='.$request->id_edad.' and DATE_FORMAT(postura_huevo.fecha,"%m-%d-%Y") BETWEEN  DATE_FORMAT("'.$request->fecha_inicio.'","%m-%d-%Y") AND DATE_FORMAT("'.$request->fecha_fin.'","%m-%d-%Y")  ORDER BY mes,fecha');

  }
  else{
   if (!is_null($request->id_edad)) {
    $opcion=$request->opcion;
    $result=DB::select('SELECT galpon.numero, AVG(postura_huevo.postura_p) as porsentaje,month(postura_huevo.fecha)as mes FROM galpon,edad,fases_galpon,fases,postura_huevo WHERE galpon.id=edad.id_galpon and edad.id=fases_galpon.id_edad AND fases_galpon.id_fase=fases.id AND fases_galpon.id=postura_huevo.id_fases_galpon and edad.id='.$request->id_edad.' GROUP by month(postura_huevo.fecha)  ORDER BY mes');

  }}
  if (count($result)!=0) {
   $galpon_numero=$result[0]->numero;

 }
 $galpon=DB::select("SELECT galpon.id as id_galpon,edad.id as id_edad,fases_galpon.id as id_fase_galpon,galpon.numero,galpon.capacidad_total,DATEDIFF(now(),edad.fecha_inicio)AS edad,fases_galpon.cantidad_inicial,fases_galpon.cantidad_actual,fases.nombre,fases_galpon.total_muerta from edad,fases_galpon,galpon,fases WHERE edad.id_galpon=galpon.id and edad.id=fases_galpon.id_edad and fases.id=fases_galpon.id_fase and fases.nombre='PONEDORA' and edad.estado=1  order by numero ");




 return view('Reporte_grafico.Reporte_produccion',['opcion'=>$opcion,'galpon_numero'=>$galpon_numero],compact('galpon','result'));


 $result=DB::select('SELECT AVG(postura_huevo.postura_p) as porsentaje,month(postura_huevo.fecha)as mes FROM galpon,edad,fases_galpon,fases,postura_huevo WHERE galpon.id=edad.id_galpon and edad.id=fases_galpon.id_edad AND fases_galpon.id_fase=fases.id AND fases_galpon.id=postura_huevo.id_fases_galpon and edad.id=6 GROUP by month(postura_huevo.fecha)');


 return view('Reporte_grafico.Reporte_produccion',compact('galpon','result'));
}
public function Rgrafico_postura(){
	$galpon=DB::select("SELECT galpon.id as id_galpon,edad.id as id_edad,fases_galpon.id as id_fase_galpon,galpon.numero,galpon.capacidad_total,DATEDIFF(now(),edad.fecha_inicio)AS edad,fases_galpon.cantidad_inicial,fases_galpon.cantidad_actual,fases.nombre,fases_galpon.total_muerta from edad,fases_galpon,galpon,fases WHERE edad.id_galpon=galpon.id and edad.id=fases_galpon.id_edad and fases.id=fases_galpon.id_fase and fases.nombre='PONEDORA' and edad.estado=1 and galpon.numero<=8 order by numero ");
 $result=DB::select('SELECT AVG(postura_huevo.postura_p) as porsentaje,month(postura_huevo.fecha)as mes FROM galpon,edad,fases_galpon,fases,postura_huevo WHERE galpon.id=edad.id_galpon and edad.id=fases_galpon.id_edad AND fases_galpon.id_fase=fases.id AND fases_galpon.id=postura_huevo.id_fases_galpon and edad.id=6 GROUP by month(postura_huevo.fecha)');
 return view('Reporte_grafico.Reporte_produccion',compact('galpon','result'));
}

public function Rgrafico_postura2(){
  $fecha=DB::select("SELECT curdate()as fecha"); 

  $fecha1=$fecha[0]->fecha;
  $fecha2=$fecha[0]->fecha;
  $id_edad="";
  $galpon=DB::select("SELECT galpon.id as id_galpon,edad.id as id_edad,fases_galpon.id as id_fase_galpon,galpon.numero,galpon.capacidad_total,DATEDIFF(now(),edad.fecha_inicio)AS edad,fases_galpon.cantidad_inicial,fases_galpon.cantidad_actual,fases.nombre,fases_galpon.total_muerta from edad,fases_galpon,galpon,fases WHERE edad.id_galpon=galpon.id and edad.id=fases_galpon.id_edad and fases.id=fases_galpon.id_fase and fases.nombre='PONEDORA' and edad.estado=1  order by numero ");

  $result=array();
  $tipoCaja=DB::select("SELECT * FROM `tipo_caja` ");

  return view('Reporte_grafico.Reporte_Produccion2',['nrogalpon'=>"",'id_edad'=>$id_edad,'fecha1'=>$fecha1,'fecha2'=>$fecha2],compact('galpon','result','tipoCaja'));
}
public function ReporteProduccionGrafico2(Request $request,$fecha1,$fecha2,$idedad){



  $result2=array();

  $resultado='SELECT
  fases_galpon.id,
  cantidad,
  DATE_FORMAT(consumo.fecha, "%Y-%m-%d") as fecha ,
  postura_huevo.postura_p as porcentaje,
  consumo.costo_consumo,
  consumo.temperatura,
  postura_huevo.fecha as fechacompleta
  FROM
  edad,
  fases_galpon,
  galpon,
  fases,
  consumo left join postura_huevo on consumo.id_fase_galpon=postura_huevo.id_fases_galpon and consumo.deleted_at IS NULL and DATE_FORMAT(postura_huevo.fecha, "%Y-%m-%d") =DATE_FORMAT(consumo.fecha, "%Y-%m-%d")
  WHERE
  galpon.id = edad.id_galpon
  AND edad.id = fases_galpon.id_edad
  AND fases_galpon.id_fase = fases.id
  AND fases_galpon.id = consumo.id_fase_galpon
  AND edad.id = '.$idedad.' 
  AND DATE_FORMAT(consumo.fecha, "%Y-%m-%d") BETWEEN DATE_FORMAT("'.$fecha1.'", "%Y-%m-%d")
  AND DATE_FORMAT("'.$fecha2.'", "%Y-%m-%d")
  group by consumo.fecha,fechacompleta
  ORDER BY
  fecha';
//$result=DB::select('SELECT galpon.numero,"1" as dia, AVG(postura_huevo.postura_p) as porcentaje,month(postura_huevo.fecha)as mes,YEAR(postura_huevo.fecha)as año FROM galpon,edad,fases_galpon,fases,postura_huevo WHERE galpon.id=edad.id_galpon and edad.id=fases_galpon.id_edad AND fases_galpon.id_fase=fases.id AND fases_galpon.id=postura_huevo.id_fases_galpon and edad.id=35 GROUP by month(postura_huevo.fecha) ORDER BY mes');
 //$resultado='SELECT DATE_FORMAT(postura_huevo.fecha,"%Y-%m-%d") as fechacompleta,galpon.numero, postura_huevo.postura_p as porcentaje,day(postura_huevo.fecha) as fecha ,month(postura_huevo.fecha) as mes  FROM galpon,edad,fases_galpon,fases,postura_huevo WHERE galpon.id=edad.id_galpon and edad.id=fases_galpon.id_edad AND fases_galpon.id_fase=fases.id AND fases_galpon.id=postura_huevo.id_fases_galpon and edad.id='.$idedad.' and DATE_FORMAT(postura_huevo.fecha,"%Y-%m-%d") BETWEEN  DATE_FORMAT("'.$fecha1.'","%Y-%m-%d") AND DATE_FORMAT("'.$fecha2.'","%Y-%m-%d")  ORDER BY mes,fecha';
  $result=DB::select($resultado);

  return response()->json($result);
  
}
public function ReporteVentaTotal(Request $request,$fechainicio,$fechafin,$tipoCaja){



//$result=DB::select('SELECT galpon.numero,"1" as dia, AVG(postura_huevo.postura_p) as porcentaje,month(postura_huevo.fecha)as mes,YEAR(postura_huevo.fecha)as año FROM galpon,edad,fases_galpon,fases,postura_huevo WHERE galpon.id=edad.id_galpon and edad.id=fases_galpon.id_edad AND fases_galpon.id_fase=fases.id AND fases_galpon.id=postura_huevo.id_fases_galpon and edad.id=35 GROUP by month(postura_huevo.fecha) ORDER BY mes');
  if ($tipoCaja==0) {
    $result=DB::select('SELECT * FROM `venta_caja` where DATE_FORMAT(venta_caja.fecha,"%Y-%m-%d") BETWEEN DATE_FORMAT("'.$fechainicio.'","%Y-%m-%d") and DATE_FORMAT("'.$fechafin.'","%Y-%m-%d") group by fecha');
  }else{
    $reporte='SELECT subtotal_precio as precio, DATE_FORMAT(venta_caja.fecha,"%Y-%m-%d") as fecha FROM detalle_venta,venta_caja,tipo_caja where DATE_FORMAT(venta_caja.fecha,"%Y-%m-%d") BETWEEN DATE_FORMAT("'.$fechainicio.'","%Y-%m-%d") and DATE_FORMAT("'.$fechafin.'","%Y-%m-%d") and detalle_venta.id_venta_caja = venta_caja.id and detalle_venta.id_tipo_caja=tipo_caja.id and tipo_caja.id='.$tipoCaja.' group by fecha';

    $result=DB::select($reporte); 
  }

  return response()->json($result);

}

public function ReproteDeConsumo(Request $request,$fechainicio,$fechafin)
{
  $result=DB::select('SELECT subtotal_precio as precio, DATE_FORMAT(venta_caja.fecha,"%Y-%m-%d") as fecha FROM detalle_venta,venta_caja,tipo_caja where DATE_FORMAT(venta_caja.fecha,"%Y-%m-%d") BETWEEN DATE_FORMAT("'.$fechainicio.'","%Y-%m-%d") and DATE_FORMAT("'.$fechafin.'","%Y-%m-%d")');
  return response()->json($result);

}
public function ReproteDeConsumoPostura(Request $request,$fechainicio,$fechafin,$idedad)
{
 $consulta='SELECT
 fases_galpon.id,
 cantidad,
 DATE_FORMAT(consumo.fecha, "%Y-%m-%d") as fecha ,
 postura_huevo.postura_p,
 consumo.costo_consumo,
 consumo.temperatura,
 postura_huevo.fecha as fechapostura
 FROM
 edad,
 fases_galpon,
 galpon,
 fases,
 consumo left join postura_huevo on consumo.id_fase_galpon=postura_huevo.id_fases_galpon and consumo.deleted_at IS NULL and DATE_FORMAT(postura_huevo.fecha, "%Y-%m-%d") =DATE_FORMAT(consumo.fecha, "%Y-%m-%d")
 WHERE
 galpon.id = edad.id_galpon
 AND edad.id = fases_galpon.id_edad
 AND fases_galpon.id_fase = fases.id
 AND fases_galpon.id = consumo.id_fase_galpon
 AND edad.id = '.$idedad.' 
 AND DATE_FORMAT(consumo.fecha, "%Y-%m-%d") BETWEEN DATE_FORMAT("'.$fechainicio.'", "%Y-%m-%d")
 AND DATE_FORMAT("'.$fechafin.'", "%Y-%m-%d")
 group by consumo.fecha,fechapostura
 ORDER BY
 fechapostura';
 $result=DB::select($consulta);
 return response()->json($result);

}
public function ReporteMortandad(Request $request,$fechainicio,$fechafin,$idedad)
{
  $consulta='SELECT
  fases_galpon.id,
  postura_huevo.postura_p,
  postura_huevo.cantidad_muertas,
  DATE_FORMAT(postura_huevo.fecha, "%Y-%m-%d")  as fechapostura
  FROM
  edad,
  fases_galpon,
  galpon,
  fases,
  postura_huevo
  WHERE
  galpon.id = edad.id_galpon
  AND edad.id = fases_galpon.id_edad
  AND fases_galpon.id_fase = fases.id
  AND fases_galpon.id = postura_huevo.id_fases_galpon
  AND edad.id ='.$idedad.' 
  AND DATE_FORMAT(postura_huevo.fecha, "%Y-%m-%d") BETWEEN DATE_FORMAT("'.$fechainicio.' ", "%Y-%m-%d")
  AND DATE_FORMAT("'.$fechafin .'", "%Y-%m-%d")
  group by fechapostura
  ORDER BY
  fechapostura';
  $result=DB::select($consulta);
  return response()->json($result);
}
public function ReporteTiposDecaja( Request $request,$fechainicio,$fechafin )
{
  $getTipoCajaAll =  TipoCaja::all();
  $response ['status'] =true;
 foreach ( $getTipoCajaAll as  $value )  
 {
    $response [  $value['tipo'] ] = Caja::ReporteTiposDecaja( $fechainicio, $fechafin, $value['id']);
    $response [  "TOTAL".$value['tipo'] ] = Caja::ReporteTiposDecajaGroupByType( $fechainicio, $fechafin, $value['id']);
 }

  return response()->json( $response );
}
}