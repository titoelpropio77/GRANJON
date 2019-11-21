<!--muestra la lista de vacunas postergadas-->
<div class="modal fade" id="ModalGraficoPostura" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document" style="    width: 90%;" >
    <div class="modal-content">
      <div class="modal-header" id="">
        <H2 id="">POSTURAS</H2>
      </div>
      <div class="modal-body">
        <div class="row">
         <div class="col-lg-12 col-sm-12 col-xs-12 ">

          <div class="box box-solid bg-teal-gradient">
            <div class="box-header">
              <h3 class="box-title">PRODUCCION</h3>
              <div class="box-tools pull-right">
              </div>
            </div>
            <div class="box-body border-radius-none">
              <div class="chart" id="line-chart" style="height: 250px;"> </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
                <label>Desde</label>
                <div class="pull-right"><input type="date" name="fecha_inicio" id="fecha_inicio"  class="form-control"></div>
              </div> 
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
               <?php $fecha=DB::select("SELECT curdate()as fecha"); ?>
               <label>hasta</label>
               <div class="pull-right"><input type="date" name="fecha_fin" id="fecha_fin"  class="form-control"></div>
             </div> 
             <div class="col-lg-3 col-sm-3 col-xs-12 pull-rigth">
              <select name="id_edad" id="id_edad" class="form-control">
                @foreach($galpon as $gal)
                <option value="{{$gal->id_edad}}">GALPON NRO. {{$gal->numero}}</option>
                @endforeach
              </select>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
              <button onclick="ReporteProduccion()" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i></button>
            </div> 
          </div>
        </div>
        <div class="box box-solid bg-teal-gradient">
          <div class="box-header">
            <h3 class="box-title">CONSUMO Y PRODUCCION</h3>
            <div class="box-tools pull-right">
            </div>
          </div>
          <div class="box-body border-radius-none">
            <div class="chart" id="line-chart3" style="height: 250px;"> </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
              <label>Desde</label>
              <div class="pull-right"><input type="date" name="fecha_inicio" id="fecha_iniciop"  class="form-control"></div>
            </div> 
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
             <?php $fecha=DB::select("SELECT curdate()as fecha"); ?>
             <label>hasta</label>
             <div class="pull-right"><input type="date" name="fecha_fin" id="fecha_finp"  class="form-control"></div>
           </div> 
           <div class="col-lg-3 col-sm-3 col-xs-12 pull-rigth">
            <select name="id_edad" id="id_edadp" class="form-control">
              @foreach($galpon as $gal)
              <option value="{{$gal->id_edad}}">GALPON NRO. {{$gal->numero}}</option>
              @endforeach
            </select>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
            <button onclick="produccionconsumo()" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i></button>
          </div> 
        </div>
      </div>
      <div class="box box-solid bg-teal-gradient">
        <div class="box-header">
          <h3 class="box-title">MORTANDAD</h3>
          <div class="box-tools pull-right">
          </div>
        </div>
        <div class="box-body border-radius-none">
          <div class="chart" id="line-chart4" style="height: 250px;"> </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
            <label>Desde</label>
            <div class="pull-right"><input type="date" name="fecha_inicio" id="fecha_iniciom"  class="form-control"></div>
          </div> 
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
           <?php $fecha=DB::select("SELECT curdate()as fecha"); ?>
           <label>hasta</label>
           <div class="pull-right"><input type="date" name="fecha_fin" id="fecha_finm"  class="form-control"></div>
         </div> 
         <div class="col-lg-3 col-sm-3 col-xs-12 pull-rigth">
          <select name="id_edad" id="id_edadm" class="form-control">
            @foreach($galpon as $gal)
            <option value="{{$gal->id_edad}}">GALPON NRO. {{$gal->numero}}</option>
            @endforeach
          </select>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
          <button onclick="reportemortandad()" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i></button>
        </div> 
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>
</div>



<!--muestra la lista de vacunas postergadas-->
<div class="modal fade" id="ModalGraficoPorcentajeTipoCaja" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document" style="    width: 90%;" >
    <div class="modal-content">
      <div class="modal-header" id="">
        <H2 id="">REPORTE POR TIPOS DE HUEVO</H2>
      </div>
      <div class="modal-body" style="background: black">
       
        <div class="row">
         <div class="col-lg-12 col-sm-12 col-xs-12 ">

          <div class="box box-solid bg-teal-gradient">
            <div class="box-header">
              <h3 class="box-title">TIPOS DE HUEVO</h3>
              <div class="box-tools pull-right">
              </div>
            </div>
            <div class="box-body border-radius-none">
              <div class="chart" id="line-chart-caja" style="height: 250px;"> </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
                <label>Desde</label>
                <div class="pull-right"><input type="date" name="fecha_inicio" id="fecha_inicio_caja"  class="form-control"></div>
              </div> 
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
               <?php $fecha=DB::select("SELECT curdate()as fecha"); ?>
               <label>hasta</label>
               <div class="pull-right"><input type="date" name="fecha_fin" id="fecha_fin_caja"  class="form-control"></div>
             </div> 
             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
              <button onclick="reporteGraficoTipoCaja()" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i></button>
            </div> 
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="chart-responsive">
          <canvas id="pieChart" height="155" width="186" style="width: 186px; height: 155px;"></canvas>
        </div>
        <!-- ./chart-responsive -->
      </div>
    </div><!-- final row -->
    
  </div> <!-- final modal body -->
</div>
</div>
</div>
