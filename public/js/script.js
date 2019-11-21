input = 0;
input_celda = "";
id = 0;
valor = "0";
aumentar=0;//creo esta variable globlal para cuando quiere dar de comer de 2 silos aumentar va ser igual a 1

var intervalo = setInterval('obtener_temp()', 600000);

$(document).ready(function () {
    /*if ($('#token').val()=="") {
     setTimeout("location.href='galpon'",1000);
 }else{*/
    total_postura();
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    Diahoy = yyyy + '/' + mm + '/' + dd;
    $("#fecha1").val(Diahoy);
    $('#loading').css("display", "none");
var primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
var ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
var dd= primerDia.getDate();
var mm= primerDia.getMonth()+1;
var yyyy= primerDia.getFullYear();
if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
   primerDia = yyyy + '-' + mm + '-' + dd;


   var dd= ultimoDia.getDate();
var mm= ultimoDia.getMonth()+1;
var yyyy= ultimoDia.getFullYear();
if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
   ultimoDia = yyyy + '-' + mm + '-' + dd;
$( 'input[name=fecha_inicio]' ).val(primerDia);
$( 'input[name=fecha_fin]' ).val(ultimoDia);
  var pieChartCanvas = $("#pieChart").get(0).getContext("2d");

   pieChart = new Chart(pieChartCanvas,config);

 
});

// Find Left Boundry of current Window ESTE ES LO Q ABRE EN OTRA VENTANA EL FORMULARIO DE LOS ALIMENTADO
/*function FindLeftWindowBoundry()
 {
 // In Internet Explorer window.screenLeft is the window's left boundry
 if (window.screenLeft)
 {
 return window.screenLeft;
 }
 // In Firefox window.screenX is the window's left boundry
 if (window.screenX)
 return window.screenX;
 return 0;
 }
 
 window.leftWindowBoundry = FindLeftWindowBoundry;
 
 // Find Left Boundry of the Screen/Monitor
 function FindLeftScreenBoundry()
 {
 // Check if the window is off the primary monitor in a positive axis
 // X,Y                  X,Y                    S = Screen, W = Window
 // 0,0  ----------   1280,0  ----------
 //     |          |         |  ---     |
 //     |          |         | | W |    |
 //     |        S |         |  ---   S |
 //      ----------           ----------
 if (window.leftWindowBoundry() > window.screen.width)
 {
 return window.leftWindowBoundry() - (window.leftWindowBoundry() - window.screen.width);
 }
 
 // Check if the window is off the primary monitor in a negative axis
 // X,Y                  X,Y                    S = Screen, W = Window
 // 0,0  ----------  -1280,0  ----------
 //     |          |         |  ---     |
 //     |          |         | | W |    |
 //     |        S |         |  ---   S |
 //      ----------           ----------
 // This only works in Firefox at the moment due to a bug in Internet Explorer opening new windows into a negative axis
 // However, you can move opened windows into a negative axis as a workaround
 if (window.leftWindowBoundry() < 0 && window.leftWindowBoundry() > (window.screen.width * -1))
 {
 return (window.screen.width * -1);
 }
 // If neither of the above, the monitor is on the primary monitor whose's screen X should be 0
 return 0;
 }
 window.leftScreenBoundry = FindLeftScreenBoundry;
 miPopup = window.open('lista_alimento', 'windowName', 'resizable=1, scrollbars=1, fullscreen=1, height=1300, width=1000, screenX=' + window.leftScreenBoundry() + ' , left=' + window.leftScreenBoundry() + ', toolbar=0, menubar=0, status=1');
 */

 function extraer_id(id_galpon, input) {
    id = id_galpon;
    input_celda = input;
}

$(document).keypress(function (e) {
   if (e.which == 13) {    
    guardar_huevo();
} });
// $(document).keypress(function (e) {
//     if (e.which == 13) {
    function guardar_huevo(){
        if (valor == "0") {
            if (id != "") {
                valor = "1";
                if (!isNaN(parseInt($("#id_fase_galpon" + id).val()))) {
                    $('#loading').css("display", "block");
                    var token = $("#token").val();
                    var id_fase_galpon = $("#id_fase_galpon" + id).val();
                    if (isNaN(parseInt($("#mg" + id).val()))) {
                        var gallina_muerta = 0
                    } else {
                        var gallina_muerta = $("#mg" + id).val()
                    }
                    if (isNaN(parseInt($("#gmd" + id).text()))) {
                        var muerta_diaria = 0
                    } else {
                        var muerta_diaria = $("#gmd" + id).text()
                    }
                    var gallinas_actual = parseInt($('#cant_actual' + id).text()) - parseInt(gallina_muerta);
                    var total_muerta = parseInt($('#muerta' + id).text()) + parseInt(gallina_muerta);
                    var gallina_muerta_diaria = parseInt(muerta_diaria) + parseInt(gallina_muerta);
                    if ($("#cantidad_g" + id).text() != "0" && $("#cantidad_g" + id).attr('data-status') != '0') {
                        $("#cantidad_g" + id).text((parseInt(gallinas_actual) * parseFloat($("#c_granel_g" + id).text())).toFixed(1));
                    }
                    // $('#mg'+id).val("");         
                    if (isNaN(parseInt($("#c1g" + id).val()))) {
                        var celda1 = 0
                    } else {
                        var celda1 = $("#c1g" + id).val()
                    }
                    if (isNaN(parseInt($("#c2g" + id).val()))) {
                        var celda2 = 0
                    } else {
                        var celda2 = $("#c2g" + id).val()
                    }
                    if (isNaN(parseInt($("#c3g" + id).val()))) {
                        var celda3 = 0
                    } else {
                        var celda3 = $("#c3g" + id).val()
                    }
                    if (isNaN(parseInt($("#c4g" + id).val()))) {
                        var celda4 = 0
                    } else {
                        var celda4 = $("#c4g" + id).val()
                    }
                    var total_huevo = parseInt(celda1) + parseInt(celda2) + parseInt(celda3) + parseInt(celda4);
                    var postura_huevo = parseInt((parseInt(total_huevo) * parseInt(100)) / parseInt(gallinas_actual));
                    //alert(celda1+'-'+celda2+'-'+celda3+'-'+celda4+'-'+id_fase_galpon+'-'+total_huevo+'-'+postura_huevo+'-'+gallina_muerta+'-'+gallinas_actual+'-'+total_muerta);

                    $.ajax({
                        url: "galponi",
                       // headers: {'X-CSRF-TOKEN': token},
                       type: 'GET',
                       dataType: 'json',
                       data: {celda1: celda1, celda2: celda2, celda3: celda3, celda4: celda4, id_fases_galpon: id_fase_galpon, cantidad_total: total_huevo, postura_p: postura_huevo, cantidad_muertas: gallina_muerta_diaria},
                       success: function () {

                            if (!isNaN(parseInt($("#mg" + id).val()))) { //CUANDO INTRODUCE LAS MUERTAS ENTRA POR ACA
                                var route = "actualizar_fases/" + id_fase_galpon;
                                $.ajax({
                                    url: route,
                                   // headers: {'X-CSRF-TOKEN': token},
                                   type: 'GET',
                                   dataType: 'json',
                                   data: {cantidad_actual: gallinas_actual, total_muerta: total_muerta},
                                   success: function () {
                                    $('#cant_actual' + id).text(gallinas_actual);
                                    $('#muerta' + id).text(total_muerta);
                                        alertify.success("GUARDADO CORRECTAMENTE"); //DESDE ACA ES LO DE LAS POSTURA
                                        $('#gmd' + id).text(gallina_muerta_diaria);
                                        $("#total_galpones" + id).text(total_huevo);
                                        $("#ph" + id).text(postura_huevo + " %");
                                        $('#loading').css("display", "none");
                                        $('#mg' + id).val("");
                                        valor = "0";
                                    },
                                    error: function (msj) {
                                        $('#loading').css("display", "none");
                                        alertify.alert("EROR", "NO SE PUDO GUARDAR LOS DATOS DEL GALPON " + id + " INTENTE NUEVAMENTE");
                                        setTimeout("location.href='galpon'", 2000);
                                        valor = "0";
                                    }
                                });

                            } else {//CUANDO NO INTRODUCE LAS MUERTAS VA POS ACA
                                alertify.success("GUARDADO CORECCTAMENTE");
                                $('#gmd' + id).text(gallina_muerta_diaria);
                                $("#total_galpones" + id).text(total_huevo);
                                $("#ph" + id).text(postura_huevo + " %");
                                $('#loading').css("display", "none");
                                valor = "0";
                            }
                            total_postura();
                        },
                        error: function (msj) {
                            $('#loading').css("display", "none");
                            alertify.alert("EROR", "NO SE PUDO GUARDAR LOS DATOS DEL GALPON " + id + " INTENTE NUEVAMENTE");
                            setTimeout("location.href='galpon'", 2000);
                            valor = "0";
                        }
                    });
                } else {
                    alertify.alert('ERROR', 'GALPON VACIO');
                    $("#c1g" + id).val("");
                    $("#c2g" + id).val("");
                    $("#c3g" + id).val("");
                    $("#c4g" + id).val("");
                    $('#mg' + id).val("");
                    id = 0;
                    valor = "0";
                }
            }
        }
    }
//     }
// });

function obtener_temp() {
    var token = $("#token").val();
    $.ajax({
        url: "mostrar_tem",
        headers: {'X-CSRF-TOKEN': token},
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if ($("#temperatura").text() != response[0].temperatura) {
                $("#temperatura").text(response[0].temperatura);
                actualizar_control_alimento();
            }
        }
    });
}

function actualizar_control_alimento() {
    $('#loading').css("display", "block");
    var temperatura = parseInt($('#temperatura').text());
    var token = $("#token").val();
    $.ajax({
        url: "actualizar_control_alimento",
        headers: {'X-CSRF-TOKEN': token},
        type: 'GET',
        dataType: 'json',
        data: {temperatura: temperatura},
        success: function (response) {
            for (var i = 0; i < response.length; i++) {
                if (response[i].length != undefined) {
                    if ($('#id_alimento' + response[i][0].numero).attr('data-status') == 1) {
                        y = parseFloat($('#cant_actual' + response[i][0].numero).text());
                        $('#id_alimento' + response[i][0].numero).text(response[i][0].tipo + ":");
                        var x = parseFloat(y) * parseFloat(response[i][0].cantidad);
                        $('#cantidad_g' + response[i][0].numero).text(x.toFixed(2));
                        $('#c_granel_g' + response[i][0].numero).text(parseFloat(response[i][0].cantidad).toFixed(3));
                        $('#id_control' + response[i][0].numero).text(response[i][0].id_control);
                    }
                } else {
                    if ($('#id_alimento' + response[i]).attr('data-status') == 1) {
                        $('#id_alimento' + response[i]).text("");
                        $('#cantidad_g' + response[i]).text("0");
                        $('#c_granel_g' + response[i]).text("0");
                        $('#id_control' + response[i]).text("0");
                    }
                }
            }
            $('#loading').css("display", "none");
        }
    });
}

function mostrarceldas() {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    hoy = yyyy + '/' + mm + '/' + dd;
    globalhoy = hoy;
    $('#loading').css("display", "block");
    fecha = $('#fecha1').val();
    if (fecha == globalhoy) {
        for (var j = 0; j <= 16; j++) {
            $('#c1g' + j).prop('disabled', false);
            $('#c2g' + j).prop('disabled', false);
            $('#c3g' + j).prop('disabled', false);
            $('#c4g' + j).prop('disabled', false);
            $('#mg' + j).prop('disabled', false);
            $('#c1g' + j).val("");
            $('#c2g' + j).val("");
            $('#c3g' + j).val("");
            $('#c4g' + j).val("");
            $('#ph' + j).text(0);
            $('#gmd' + j).text(0);
            $('#total_galpones' + j).text(0);
        }
    } else
    {
        for (var j = 0; j <= 16; j++) {
            $('#c1g' + j).val("");
            $('#c2g' + j).val("");
            $('#c3g' + j).val("");
            $('#c4g' + j).val("");
            $('#ph' + j).text(0);
            $('#gmd' + j).text(0);
            $('#total_galpones' + j).text(0);
            $('#mg' + j).prop('disabled', true);
            $('#c1g' + j).prop('disabled', true);
            $('#c2g' + j).prop('disabled', true);
            $('#c3g' + j).prop('disabled', true);
            $('#c4g' + j).prop('disabled', true);
        }
    }
    var token = $("#token").val();
    $.ajax({
        url: "obtenerdadafecha",
        headers: {'X-CSRF-TOKEN': token},
        type: 'GET',
        dataType: 'json',
        data: {fecha: fecha},
        success: function (response) {
            $.each(response, function (key, value) {
                $('#ph' + value.numero).text(parseInt(value.postura_p) + '%');
                $('#total_galpones' + value.numero).text(value.cantidad_total);
                $('#gmd' + value.numero).text(value.cantidad_muertas);
                $('#c1g' + value.numero).val(value.celda1);
                $('#c2g' + value.numero).val(value.celda2);
                $('#c3g' + value.numero).val(value.celda3);
                $('#c4g' + value.numero).val(value.celda4);
            });
            $('#loading').css("display", "none");
        }
    });
}

function cargar_modal(opcion,id_edad,id_control,id_alimento, galpon, id_fase_galpon, cantidad, cantidad_granel) {//este carga el modal de alimento el parametro opcion 1 cuando cambio de alimento y 0 cuando no
   aumentar=0;
   $('#loading').css("display", "block");
   $('#div_cantidad_anterior').css('display','none');
   $("#cantidad_granel").val("");
   $("#cantidad").val("");
   $("#id_edad_galpon").val("");

   $('#id_div_cambiar_alimento').css('display','none');
   $('#id_div_aumentar_alimento').css('display','none');
   $aumentar=0;
   var id_alimento = id_alimento;

   if (opcion==1) {
    $('#btn_cambiar_alimento').css('display','none');
    $('#btn_activar_control').css('display','block');

}else{
    $('#btn_cambiar_alimento').css('display','block');
    $('#btn_activar_control').css('display','none');

}
if (id_alimento == 0) {
    $("select[name=id_silo]").empty();
    $("select[name=id_silo]").addClass("form-control");
    $("select[name=id_silo]").append("<option value='0'></option>");
    $('#loading').css("display", "none");

    $("#btn_aceptar").hide();
} else {
    $("select[name=id_silo]").empty();
    $("select[name=id_silo]").addClass("form-control");
    $.get("lista_de_silos/" + id_alimento, function (response) {
        if (response.length == 0) {
            $("#espacio_2").css({'background': '#F5A9A9'});
            $("#btn_aceptar").hide();
            $("#titulo").text("EL ALIMENTO " + $("#id_alimento" + galpon).text() + " NO SE ENCUENTRA EN NINGUN SILO REGISTRADO");
        } else {
            $("#espacio_2").css({'background': '#A9F5F2'});
            for (var i = 0; i < response.length; i++) {
                $("select[name=id_silo]").append("<option value='" + response[i].id_silo + "'>" + response[i].nombre + " → " + response[i].tipo + "</option>");
                $("#tipo").val(response[i].tipo);
                xxx = response[i].id_silo;
            }
            $("#titulo").text("ALIMENTAR GALPON " + galpon);
            $("#id_galpon").val(galpon);
            $("#cantidad_actual_g").val($("#cant_actual" + galpon).text());
            $("#cantidad").val(cantidad);
            $("#id_fase_galpon").val(id_fase_galpon);
            $("#id_control_alimento").val(id_control);
            $("#id_tipo_alimento").val(id_alimento);
            $("#id_edad_galpon").val(id_edad);
            $('#precio_costo_ultima_compra').val(response[0].costo_ultima_compra);
                // $("#id_alimento_cons").val()
                id = 0;
                $("#id_control").val($('#id_control' + galpon).text());
                $("#cantidad_granel").val($('#c_granel_g' + galpon).text());
                $("#btn_aceptar").show();
                $('#loading').css("display", "none");


            }
            /* $.get("lista_de_silos_aux/"+xxx, function (response) {//`CREO Q ES PARA Q APARESCA LOS DEMAS GALPONES
             for (var i = 0; i < response.length; i++) {
             $("select[name=id_silo]").append("<option value='" + response[i].id_silo + "'>" + response[i].nombre + " → " + response[i].tipo +"</option>");
             }
         });  */
     });


}

}

function calcular_alimento() {
    if ($("#cantidad_granel").val() == "") {
        $("#cantidad").val("");
        $("#btn_aceptar").hide();
    } else {
        var dato = (parseFloat($("#cantidad_granel").val()) * parseFloat($("#cantidad_actual_g").val())).toFixed(0);
        $("#cantidad").val(dato);
        $("#btn_aceptar").show();
    }
}

function alimentar() {
    $('#btn_alimentar').hide();
    $('#loading').css("display", "block");

    var id_control_alimento = $("#id_control_alimento").val();
    var id_fase_galpon = $("#id_fase_galpon").val();
    var id_tipo_alimento=$('#id_tipo_alimento').val();
    var cantidad = $("#cantidad").val();
    var id_silo = $("#id_silo").val();
    var token = $("#token").val();
    var costo_ultima_compra=$('#precio_costo_ultima_compra').val();

    id_silo2=$('#id_select_aumentar_al').val();
    var   cantidad2=$('#id_cantidad_aumentar').val();
    if (aumentar==1) {
        if (id_silo2 =='0' || cantidad2=="" ) {
           alertify.error('INSERTE TODOS LOS DATOS CORRESPONDIENTES');
           $('#btn_aceptar').show();
           $('#loading').css("display", "none");
           return;

       }else{
        if (id_silo ==id_silo2) {
           alertify.error('NO SE PUEDE DAR EL MISMO SILO');
           $('#btn_aceptar').show();
           $('#loading').css("display", "none");
           return;
       }
   }


}
else{
    if (cantidad=="" ) {
      alertify.error('INSERTE TODOS LOS DATOS CORRESPONDIENTES');
      return;
  }
  $('#btn_aceptar').show();
  $('#loading').css("display", "none");
}

var costo_consumo=cantidad*$('#precio_costo_ultima_compra').val();

$.ajax({
    url: "consumostore",
        //headers: {'X-CSRF-TOKEN': token},
        type: 'GET',
        dataType: 'json',
        data: {costo_consumo:costo_consumo,id_silo2:id_silo2,cantidad2:cantidad2,aumentar:aumentar,id_alimento:id_tipo_alimento,cantidad: cantidad, id_silo: id_silo, id_fase_galpon: id_fase_galpon, id_control_alimento: id_control_alimento},
        success: function (response) {
            if (response.mensaje !== undefined) {
             alertify.alert("ADVERTENCIA",response.mensaje,
              function(){

                alertify.success('OK');
                location.reload();

            });

         } else {
            if (response.mensaje1 !== undefined) {

                alertify.confirm("ADVERTENCIA",response.mensaje1+". ¿DESEA COMPLETAR LA CANTIDAD CON OTRO SILO?",
                  function(){
                     $('#btn_alimentar').show();
                    if (aumentar==0) {
                        $('#id_div_aumentar_alimento').css('display','block');
                        $("#cantidad").val(response.cantidad);
                        $('#id_cantidad_aumentar').val((cantidad-response.cantidad).toFixed(2));
                    aumentar=1;}//creo esta variable globlal para cuando quiere dar de comer de 2 silos aumentar va ser igual a 1 caso contrario 0
                    alertify.success('COMPLETAR');
                },
                function(){
                    alertify.error('CANCELAR');
                });
            } else {
                alertify.success("GUARDADO CORECCTAMENTE");
                    //miPopup.document.location.reload();
                    location.reload();
                }
            }

            $('#loading').css("display", "none");
            $('#btn_aceptar').show();
        },
        error: function () {
            $('#loading').css("display", "none");
            alertify.alert("EROR", "NO SE PUDO GUARDAR LOS DATOS INTENTE NUEVAMENTE");
            $('#btn_aceptar').show();
        },
    });

}

function actualizar() {
    location.reload();
}

function vacunas() {
    $.get("lista_id_edad", function (response) {
        for (var i = 0; i < response.length; i++) {
            if (response[i].length != 0) {
                $("#vacuna" + response[i][0].galpon).text(response[i][0].nombre);
                if (response[i][0].dias == 0) {
                    $("#dias" + response[i][0].galpon).text('HOY');
                } else {
                    $("#dias" + response[i][0].galpon).text(response[i][0].dias);
                }
            }
            $('#loading').css("display", "none");
        }
    });
}

function cargar_id_control_vacuna(id_control, precio, id_vacuna) {
    $("#btn_consumir").show();
    $("#cantidad_vac").val(1);
    $('#loading').css("display", "block");
    $("#precio").val(precio);
    $("#precio_aux").val(precio);
    $("#nombre_vacuna").val(precio);
    $("#id_control_vacuna").val(id_control);

    $.get("verificar_consumo_vacuna/" + id_control, function (res) {
        $("#mensaje_vacuna").text(res.mensaje);
        if (res.mensaje == "¿DESEA CONSUMIR ESTA VACUNA?") {
            $("#espacio").css({'background': '#A9F5F2'});
        } else {
            $("#espacio").css({'background': '#F5A9A9'});
        }
        $('#loading').css("display", "none");
    });

    $.get("ver_vacunas/" + id_vacuna, function (res) {
        $("#vacuna").text(res[0].nombre);
        $("#detalle").text(res[0].detalle);
    });
}

function calcular() {
    if ($("#cantidad_vac").val() == "") {
        $("#precio").val("");
        $("#btn_consumir").hide();
    } else {
        var dato = parseFloat($("#cantidad_vac").val()) * parseFloat($("#precio_aux").val());
        $("#precio").val(dato.toFixed(2));
        $("#btn_consumir").show();
    }
}

function consumir_vacuna() {
    $('#loading').css("display", "block");
    $("#btn_consumir").hide();
    var cantidad = $("#cantidad_vac").val();
    var precio = $("#precio").val();
    var id_control_vacuna = $("#id_control_vacuna").val();
    var token = $("#token").val();
    $.ajax({
        url: 'consumo_vacuna_get',
        //headers: {'X-CSRF-TOKEN': token},
        type: 'GET',
        dataType: 'json',
        data: {cantidad: cantidad, precio: precio, id_control_vacuna: id_control_vacuna, estado: 1},
        success: function () {
            alertify.success("VACUNA CONSUMIDA CORRECTAMENTE");
            $('#myModalConsumo').modal('hide');
            $('#loading').css("display", "none");
            $('#id_consumir').show();
            $("#id_control_vacuna").val("");
            $("#cantidad_vac").val("");
            $("#precio").val("");
            $("#btn_consumir").show();
        },
        error: function () {
            alertify.alert("NO SE PUDO CONSUMIR INTENTE NUEVAMENTE");
            setTimeout("location.href='galpon'", 2000);
        },
    });
}

function postergarvacuna() {
    $('#loading').css("display", "block");
    var id_control_vacuna = $("#id_control_vacuna").val();
    var token = $("#token").val();
    $.ajax({
        url: 'postergar_vac',
       // headers: {'X-CSRF-TOKEN': token},
       type: 'GET',
       dataType: 'json',
       data: {id_control_vacuna: id_control_vacuna, estado: 1},
       success: function (res) {

        if (res.mensaje==undefined) {
         alertify.success("VACUNA POSTERGADA CORRECTAMENTE");

     }else{
        alertify.error(res.mensaje);

    }
    $('#myModalConsumo').modal('hide');
    $('#loading').css("display", "none");
},
error: function () {
    alertify.alert("NO SE PUDO POSTERGAR INTENTE NUEVAMENTE");
//            setTimeout("location.href='galpon'", 2000);
},
});
    
    


}

function LPostergacionVacuna(id_edad){
    $('#loading').css("display", "block");

    $('#LPostergacionVacuna').empty();
    $.get('LPostergacionVacuna/'+id_edad,function(res){
     for (var i = 0; i < res.length; i++) {
       $('#LPostergacionVacuna').append('<tr align="center"><td>'+res[i].nombre+'</td><td>'+res[i].detalle+'</td>\n\
          <td><button onclick="ConsElimiVacunaPostergada(1,'+res[i].idcontrol_vacuna+','+res[i].id+')" data-dismiss="modal" class="btn btn-success">VACUNAR</button>\n\
          <button onclick="ConsElimiVacunaPostergada(2,'+res[i].idcontrol_vacuna+','+res[i].id+')" data-dismiss="modal" class="btn btn-danger">ELIMINAR</button></td></tr>')


   }
   $('#loading').css("display", "none");

});
    
}
//esta function controlla el modal vacunas postergadas elimina o consume la vacuna 
function ConsElimiVacunaPostergada(opcion,idControVacuna,idVacunaPostergada){
    $('#loading').css("display", "block");

    if (opcion==1) {
       $.get('ConsVacPost/'+idControVacuna+'/'+idVacunaPostergada,function(res){

         //consumir vacuna postergada
         $('#loading').css("display", "none");
         alertify.success(res.mensaje);

     });   
   }
   else{
       $.get('EliminarVacPost/'+idControVacuna+'/'+idVacunaPostergada,function(res){

         //consumir vacuna postergada
         $('#loading').css("display", "none");
         alertify.success(res.mensaje);

     });   
   }

}

function dartodo(){//esta funcion devuelve toda la cantidad actual que el silo entrante tiene el boton esta en modal de consumo

    id_silo=$('#id_silo').val();


    $.get('dartodo/'+id_silo,function(res){
      $('#div_cantidad_anterior').css('display','block');
      $('#cantidad_anterior').val($('#cantidad').val());
      $('#cantidad').val(res[0].cantidad);

  });
}

function CambiarAlimento(){//esta funcion genera todos los alimento en el select ubicado en el modal de consumo alimento
    id_silo=$('#id_silo').val();

    $.get('CambiarAlimento/'+id_silo,function(res){
        for (var i = 0; i < res.length; i++) {
            $('#id_silo').append('<option value='+res[i].id+'>'+res[i].nombre+' → '+ res[i].tipo);

        }
    });
}

function guarda_alimento(){//esta funcion guarda en la tabla cambiar alimento el alimento y el silo para que este se muestre continuamente 
    id_silo=$('#id_select_cambiar_al').val();
    id_edad=$('#id_edad_galpon').val();
    if (id_silo!=0) {

        $.get('guarda_alimento/'+id_silo+'/'+id_edad,function(res){
          if (res) {
           alert('SE GUARDO CORRECTAMETNE');
           location.reload();
       }
   }).
        fail(function(){
            alert(" A SUCEDIDO UN ERROR ");
        });}
        else{
            toastr.error('SELECCIONE UN ALIMENTO');
        }}
        function mostrar_div(){
            $('#id_div_cambiar_alimento').css('display','block');
        }
        function activar_control(){
           id_edad=$('#id_edad_galpon').val();
           $.get('activar_control/'+id_edad,function(res){
            if (res) {
                alert('SE ACTIVO EL CONTROL CORRECTAMETNE');
                location.reload();
            }
            else{
                alert('A SUCEDIDO UN ERROR INTENTE NUEVAMENTE');
                location.reload();

            }
        }).fail(function(){
            alert('A SUCEDIDO UN ERROR INTENTE NUEVAMENTE');

        });

    }


    function total_postura(){
        $.get('total_postura',function(res){
            if (res[0].porcentaje!=null) {
                $('#porcentaje_total').text(res[0].porcentaje+"%");

            }
            else{
                $('#porcentaje_total').text("0%");

            }


        });
    }
    function ReporteProduccion(){
    
     var ret2 = [];
      ret2.length=0;
     $('#line-chart').empty();

     fechainicio=$('#fecha_inicio').val();
     fechafin=$('#fecha_fin').val();
     id_edad=$('#id_edad').val();

     $.get('ReporteProduccionGrafico2/'+fechainicio+'/'+fechafin+'/'+id_edad,function(res)
     {
        $(res).each(function(key,value){
           ret2.push({
             y: value.fechacompleta, a:value.porcentaje,b:value.temperatura

         });
       });
        var line = new Morris.Line({
           data: ret2,
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Porcentaje','Temperatura'],
            fillOpacity: 0.6,
            element: 'line-chart',
            hideHover: 'auto',
            behaveLikeLine: true,
            resize: true,
            pointFillColors: ["#ffffff"],
            pointStrokeColors: ['black'],
            lineColors:['white','red'],
            lineWidth: 2
        });

    });



 }
 function produccionconsumo()
 {
    var arrayproduccion = [];
     arrayproduccion.length=0;
  $('#line-chart3').empty();
    fechainicio=$('#fecha_iniciop').val();
     fechafin=$('#fecha_finp').val();
     id_edad=$('#id_edadp').val();
     $.get('ReproteDeConsumoPostura/'+fechainicio+'/'+fechafin+'/'+id_edad,function(res)
     {
        $(res).each(function(key,value){
           arrayproduccion.push({
             y: value.fecha, a:value.postura_p,b:value.costo_consumo,c:value.temperatura

         });
       });
        var line1 = new Morris.Line({
            data: arrayproduccion,
            xkey: 'y',
            ykeys: ['a', 'b', 'c'],
            labels: ['Porcentaje','Costo Alimentacion','Temperatura'],
            fillOpacity: 0.6,
            element: 'line-chart3',
            hideHover: 'auto',
            behaveLikeLine: true,
            resize: true,
            pointFillColors: ["#ffffff"],
            pointStrokeColors: ['black'],
            lineColors:['gray','green','red'],
            lineWidth: 2
        });
    });
}
function reportemortandad()
 {
    var arrayproduccion = [];
     arrayproduccion.length=0;
  $('#line-chart4').empty();
    fechainicio=$('#fecha_iniciom').val();
     fechafin=$('#fecha_finm').val();
     id_edad=$('#id_edadm').val();
     $.get('ReporteMortandad/'+fechainicio+'/'+fechafin+'/'+id_edad,function(res)
     {
        $(res).each(function(key,value){
           arrayproduccion.push({
              y: value.fechapostura, item1:value.cantidad_muertas

         });
       });
    
         var line = new Morris.Line({
            element: 'line-chart4',
            resize: true,
            data: arrayproduccion,
            xkey: 'y',
            ykeys: ['item1'],
            labels: ['Muertas'],
            lineColors: ['#efefef'],
            lineWidth: 2,
            hideHover: 'auto',
            gridTextColor: "#fff",
            gridStrokeWidth: 0.4,
            pointSize: 4,
            pointStrokeColors: ["#efefef"],
            gridLineColor: "#efefef",
            gridTextFamily: "Open Sans",
            gridTextSize: 10
        });
    });
}


function reporteGraficoTipoCaja()
{
        var arrayproduccion = [];
      arrayproduccion.length=0;
  $('#line-chart-caja').empty();
    var fechainicio=$('#fecha_inicio_caja').val();
    var fechafin=$('#fecha_fin_caja').val();
     $.get('ReporteTiposDecaja/'+fechainicio+'/'+fechafin,function(res)
     {
        var _data = res;
        tortaTiposDehuevo( _data )
        var totalCajas =res.PRIMERA.length;
        for (var i = 0; i < totalCajas; i++) {
            var extra = res.EXTRA.length > i ? res.EXTRA[i].total : 0;
            var tercera = res.TERCERA.length > i ? res.TERCERA[i].total : 0;
            var cuarta = res.CUARTA.length > i ? res.CUARTA[i].total : 0;
            var quinta = res.QUINTA.length > i ? res.QUINTA[i].total : 0;
            var segunda = res.SEGUNDA.length > i ? res.SEGUNDA[i].total : 0;
             arrayproduccion.push({
             y: res.PRIMERA[i].fecha, a:extra ,b : res.PRIMERA[i].total ,c:segunda ,d:tercera ,e:cuarta ,f:quinta

         });
        }
     
        var line1 = new Morris.Line({
            data: arrayproduccion,
            xkey: 'y',
            ykeys: ['a', 'b', 'c','d','e','f'],
            labels: ['EXTRA','PRIMERA','SEGUNDA','TERCERA','CUARTA','QUINTA'],
            fillOpacity: 0.6,
            element: 'line-chart-caja',
            hideHover: 'auto',
            behaveLikeLine: true,
            resize: true,
            pointFillColors: ["#ffffff"],
            pointStrokeColors: ['black'],
            lineColors:['gray','green','red','blue','white','yellow'],
            lineWidth: 2
        });
            
    });
}
var pieChart = "";
   var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [   ],
                    backgroundColor: [
                        'Green',
                         'Red',
                        'Blue',
                        'White',
                        'Orange',
                        'Gray'
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    'PRIMERA',
                    'SEGUNDA',
                    'TERCERA',
                    'CUARTA',
                    'QUINTA',
                    'EXTRA',
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'TORTA DE TIPOS DE HUEVO'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };
function tortaTiposDehuevo( res )
{          
    var primera = res.TOTALPRIMERA.length != 0 ? res.TOTALPRIMERA[0].total : 0;
    var segunda = res.TOTALSEGUNDA.length != 0 ? res.TOTALSEGUNDA[0].total : 0;
    var tercera = res.TOTALTERCERA.length != 0 ? res.TOTALTERCERA[0].total : 0;
    var cuarta = res.TOTALCUARTA.length != 0 ? res.TOTALCUARTA[0].total : 0;
    var quinta = res.TOTALQUINTA.length != 0 ? res.TOTALQUINTA[0].total : 0;
    var extra = res.TOTALEXTRA.length != 0 ? res.TOTALEXTRA[0].total : 0;
    // Get context with jQuery - using jQuery's .get() method.

  // var pieChart = new Chart(pieChartCanvas);
  //   pieChart.destroy();
    // config.data.datasets.splice(0, 1);
            // window.myDoughnut.update();
    config.data.datasets.splice(0, 1);
            pieChart.update();
  var newDataset = {
                    data: [
                        primera,
                        segunda,
                        tercera,
                        cuarta,
                        quinta,
                        extra,
                    ],
                    backgroundColor: [
                        'Green',
                         'Red',
                        'Blue',
                        'White',
                        'Orange',
                        'Gray'
                    ],
                    label: 'Dataset 1'
                };
            config.data.datasets.push(newDataset);

pieChart.update();

}