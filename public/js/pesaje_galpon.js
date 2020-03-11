$(document).ready(function(){
	// $( '#loading' ).css( 'display', 'none' );
	cerrarCargando();
	$('#datetimepicker').datetimepicker({
      viewMode: 'days',
      format: 'DD/MM/YYYY'
  	});
	control_de_pesaje();
});
/**
* retorna el estado en texto del pesaje
* 0 = en proceso , 1 = terminado, 2 = anulado
*/
function estadoPesaje( estado )
{
	switch( estado )
	{
		case 0 : 
			var estado = 'En proceso de pesaje';
		break;
		case 1 : 
			var estado = 'Terminado';
		break;
		case 2 : 
			var estado = 'Anulado';
		break;
    }
    return estado;
}
/**
* obtiene la informacion del pesaje del galpon
* param integer id del galpon
*/
function control_de_pesaje()
{
cargando();
$( '#tb_datos' ).empty();
$.ajax({
    'url' : '../getControlPesaje' ,
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
             },
    typeData : 'JSON',
    type: 'POST',
    data : { edad_id : $( '#edad_id' ).val() },
    success : function( response )
    {
    	$.each( response.data, function(index , value){
    		var fecha = moment( value.fecha, 'YYYY-MM-DD' ).format('DD/MM/YYYY');

    		
    		var estado = estadoPesaje(value.estado );
    		var htmlButtonAction = '<button class="btn btn-primary" onclick="getItemById('+ value.id +')">Modificar</button>\n\
            <button class="btn btn-danger">Eliminar</button><a href="../pesaje_galpon_pollita/'+value.id+'" class="btn btn-info">Pesar Pollos</a>';
    		var html = '<tr><td>' + value.cod_grupo + '</td><td>' + fecha + '</td><td>' 
    		+ estado + '</td><td>' + value.observacion + '</td><td>'+htmlButtonAction ;
    		$( '#tb_datos' ).append( html );
    	});
		cerrarCargando();
    }
});
}

$( '#form-modal' ).on('submit', function(e)
{
	e.preventDefault();
	var data = $(this).serialize();
	var fecha = $( '#fecha' ).val();
    var elementId = $( '#item_id' ).val();
	var fechaFormat = moment( fecha, 'DD/MM/YYYY').format( 'YYYY-MM-DD' );
    var idEdit = '';
       var typeSend = 'POST';
	cargando();
    if ( elementId != '0') 
    {
        typeSend = 'PUT';
        idEdit = '/'+elementId;
    }
    

	
    $.ajax({
		'url' : '../pesaje_galpon' +idEdit,
		headers: 
		{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type : typeSend,
        data : { cod_grupo : $( '#cod_grupo' ).val(), 
        		fecha: fechaFormat, observacion : $( '#observacion' ).val(), 
        		edad_id : $( '#edad_id' ).val() , 'estado' : $( '#estado' ).val() 
        		},
        success : function( response )
        {
        	var status = response.status ? 'success' : 'error';
        	MessageAlerfify( status, response.message );
            $( '#myModal' ).modal('hide');
            control_de_pesaje();
			cerrarCargando();
        }
	});

});
/**
* obteiene los datos seleccionados desde el item del datatable
*/
function getItemById( elementId )
{

	openModalPesaje();

	$.ajax({
		'url' : '../pesaje_galpon'+'/'+elementId+'/edit',
		headers: 
		{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type :'GET',
        data : { elementId : elementId },
        success : function( response )
        {

        	var fecha = response.data.fecha;
			var fechaFormat = moment( fecha, 'YYYY-MM-DD' ).format( 'DD/MM/YYYY' );
        	$( '#cod_grupo' ).val( response.data.cod_grupo );
        	$( '#fecha' ).val( fechaFormat );
        	$( '#estado' ).val( response.data.estado );
        	$( '#observacion' ).val( response.data.observacion );
            $( '#item_id' ).val( elementId );

        },
        error : failErrors

	});
}
function openModalPesaje()
{
	$( '#myModal' ).modal('show');
	$( '#form-modal' ).get(0).reset();
    $( '#item_id' ).val( 0 );
}