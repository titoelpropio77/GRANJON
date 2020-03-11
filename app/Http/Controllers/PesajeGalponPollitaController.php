<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\PesajeGalponPollita;

class PesajeGalponPollitaController extends Controller
{
 	
    public function show( $id )
    {
    	return view( 'pesaje_galpon_pollita.index', [ 'pesaje_galpon_id' => $id ] );
    }
    public function store( Request $request )
    {
    	PesajeGalponPollita::create([
    		'codigo_referencia' => $request->cod_referencia,
	    	'unidad' => $request->unidad,
	    	'peso' => $request->peso,
	    	'fecha' => date( 'Y-m-d' ),
	    	'pesaje_galpon_id' => $request->pesaje_galpon_id,
    	]);
    	$result = [ 'status' => true, 'message' => 'Guardado correctamente' ];

    	return response()->json($result );
    }
    /**
    * @return lista de control de pesaje
    */
    public function getControlPesajePollita( Request $request )
    {
    	
    	// return $request->all();
    	$promedioPesajeGalpon = PesajeGalponPollita::getPesoIdealByIdPesajeGalpon( $request->pesaje_galpon_id );
    	$semana = intval( $promedioPesajeGalpon->edad/7 ) ;
    	$semana = $semana == 0 ? 1 :intval( $promedioPesajeGalpon->edad/7 );
     	$pesoIdeal = $semana >= 28 ? 2000 : PesajeGalponPollita::obtenerPesoIdeal( $semana );
    	$promedioPesajeGalpon->pesoIdeal = $pesoIdeal;
    	$promedioPesajeGalpon->semana = $semana;

    	$result =  PesajeGalponPollita::where( 'pesaje_galpon_id', $request->pesaje_galpon_id )->orderBy(  'id', 'desc' )->get();
    	$result = [ 'status' => true, 'data' => $result , 'promedioPesajeGalpon' => $promedioPesajeGalpon, 'pesoIdeal' => $pesoIdeal];
    	return response()->json( $result );
    }
    public function edit( $id )
    {
    	$result =  PesajeGalponPollita::find( $id );
    	$response = [ 'status' => true, 'data' => $result ];
    	return response()->json( $response );

    }
    public function update( Request $request, $id )
    {
        try {
           
            $modelPesajeGalpon = PesajeGalponPollita::findOrFail($id ); 
            $modelPesajeGalpon->update([
                                            'codigo_referencia' => $request->cod_referencia,
									    	'unidad' => $request->unidad,
									    	'peso' => $request->peso,
                                        ]);
            $modelPesajeGalpon->save();
            $result = [ 'status' => true, 'message' => 'Guardado correctamente' ];  
          
            
        } catch (Exception $e) 
        {
            $result = [ 'status' => false, 'message' => 'Error : ' . $e->getMessage() ];
        }
        
        return response()->json( $result );
    }
    public function destroy( Request $request, $id )
    {
    	 $GrupoTemperatura = PesajeGalponPollita::find($id);
          $GrupoTemperatura->delete();
          GrupoTemperatura::destroy($id);
          return response()->json($GrupoTemperatura); 
    }
}
