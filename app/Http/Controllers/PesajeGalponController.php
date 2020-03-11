<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\PesajeGalpon;
use App\Edad;

class PesajeGalponController extends Controller
{
    public function index()
    {
    	return view( 'pesaje_galpon.index' );
    }
    public function show( $id_edad )
    {
    	$id_edad = $id_edad;
    	$gallina = new Edad;
    	$galpon = $gallina->getGallinasByIdEdad( $id_edad );

    	$semanas = intval( $galpon[0]->edad/7 );
    	
    	return view( 'pesaje_galpon.index' , compact('id_edad', 'semanas', 'galpon'));
    }
    /**
    * @return lista de control de pesaje
    */
    public function getControlPesaje( Request $request )
    {
    	
    	// return $request->all();
    	$result =  PesajeGalpon::where( 'edad_id', $request->edad_id )->get();
    	$result = [ 'status' => true, 'data' => $result ];
    	return response()->json( $result );
    }

    public function store( Request $request )
    {
    	try {
    		$result = PesajeGalpon::verifyCodGrupo( $request->cod_grupo, $request->edad_id );
    		if ( !$result ) 
    		{
    			PesajeGalpon::create([
	    		'fecha' => $request->fecha,
	    		'cod_grupo' => $request->cod_grupo,
                'observacion' => $request->observacion,
	    		'edad_id' => $request->edad_id, 
	    		'estado' => $request->estado
    			]);
    			$result = [ 'status' => true, 'message' => 'Guardado correctamente' ];	
    		}else{
    			$result = [ 'status' => false, 'message' => 'Ya existe un codigo de grupo igual ya registrado: '. $request->cod_grupo ];	
    		}
    		
    	} catch (Exception $e) 
    	{
    		$result = [ 'status' => false, 'message' => 'Error : ' . $e->getMessage() ];
    	}
    	
    	return response()->json( $result );
    }
    public function edit( $id )
    {
    	$result =  PesajeGalpon::find( $id );
    	$response = [ 'status' => true, 'data' => $result ];
    	return response()->json( $response );

    }
    public function update( Request $request, $id )
    {
        try {
           
            $modelPesajeGalpon = PesajeGalpon::findOrFail($id ); 
            $modelPesajeGalpon->update([
                                            'fecha' => $request->fecha,
                                            'cod_grupo' => $request->cod_grupo,
                                            'observacion' => $request->observacion,
                                            'estado' => $request->estado
                                        ]);
            $modelPesajeGalpon->save();
            $result = [ 'status' => true, 'message' => 'Guardado correctamente' ];  
          
            
        } catch (Exception $e) 
        {
            $result = [ 'status' => false, 'message' => 'Error : ' . $e->getMessage() ];
        }
        
        return response()->json( $result );
    }
}
