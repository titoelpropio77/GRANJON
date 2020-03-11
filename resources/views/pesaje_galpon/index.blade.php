@extends ('layouts.admin')
@section ('content')
@include('alerts.cargando')
@include('pesaje_galpon.modal')

<div id="alert" class="hidden" ></div>
<input type="hidden" name="_token" value="{{ csrf_token()}}" id="token">
<input type="hidden" name="id_edad" value="{{ $id_edad }}" id="id_edad">
<div class="row">	
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="table-responsive">	
            <div class="pull-left"><H1>CONTROL DE PESAJES</H1></div>
            <div class="pull-right">
                <button class='btn btn-success' onclick="openModalPesaje()" >AGREGAR</button>
            </div> 
            <table class="table table-striped table-bordered table-condensed table-hover">
                <thead align="center" bgcolor=black style="color: white">
                    <td>Grupo/Semana</td>
                    <td>Fecha de Creacion</td>
                    <td>Estado</td>
                    <td>Observacion</td>
                    <td>Acciones</td>
                </thead>

                 <tbody id="tb_datos">
                
                </tbody>
            </table>
        </div>
    </div>
</div>

{!!Html::script('js/pesaje_galpon.js')!!}

@endsection