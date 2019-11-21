<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Session;
use Redirect;
use App\GrupoTemperatura;

use App\Http\Requests\FasesGalponUpdateRequest;
use DB;
use Hash;

class GrupoTemperaturaController extends Controller {
    public function __construct() {
         $this->middleware('auth');
         $this->middleware('admin');
        $this->middleware('auth',['only'=>'admin']);
    }

    function index(Request $request) {
    }

    public function create() {
    }

    public function getgalpon(Request $request) {
    
}
    public function update(FasesGalponUpdateRequest $request, $id_fg) {
    
    }

    

  
    public function store_traspaso(FasesGalponCreateRequest $request) {
      
    }

    public function edit($id) {
       
    }

    public function destroy( $id) {

           $GrupoTemperatura = GrupoTemperatura::find($id);
          $GrupoTemperatura->delete();
          GrupoTemperatura::destroy($id);
          return response()->json($GrupoTemperatura); 

    }

}
