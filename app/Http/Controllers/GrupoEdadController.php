<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Session;
use Redirect;
use App\GrupoEdad;

use App\Http\Requests\FasesGalponUpdateRequest;
use DB;
use Hash;

class GrupoEdadController extends Controller {
    public function __construct() {
         $this->middleware('auth');
         $this->middleware('admin');
        $this->middleware('auth',['only'=>'admin']);
    }

    function index(Request $request) {
    }

    public function create() {
        return view('fasesgalpon.create');
    }

    public function getgalpon(Request $request) {
        $eda = DB::select("SELECT DISTINCT numero,id FROM galpon WHERE (NOT EXISTS (SELECT * FROM FasesGalpon WHERE FasesGalpon.id_galpon = galpon.id and estado!=0))");
        return response()->json($eda);
    }

    public function update(FasesGalponUpdateRequest $request, $id_fg) {
        if ($request->ajax()) {
            $actua = DB::table('fases_galpon')->where('id', $id_fg)->update(['id_fase'=>$request->id_fase, 'cantidad_inicial'=>$request->cantidad_inicial,'cantidad_actual'=>$request->cantidad_actual,'total_muerta'=>$request->total_muerta,'fecha_inicio'=>$request->fecha_inicio,'id_edad'=>$request->id_edad]);
            return response()->json($request->all());
        }
    }

    

  
    public function store_traspaso(FasesGalponCreateRequest $request) {
        $verificar = FasesGalpon::create([
                    'FasesGalpon' => $request->FasesGalpon,
                    'cantidad_inicial' => $request->cantidad_inicial,
                    'cantidad_actual' => $request->cantidad_actual,
                    'total_muerta' => $request->total_muerta,
                    'estado' => $request->estado,
                    'fecha_inicio' => $request->fecha_inicio,
                    'id_galpon' => $request->id_galpon]);
        if ($verificar !== null) {
            return redirect('/traspaso')->with('message', 'TRASPASO CORRECTAMENTE');
        }
    }

    public function edit($id) {
        $FasesGalpon = FasesGalpon::find($id);

        return response()->json($FasesGalpon);
    }

    public function destroy( $id) {

           $GrupoEdad = GrupoEdad::find($id);
          $GrupoEdad->delete();
          GrupoEdad::destroy($id);
          return response()->json($GrupoEdad); 

    }

}
