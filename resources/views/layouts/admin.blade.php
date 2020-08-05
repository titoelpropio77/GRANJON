

<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title> SISTEMA GRANJA</title>
        <link rel="shortcut icon" href="{{asset('images/granja.png')}}">
        {!!Html::style('css/font-awesome.min.css')!!}
        {!!Html::style('css/bootstrap.min.css')!!}
        {!!Html::style('css/metisMenu.min.css')!!}
        {!!Html::style('css/sb-admin-2.css')!!}

        {!!Html::style('css/AdminLTE.css')!!}
        {!!Html::style('css/style.css')!!}
        {!!Html::style('css/bootstrap-datetimepicker.css')!!}

        {!!Html::script('js/jquery.min.js')!!}
        {!!Html::script('js/bootstrap.min.js')!!}
        {!!Html::style('css/toastr.css')!!}
        {!!Html::script('js/toastr.min.js')!!}
        {!!Html::style('css/bootstrap-select.min.css')!!}
        {!!Html::style('css/alertify.css')!!}
        {!!Html::style('css/default.css')!!}
        {!!Html::style('plugins/select2/css/select2.css')!!}
      
    </head>

    <body>

<!--class="navbar navbar-inverse"  -->
<div id="wrapper">
    <div id="page-wrapper">
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
                @if(Auth::user()!=null) 
                @endif  

                ><a href="{!!URL::to('galpon')!!}">Ponedora</a></li>
                <li  @if(Auth::user()!=null)      @endif ><a href="{!!URL::to('criarecria')!!}">Crias</a></li>

                 @if(Auth::user()==null) 
                  <li><a href="{!!URL::to('cajadeposito')!!}">Cajas</a></li>
                @endif  
                 @if(Auth::user()!=null) 
                  <li><a href="{!!URL::to('cajadeposito_admin')!!}">Cajas</a></li>
                @endif    

                <li class="dropdown" @if(Auth::user()!=null) @endif     > 
                  <a class="dropdown-toggle" data-toggle="dropdown" href="">Ventas<span class="caret"></span></a>
                  <ul class="dropdown-menu">
                      <li><a href="{!!URL::to('ventacaja')!!}">Venta Caja</a></li>
                      <li><a href="{!!URL::to('ventahuevo')!!}">Venta Huevo Descarte</a></li>    
                  </ul>
                </li>


                @if(Auth::user()!=null) 

                <li><a href="{!!URL::to('controlalimento')!!}">Control Alimento</a></li>                    
                <li class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" href="">Gestion de Galpones<span class="caret"></span></a>
                  <ul class="dropdown-menu">

                    <li><a href="{!!URL::to('edad')!!}">Gestion de Galpones</a></li>
                    <li><a href="{!!URL::to('consumo_alimento')!!}">Consumo de Alimento</a></li>    
                    <li><a href="{!!URL::to('vacuna')!!}">Sanidad(Gest. Vacuna)</a></li>  
                    <li><a href="{!!URL::to('compra')!!}">Compra de Alimento</a></li> 
                  </ul>
                </li>
                     
                       
                 
                  <li class="dropdown" >
                    <a class="dropdown-toggle" data-toggle="dropdown" href="">Caja-Huevo<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="{!!URL::to('maple')!!}">Maple</a></li>
                        <li><a href="{!!URL::to('tipocaja')!!}">Tipo cajas</a></li>
                        <li><a href="{!!URL::to('tipohuevo')!!}">Tipo huevo descarte</a></li> 
                        <li><a href="{!!URL::to('lista_caja')!!}">Lista de cajas</a></li>     
                        <li><a href="{!!URL::to('lista_maple')!!}">Lista de huevo descarte</a></li>  
                    </ul>
                  </li>
                 <!-- <li class="dropdown" style="width: 8%;"> -->
                  <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="">Reporte<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="{!!URL::to('reporteponedoras')!!}">Reporte postura</a></li>                                
                        <li><a href="{!!URL::to('reportecaja')!!}">R. Venta cajas</a></li>                                      
                        <li><a href="{!!URL::to('reportehuevo')!!}">R. Venta H. descarte</a></li>                                
                        <li><a href="{!!URL::to('reporte_compra')!!}">R. Compra alimento</a></li>
                        <li><a href="{!!URL::to('lista_gallinas')!!}">R. gallinas</a></li>     
                        <li><a href="{!!URL::to('reportebalance')!!}">R. Genarl</a></li> 
                        <li><a href="{!!URL::to('Rgrafico_postura2')!!}">R. Grafico</a></li>     
                    </ul>
                  </li>
                  <li class="dropdown" >
                    <a class="dropdown-toggle" data-toggle="dropdown" href="">Configuraciones<span class="caret"></span></a>
                    <ul class="dropdown-menu">    
                        <li><a href="{!!URL::to('fases')!!}">Reg. de Fases</a></li>
                        <li><a href="{!!URL::to('silo')!!}">Reg. de Silo</a></li>
                        <li><a href="{!!URL::to('vistagalpon')!!}">Reg. de Galpon</a></li>
                        <li><a href="{!!URL::to('alimento')!!}">Reg. de Tipo de alimento</a></li>
                        <li><a href="{!!URL::to('categoria')!!}">Reg. Tipo Ingreso o Egreso</a></li>
                        <li><a href="{!!URL::to('lista_compra')!!}">Anular compra de alimento</a></li>   
                        <li><a href="{!!URL::to('lista_egreso')!!}">Gestion Egreso</a></li>
                        <li><a href="{!!URL::to('lista_ingreso')!!}">Gestion Ingreso</a></li>  
                        <li><a href="{!!URL::to('temperatura')!!}">Gestion Temperatura</a></li>  
                        <li><a href="{!!URL::to('usuario')!!}">Registro Usuario</a></li>                        
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
         @yield('content')
    </div>                    
</div>
  {!!Html::script('js/moment.js')!!}
  {!!Html::script('js/numerosmasdecimal.js')!!}
  {!!Html::script('js/metisMenu.min.js')!!}
  {!!Html::script('js/sb-admin-2.js')!!}
  {!!Html::script('js/alertify.js')!!}
  {!!Html::script('js/bootstrap-datetimepicker.min.js')!!}
  {!!Html::script('js/plugins/HERRAMIENTAS.js')!!}
  {!!Html::script('plugins/select2/js/select2.js')!!}
   @yield('script')
    </body>
</html>


