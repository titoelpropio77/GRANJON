   
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title> SISTEMA GRANJA</title>
  <link rel="shortcut icon" href="{{asset('images/granja.png')}}">

  {!!Html::style('css/bootstrap.min.css')!!}
  {!!Html::style('css/font-awesome.min.css')!!}

  {!!Html::style('css/AdminLTE.min.css')!!}
  {!!Html::style('css/plugins/_all-skins.min.css')!!}

  {!!Html::style('css/plugins/morris.css')!!}
  {!!Html::style('css/plugins/bootstrap3-wysihtml5.min.css')!!}
</head>
<body>

  <div class="wrapper">

    <nav  class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>                        
          </button>
          <a class="navbar-brand" onclick="actualizar_pag()"><i class="fa fa-refresh" aria-hidden="true" title="ACTUALIZAR"></i> </a>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav">
            <li   
            @if(Auth::user()!=null) style="width: 8%;"
            @endif  

            ><a href="{!!URL::to('galpon')!!}">Ponedora</a></li>
            <li  @if(Auth::user()!=null) style=" width: 4%;"     @endif ><a href="{!!URL::to('criarecria')!!}">Crias</a></li>

            @if(Auth::user()==null) 
            <li><a href="{!!URL::to('cajadeposito')!!}">Cajas</a></li>
            @endif  
            @if(Auth::user()!=null) 
            <li><a href="{!!URL::to('cajadeposito_admin')!!}">Cajas</a></li>
            @endif    

            <li class="dropdown" @if(Auth::user()!=null) style="width: 8%;"  @endif    style="width: 13%;" > 
              <a class="dropdown-toggle" data-toggle="dropdown" href="">Ventas<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="{!!URL::to('ventacaja')!!}">Venta Caja</a></li>
                <li><a href="{!!URL::to('ventahuevo')!!}">Venta Huevo Descarte</a></li>    
              </ul>
            </li>

            <li><a href="{!!URL::to('compra')!!}">Compra Alimento</a></li>   
            


            @if(Auth::user()!=null) 
            
            

            <li><a href="{!!URL::to('controlalimento')!!}">Control Alimento</a></li>                    
            <li class="dropdown"    style="width: 10%;"   >
              <a class="dropdown-toggle" data-toggle="dropdown" href=""  >Galpones<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="{!!URL::to('fases')!!}"> FASES</a></li>
                <li><a href="{!!URL::to('vistagalpon')!!}"> GALPON</a></li>
                <li><a href="{!!URL::to('edad')!!}"> EDAD</a></li>
                
                <li><a href="{!!URL::to('vacuna')!!}"> VACUNA</a></li>     
                <li><a href="{!!URL::to('consumo_alimento')!!}">CONSUMO ALIMENTO</a></li>    
              </ul>
            </li>
            <li class="dropdown" @if(Auth::user()!=null) style="width: 6%;" @endif>
              <a class="dropdown-toggle" data-toggle="dropdown" href="">Silo<span class="caret"></span></a>
              <ul class="dropdown-menu">
               <li><a href="{!!URL::to('silo')!!}"> Silo</a></li>
               
               <li><a href="{!!URL::to('alimento')!!}">Alimento</a></li>
               
               
             </ul>
           </li>
           <li class="dropdown" style="width: 11%;">
            <a class="dropdown-toggle" data-toggle="dropdown" href="">Caja-Huevo<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="{!!URL::to('maple')!!}"> MAPLE</a></li>
              <li><a href="{!!URL::to('tipocaja')!!}"> TIPO CAJAS</a></li>
              <li><a href="{!!URL::to('tipohuevo')!!}"> TIPO HUEVOS DESCARTES</a></li> 
              <li><a href="{!!URL::to('lista_caja')!!}">LISTA DE CAJAS</a></li>     
              <li><a href="{!!URL::to('lista_maple')!!}">LISTA DE HUEVOS DESCARTES</a></li>  
            </ul>
          </li>

          

          <li class="dropdown" style="width: 9%;">
            <a class="dropdown-toggle" data-toggle="dropdown" href="">Reporte<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="{!!URL::to('reporteponedoras')!!}">REPORTE DE POSTURA HUEVO</a></li>                                
              <li><a href="{!!URL::to('reportecaja')!!}">R. VENTA DE CAJAS</a></li>                                      
              <li><a href="{!!URL::to('reportehuevo')!!}">R. VENTA DE HUEVOS DESCARTE</a></li>                                
              <li><a href="{!!URL::to('reporte_compra')!!}">R.E COMPRA DE ALIMENTOS</a></li>
              <li><a href="{!!URL::to('lista_gallinas')!!}">R. DE GALLINAS</a></li>     
              <li><a href="{!!URL::to('reportebalance')!!}">R. GENERAL</a></li>     
              <li><a href="#">R. Grafico</a></li>
            </ul>
          </li>
          <li class="dropdown" style="width: 12%;">
            <a class="dropdown-toggle" data-toggle="dropdown" href="">Administrador<span class="caret"></span></a>
            <ul class="dropdown-menu">                              
              <li><a href="{!!URL::to('lista_compra')!!}">ANULAR COMPRA ALIMENTO</a></li>   
              <li><a href="{!!URL::to('categoria')!!}"> GASTOS</a></li>
              <li><a href="{!!URL::to('lista_egreso')!!}"> EGRESO</a></li>
              <li><a href="{!!URL::to('lista_ingreso')!!}"> INGRESO</a></li>  
              <li><a href="{!!URL::to('temperatura')!!}"> TEMPERATURA</a></li>  
              <li><a href="{!!URL::to('usuario')!!}"> USUARIO</a></li>                        
              <!--li><a href="Backup_Granja/php/">COPIA DE SEGURIDAD</a>  </li-->
            </ul>
          </li>
          @endif 

        </ul>
        <ul class="nav navbar-nav navbar-right">
         @if(Auth::user()==null) 
         <li><a href="{!!URL::to('/')!!}" class="btn btn-success" style="color: white" > <i class="fa fa-user" aria-hidden="true"></i>  INICIAR </a></li>
         @endif  
         @if(Auth::user()!=null) 
         <li><a href="{!!URL::to('logout')!!}" class="btn btn-danger" style="color: white"> <i class="fa fa-user" aria-hidden="true"></i>   SALIR</a></li>
         @endif  
       </ul>
     </div>
   </div>
 </nav>

 <div class="content">
  <div class="container-fluid">
    <div class="row">
      

      <div class="col-md-12">
       <section class="col-lg-12 ">

        <!-- Map box -->
        
        <!-- /.box -->

        <!-- solid sales graph -->
        <h3>REPORTE DE PRODUCCION POR GALPON</h3>
        <div class="box box-solid bg-teal-gradient">
          <div class="box-header">
            <h3 class="box-title">GALPON <?php  echo $nrogalpon; ?></h3>
            <div class="box-tools pull-right">
            </div>
          </div>
          <div class="box-body border-radius-none">
            <div class="chart" id="line-chart" style="height: 250px;"> </div>

            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
              <label>Desde</label>
              
              <div class="pull-right"><input type="date" name="fecha_inicio" id="fecha_inicio" value= <?php  echo $fecha1; ?> class="form-control"></div>
            </div> 

            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
             <?php $fecha=DB::select("SELECT curdate()as fecha"); ?>
             <label>hasta</label>
             
             <div class="pull-right"><input type="date" name="fecha_fin" id="fecha_fin" value= <?php  echo $fecha2; ?> class="form-control"></div>

           </div> 
           <div class="col-lg-3 col-sm-3 col-xs-12 pull-rigth">
             
            <select name="id_edad" id="id_edad" class="form-control">
              <?php   if ( $id_edad=="") {
                echo "<option value='0'>SELECCIONE UN GALPON</option>";
              } 
              else{
                echo "<option value=".$id_edad." >GALPON NRO. ".$result[0]->numero."</option>";
              }
              ?>
              
              @foreach($galpon as $gal)
              <option value="{{$gal->id_edad}}">GALPON NRO. {{$gal->numero}}</option>
              @endforeach
            </select>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
            <button onclick="ReporteProduccion()" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i></button>
            
          </div> 

        </div>
        <!-- /.box-body -->
        <!-- /.box-footer -->

      </div>

      

    </section>
    <section class="col-lg-12 ">

      <!-- Map box -->
      
      <!-- /.box -->
      <h3>REPORTE VENTA DE CAJAS</h3>

      <!-- solid sales graph -->
      <div class="box box-solid bg-teal-gradient">
        <div class="box-header">

          <h3 class="box-title">REPORTE DE VENTA</h3>

          <div class="box-tools pull-right">
            
          </div>
        </div>
        <div class="box-body border-radius-none">
          <div class="chart" id="line-chart2" style="height: 250px;"></div>
          

          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
            <label>Desde</label>
            
            <div class="pull-right"><input type="date" id="fechainicio" name="fecha_inicio" value= <?php  echo $fecha1; ?> class="form-control"></div>
          </div> 

          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
           <?php $fecha=DB::select("SELECT curdate()as fecha"); ?>
           <label>hasta</label>
           
           <div class="pull-right"><input type="date" id="fechafin" name="fecha_fin" value= <?php  echo $fecha2; ?> class="form-control"></div>

         </div> 
         <div class="col-lg-3 col-sm-3 col-xs-12 pull-rigth">
           
          <select name="idCaja" id="idtipoCaja" class="form-control">
            <?php   
            echo "<option value='0'>TODO TIPO DE CAJA</option>";
            
            
            
            
            ?>
            
            @foreach($tipoCaja as $gal)
            <option value="{{$gal->id}}">{{$gal->tipo}}</option>
            @endforeach
          </select>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
          <button class="btn btn-primary" onclick="ReporteVentaTotal()"><i class="fa fa-search" aria-hidden="true"></i></button>
          
        </div> 
      </div>
      <!-- /.box-body -->
      
      <!-- /.box-footer -->
    </div>

    

  </section>
</div>
</div>


<div class="row">
 <div class="col-lg-12 col-sm-12 col-xs-12 ">
  <label class="label label-success">VENTA Y CONSUMO DE ALIMENTO</label>
  <div id="line-chart3"></div>
  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
    <label>Desde</label>
    
    <div class="pull-right"><input type="date" id="fechainicio" name="fecha_inicio" value= <?php  echo $fecha1; ?> class="form-control"></div>
  </div> 

  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
   <?php $fecha=DB::select("SELECT curdate()as fecha"); ?>
   <label>hasta</label>
   
   <div class="pull-right"><input type="date" id="fechafin" name="fecha_fin" value= <?php  echo $fecha2; ?> class="form-control"></div>

 </div>   
 <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 "> 
  <button class="btn btn-primary" onclick="ReporteVentaTotal()"><i class="fa fa-search" aria-hidden="true"></i></button>
  
</div> 
</div>
</div>
</div>
<br><br>
<footer class="footer">
 <div class="container-fluid">
  <p class="copyright pull-right">
    &copy; <script>document.write(new Date().getFullYear())</script> <a href="#">TITO</a>, MODESTO SALDAÑA TODOS LOS DERECHOS RECERVADOS
  </p>
</div>
</footer>
</div>
</div>
</body>
{!!Html::script('js/jquery.min.js')!!}
{!!Html::script('js/plugins/jquery-ui.js')!!}
{!!Html::script('js/bootstrap.min.js')!!}
{!!Html::script('js/plugins/raphael.js')!!}
{!!Html::script('js/plugins/morris.js')!!}
{!!Html::script('js/demo/demo.js')!!}
</html>
