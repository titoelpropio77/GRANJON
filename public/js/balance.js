    
var formBusqueda = '#form-busqueda';
$(document).ready(function(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    if (dd < 10) {  dd = '0' + dd }
    if (mm < 10) {  mm = '0' + mm  }
    hoy = yyyy + '-' + mm + '-' + dd;
    $('#fecha_inicio').val(hoy);
    $('#fecha_fin').val(hoy);
    $(function (){ $("#datetimepicker1").datetimepicker({ viewMode: 'days',  format: 'YYYY-MM-DD' }); });
    $(function (){ $("#datetimepicker2").datetimepicker({ viewMode: 'days',  format: 'YYYY-MM-DD' }); });
    $('#btnPDF').attr("disabled", true);
     $('.js-example-basic-multiple').select2();
});

function balance_egreso(){
var fecha_inicio = $('#fecha_inicio').val();
var fecha_fin = $('#fecha_fin').val();

 if (fecha_inicio=="" || fecha_fin=="") {
     alertify.alert("INTRODUSCA LAS FECHAS");
 } else {

    var tabladatos=$("#datos_e");
    var tabladatos_ingresos=$("#datos_i");
    $(tabladatos_ingresos).empty();
     // var route = "lista_balance_egreso/"+fecha_inicio+"/"+fecha_fin;
     var route = "lista_balance_egreso";
    $("#datos_e").empty();
    var total=0;
    var primera = Date.parse(fecha_inicio); 
    var segunda = Date.parse(fecha_fin); 
    var total_ingreso = 0;
    if (primera > segunda) {
       toastr.options.timeOut = 9000;
                toastr.options.positionClass = "toast-top-right";
                toastr.error('LA FECHA HASTA TIENE QUE SER MAYOR A LA FECHA DESDE!!!');
    } else{
        $.ajax({
          url: route,
          method :'POST',
          data : $(formBusqueda).serialize(),

          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
           },
          success : function(res)
          {
            if ( res.status )  
            {
              $(res.data.egresos).each( function(key, value) {
                 total=total+parseFloat(value.total);
                 tabladatos.append("<tr><td align=left>"+value.detalle+"</td><td align=center>"+value.total+" Bs.</td></tr>");
              });
              $("#total_egreso").text(total);  
              tabladatos.append("<tr style='background-color: #A9F5F2'><td align=left><font size=3 color=red>TOTAL EGRESO</font></td><td align=center><font size=3 color=red>"+total.toFixed(2)+" Bs.</font></td></tr>");

              $(res.data.ingresos).each( function(key, value) {
                 total_ingreso=total_ingreso+parseFloat(value.total);
                 tabladatos_ingresos.append("<tr><td align=left>"+value.detalle+"</td><td align=center>"+value.total+" Bs.</td></tr>");
              });
              tabladatos_ingresos.append("<tr   style='background-color: #A9F5F2'><td align=left><font size=3 color=red>TOTAL INGRESO</font></td><td align=center><font size=3 color=red>"+total_ingreso.toFixed(2)+" Bs.</font></td></tr>");
              var total_b = total_ingreso-total;
              $("#total_balance").text(total_b.toFixed(2)) ;
            }
          }
        });
        //     $.get(route,function(res){
        //         $("#datos_e").empty();
        //    $(res).each(function(key,value){
        // tabladatos.append("<tr><td align=left>"+value.detalle+"</td><td align=center>"+value.total+" Bs.</td></tr>");
        // total=total+parseFloat(value.total);
        // $("#total_egreso").text(total);  
        // });
        //    tabladatos.append("<tr style='background-color: #A9F5F2'><td align=left><font size=3 color=red>TOTAL EGRESO</font></td><td align=center><font size=3 color=red>"+total.toFixed(2)+" Bs.</font></td></tr>");
        //    balance_ingreso();
        // }); 
    } 
 }
}

function balance_ingreso(){
var fecha_inicio = $('#fecha_inicio').val();
var fecha_fin = $('#fecha_fin').val();
var tabladatos=$("#datos_i");
 var route = "lista_balance_ingreso/"+fecha_inicio+"/"+fecha_fin;
$("#datos_i").empty();
var total=0;
var primera = Date.parse(fecha_inicio); 
var segunda = Date.parse(fecha_fin); 
if (primera > segunda) {
} else{
        $.get(route,function(res){
            $("#datos_i").empty();
       $(res).each(function(key,value){
        if (value.total!=null) {
          tabladatos.append("<tr><td align=left>"+value.detalle+"</td><td align=center>"+value.total+" Bs.</td></tr>");
          total=total+parseFloat(value.total);
          $("#total_ingreso").text(total);
        }
   
    });
       tabladatos.append("<tr   style='background-color: #A9F5F2'><td align=left><font size=3 color=red>TOTAL INGRESO</font></td><td align=center><font size=3 color=red>"+total.toFixed(2)+" Bs.</font></td></tr>");
       var total_ingreso = $('#total_ingreso').text();
       var total_egreso = $('#total_egreso').text();
       var total_b = total_ingreso-total_egreso;
       $("#total_balance").text(total_b.toFixed(2)) ;
        $("#total_ingreso").empty();
        $("#total_egreso").empty();
        $('#btnPDF').attr("disabled", false);
    }); 
}                                                                                                                                         
}

function cargar_fechas(){
var fecha_inicio = $('#fecha_inicio').val();
var fecha_fin = $('#fecha_fin').val();
 window.open('Reporte_Egreso_Ingreso/'+fecha_inicio+'/'+fecha_fin);                                                    
}
