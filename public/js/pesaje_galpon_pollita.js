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
    'url' : '../getControlPesajePollita' ,
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
             },
    typeData : 'JSON',
    type: 'POST',
    data : { pesaje_galpon_id : $( '#pesaje_galpon_id' ).val() },
    success : function( response )
    {
        $( '#edad' ).text( response.promedioPesajeGalpon.edad );
        var promedio_peso = response.promedioPesajeGalpon.promedio_peso ? response.promedioPesajeGalpon.promedio_peso.toFixed(2) : 0;
        $( '#promedioTotal' ).text( promedio_peso);
        $( '#pesoIdeal' ).text( response.promedioPesajeGalpon.pesoIdeal);
        $( '#semanas' ).text( response.promedioPesajeGalpon.semana);
        $( '#title-galpon' ).text( response.promedioPesajeGalpon.nombre);

    	$.each( response.data, function(index , value){
    		var fecha = moment( value.fecha, 'YYYY-MM-DD' ).format('DD/MM/YYYY');
    		var htmlButtonAction = '<button class="btn btn-primary" onclick="getItemById('+ value.id +')">Modificar</button>\n\
            <button class="btn btn-danger" onclick="eliminarItem('+ value.id +')">Eliminar</button>';
    		var html = '<tr><td>' + value.peso + '</td><td>' + value.unidad + '</td><td>' + value.codigo_referencia + '</td><td>' 
    		+ fecha + '</td><td>'+htmlButtonAction ;
    		$( '#tb_datos' ).append( html );
    	});
		cerrarCargando();
    }
});
}
var pesoAnterior = 0;
$( '#form-modal' ).on('submit', function(e)
{
	e.preventDefault();
	var data = $(this).serialize();
    var elementId = $( '#item_id' ).val();
	// var fecha = $( '#fecha' ).val();
	// var fechaFormat = moment( fecha, 'DD/MM/YYYY').format( 'YYYY-MM-DD' );
    var idEdit = '';
    var typeSend = 'POST';
	cargando();
    if ( elementId != '0') 
    {
        typeSend = 'PUT';
        idEdit = '/'+elementId;
    }
    
    pesoAnterior = $( '#peso' ).val();
	
    $.ajax({
		'url' : '../pesaje_galpon_pollita' +idEdit,
		headers: 
		{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type : typeSend,
        data : data,
        success : function( response )
        {
        	var status = response.status ? 'success' : 'error';
        	MessageAlerfify( status, response.message );
            $( '#form-modal' ).get(0).reset();
            $( '#peso_anterior' ).val( pesoAnterior );
            // $( '#myModal' ).modal('hide');
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
		'url' : '../pesaje_galpon_pollita'+'/'+elementId+'/edit',
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
        	$( '#peso' ).val( response.data.peso );
        	$( '#cod_referencia' ).val( response.data.codigo_referencia );
        	$( '#unidad' ).val( response.data.unidad );
            $( '#item_id' ).val( elementId );

        },
        error : failErrors

	});
}
function openModalPesaje()
{
	$( '#myModal' ).modal('show');
	$( '#form-modal' ).get(0).reset();
    $( '#peso_anterior' ).val( pesoAnterior );
    $( '#item_id' ).val( 0 );
}
/**
* Elimina un item obtenida desde el table
*/
function eliminarItem( id, titleName = '' )
{
    alertify.confirm("Eliminar Item","Esta seguro que desea eliminar" + titleName +"?",
      function( ){
        $.ajax({
            url : '../pesaje_galpon_pollita/'+id,
            type: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success : function( response )
            {

            }
        });
      },
      function(){
        alertify.error('Cancel');
      });
}