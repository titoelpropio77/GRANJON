<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Balance;
use App\Categoria;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\BalanceRequest;
use DB;
use Hash;
class BalanceController extends Controller
{
  public function __construct() {
     $this->middleware('auth');
     $this->middleware('admin');
      $this->middleware('auth',['only'=>'admin']);
  }
  
  function index(){
     $silo=DB::select("SELECT silo.id,silo.nombre,silo.capacidad,silo.cantidad,alimento.tipo from silo,alimento WHERE silo.id_alimento=alimento.id");
     return view('Balance.index',compact('silo',$silo));
  }
  
  public function create(){
    return view('Balance.create');   
  }

  public function store(BalanceRequest $request){     
        $verificar=Balance::create([
          'precio_Balance' => $request['precio_Balance'],
          'cantidad_total' => $request['cantidad_total'],
          'id_silo' => $request['id_silo'],]);
        if ($verificar!==null) {
          return redirect('/Balance')->with('message','GUARDADO CORRECTAMENTE');  
        } 
  }

  public function update(BalanceRequest $request,$id){
    $Balance= Balance::find($id);
    $Balance->fill($request->all());
    $Balance->save();
    return redirect('/Balance')->with('message','MODIFICADO CORRECTAMENTE');  
  }

  public function edit($id){
      $Balance=Balance::find($id);
      return view('Balance.edit',['Balance'=>$Balance]);
  }

  public function reporte() {

    $egreso= Categoria::where('tipo', '0')->get();
    $ingreso= Categoria::where('tipo', '1')->get();
    // var_dump($ingreso);
    // exit;
    return view('balance.reporte', compact('egreso', 'ingreso'));
  }

  public function lista_balance_egreso(Request $request){

    $ingresos = $request->ingresos;
    $ingresos_str = implode(',', $ingresos);
    $where_in_ingreso = $ingresos[0] == '0' ? '' : ' and ingreso_varios.id_categoria in ( '.$ingresos_str.') ';

    $egresos = $request->egresos;
    $egresos_str = implode(',', $egresos);
    $where_in_egresos = $egresos[0] == '0' ? '' : ' and egreso_varios.id_categoria in ( '.$egresos_str.') ';

    

    // echo $where_in;
    // exit;
    //SI ES ENTONCES ES TODO

    $query_ingreso = "SELECT (categoria.nombre)as detalle,IFNULL(SUM(ingreso_varios.precio),0)as total from ingreso_varios,categoria WHERE categoria.id=ingreso_varios.id_categoria and ingreso_varios.fecha BETWEEN '".$request->fecha_inicio."' AND '".$request->fecha_fin."' ". $where_in_ingreso ."
      AND ingreso_varios.deleted_at IS NULL GROUP BY ingreso_varios.id_categoria ";
      // echo $ingresos_str;
      // echo "<br>";
      // var_dump( strpos(  $ingresos_str, "-3") );
      // echo strpos( 'VH', $ingresos_str) ;
      // exit;
    if ( strpos($ingresos_str, '-1')!== false ||  $ingresos[0] == '0'  ) 
    {
      $query_ingreso.= "UNION SELECT CONCAT('VENTA DE MAPLES')AS detalle,IFNULL(SUM(venta_huevo.precio),0) as TOTAL from venta_huevo WHERE venta_huevo.estado=1 AND venta_huevo.fecha BETWEEN '".$request->fecha_inicio."' AND '".$request->fecha_fin."'
                UNION
          SELECT CONCAT('VENTA DE CAJAS')AS detalle,IFNULL(SUM(venta_caja.precio),0) as TOTAL from venta_caja WHERE venta_caja.estado=1 AND venta_caja.fecha BETWEEN '".$request->fecha_inicio."' AND '".$request->fecha_fin."'";
    }
    // echo $query_ingreso;
    // exit;
    $list_ingreso=DB::select($query_ingreso);

    $query_egreso = "SELECT (categoria.nombre)as detalle,IFNULL(SUM(egreso_varios.precio),0)as total from egreso_varios,categoria WHERE categoria.id=egreso_varios.id_categoria and egreso_varios.fecha BETWEEN '".$request->fecha_inicio."' AND '".$request->fecha_fin."'  ".$where_in_egresos  ." and egreso_varios.deleted_at
     IS NULL GROUP BY egreso_varios.id_categoria";

     if (  $egresos[0] == '0' || strpos($egresos_str, '-1')!== false ) 
     {
       $query_egreso.= " UNION
        SELECT CONCAT('COMPRA DE GRANO DE TIPO ',' ',alimento.tipo)AS detalle,IFNULL(SUM(compra.precio_compra),0)as total from silo,compra,alimento WHERE compra.id_silo=silo.id and silo.id_alimento=alimento.id  and compra.fecha BETWEEN '".$request->fecha_inicio."' AND DATE_SUB('".$request->fecha_fin."',INTERVAL -1 DAY) AND compra.deleted_at IS NULL GROUP BY alimento.tipo";
     }
   
    $list_egreso=DB::select($query_egreso 
//ESTA CONSULTA ES DE VACUNA Y VACUNA EMERGENTE ESTO VA EN EGRESO
/*UNION
SELECT 'CONSUMO DE VACUNAS'AS vacunas, IFNULL(SUM(precio),0)AS precio FROM consumo_vacuna WHERE Date_format(consumo_vacuna.fecha,'%Y/%m/%d') BETWEEN Date_format('".$fecha_inicio."','%Y/%m/%d') AND Date_format('".$fecha_fin."','%Y/%m/%d')
UNION
SELECT 'CONSUMO DE VACUNAS EMERGENTES', IFNULL(SUM(precio),0)AS precio FROM consumo_emergente WHERE Date_format(consumo_emergente.fecha,'%Y/%m/%d') BETWEEN Date_format('".$fecha_inicio."','%Y/%m/%d') AND Date_format('".$fecha_fin."','%Y/%m/%d')*/
);
    $response = [ 'status' => true, 'data' => [ 'ingresos' => $list_ingreso , 'egresos' => $list_egreso]];
      // return $list_ingreso;
      return response()->json($response);
  }

  public function lista_balance_ingreso($fecha_inicio, $fecha_fin){
      $ingreso=DB::select("SELECT (categoria.nombre)as detalle,IFNULL(SUM(ingreso_varios.precio),0)as total from ingreso_varios,categoria WHERE categoria.id=ingreso_varios.id_categoria and ingreso_varios.fecha BETWEEN '".$fecha_inicio."' AND '".$fecha_fin."' AND ingreso_varios.deleted_at IS NULL GROUP BY ingreso_varios.id_categoria      
        UNION
      SELECT CONCAT('VENTA DE MAPLES')AS detalle,SUM(venta_huevo.precio) as TOTAL from venta_huevo WHERE venta_huevo.estado=1 AND venta_huevo.fecha BETWEEN '".$fecha_inicio."' AND '".$fecha_fin."'
      UNION
SELECT CONCAT('VENTA DE CAJAS')AS detalle,SUM(venta_caja.precio) as TOTAL from venta_caja WHERE venta_caja.estado=1 AND venta_caja.fecha BETWEEN '".$fecha_inicio."' AND '".$fecha_fin."'");
      return response()->json($ingreso);
      /*
      SELECT CONCAT('VENTA DE MAPLES')AS detalle,IFNULL(SUM(venta_huevo.precio),0)as TOTAL from venta_huevo,tipo_huevo,detalle_venta_huevo WHERE tipo_huevo.id=detalle_venta_huevo.id_tipo_huevo and venta_huevo.id=detalle_venta_huevo.id_venta_huevo AND venta_huevo.estado=1 AND venta_huevo.fecha BETWEEN '".$fecha_inicio."' AND '".$fecha_fin."'
      UNION
SELECT CONCAT('VENTA DE CAJAS')AS detalle,IFNULL(SUM(venta_caja.precio),0)as TOTAL from venta_caja,tipo_caja,detalle_venta WHERE tipo_caja.id=detalle_venta.id_tipo_caja and venta_caja.id=detalle_venta.id_venta_caja AND venta_caja.estado=1 AND venta_caja.fecha BETWEEN '".$fecha_inicio."' AND '".$fecha_fin."'");
      */
  }

}
//EGRESO
//SELECT ('COMPRA DE GRANO')as detalle,SUM(compra.precio_compra)as total FROM compra WHERE compra.fecha BETWEEN '".$fecha_inicio."' AND DATE_ADD('".$fecha_fin."',INTERVAL 1 DAY)