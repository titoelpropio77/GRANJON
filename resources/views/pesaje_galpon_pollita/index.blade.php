@extends ('layouts.admin')
@section ('content')
@include('alerts.cargando')
@include('pesaje_galpon_pollita.modal')


<div id="alert" class="hidden" ></div>
<input type="hidden" name="_token" value="{{ csrf_token()}}" id="token">
<div class="row">	
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="table-responsive">	
            <div class="pull-left"><H1>CONTROL DE PESAJES</H1></div>
            <div class="pull-right"><H1>GALPON <span id="title-galpon"></span></H1></div>
             
            <br>
            <div class="col-lg-12">
                <div class="col-lg-6">
                <label>Edad : 
                    <span id="edad">300 </span> Días
                </label>
                <br>
                <label>Semanas : 
                    <span id="semanas"> </span> (Redondeado)
                </label>
                <br>
                <label>Peso Ideal :
                    <span id="pesoIdeal">300</span> Gramos
                </label>
                <br>
                <label>Promedio Peso Total Actual :
                    <span id="promedioTotal">300 </span>
                </label>
                </div>
                <div class="col-lg-6 ">
                    <div class="pull-right">
                        <a class='btn btn-danger' href="javascript:history.back(1)">RETROCEDER</a>
                    </div>
                    <div class="pull-left">
                        <button class='btn btn-success ' onclick="openModalPesaje()" >AGREGAR</button>
                    </div>
                </div> 
            </div>
           
            <div class="table">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead align="center" bgcolor=black style="color: white">
                        <td>Peso</td>
                        <td>Unidad</td>
                        <td>Codigo Referencia</td>
                        <td>Fecha de Creacion</td>
                        <td>Acciones</td>
                    </thead>

                     <tbody id="tb_datos">
                    
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

{!!Html::script('js/pesaje_galpon_pollita.js')!!}

@endsection