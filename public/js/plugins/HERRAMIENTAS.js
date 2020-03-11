// var imagenCargando="../Imagen/cargando.gif";
(function ( window ) {
    $.fn.extend({
        visible: function (tipo) {
            if(tipo===1){
                $(this).css("display","block");
                $(this).focus();
            }else{
                $(this).css("display","inline-block");
            }
        },
        igualartabla: function (){
            var tabla=$(this);
            tabla.find("tbody tr").click(function(){
                tabla.find("tbody tr").css("background-color","white");
                $(this).css("background-color","#17B566");
            });
            $(this).find("tbody").css("width",$(this).find("thead").width()+20);
        },
        ocultar: function () {
            $(this).css("display","none");
        },
        dragable:function(drag,drog,evento){
            $(drag).draggable({
                revert: "invalid",
                refreshPositions: true,
                containment: 'parent',
                drag: function (event, ui) {
                    $(this).css({
                        cursor:"move",
                        opacity:"0.3",
                        transform: "scale(0.8,0.8)",
                    });
                },
                stop: function (event, ui) {
                    $(this).css({
                        cursor:"pointer",
                        opacity:"1",
                        transform: "scale(1,1)"
                    });
                }
            });
            $(drog).droppable({
                drop: evento
            });
        },
        limpiarFormulario: function () {
            $(this).find("input").val("");
            $(this).find(".error").text("");
            $(this).find(".correcto").text("");
            $(this).find("input").css("background","white");
            $(this).find("input[type=number]").val(0);
            $(this).find("select option:eq(0)").attr("selected",true);
            $(this).find(".fecha").val(fechaActual());
        },

        centrar: function () {
            $(this).css({
                position: 'fixed',
                left: ($(window).width() - $(this).outerWidth()) / 2,
                top: (($(window).height() - $(this).outerHeight()) / 2)-35
            });
            $(window).resize(function () {
                $(this).css({
                    position: 'fixed',
                    left: ($(window).width() - $(this).outerWidth()) / 2,
                    top: (($(window).height() - $(this).outerHeight()) / 2)-35
                });
            });
        },
        msmOK:function(options){
            var result="<div class='background' id='backgroundAux'></div><div class='popup' id='msmOK'>"+
                            "<span class='negrillaenter centrar'>ALERTA</span>"+
                            "<div>"+options+"</div>"+
                            "<div class='centrar'>"+
                                 "<button onclick='ok()' class='normal'>OK</button>"+
                            "</div>"+
                        "</div>"
            $(this).append(result);
            $("#msmOK").visible(1);
            $("#msmOK").centrar();
            $("#msmOK button").focus();
            $(".background").visible(1);
        },
        msmPregunta:function(pregunta,funcion){
            var result="<div class='background' id='backgroundAux'></div><div class='popup' id='msmOK'>"+
                            "<span class='negrillaenter centrar'>ALERTA</span>"+
                            "<div>"+pregunta+"</div>"+
                            "<div class='centrar'>"+
                                 "<button onclick='"+funcion+"()' class='normal'>SI</button>"+
                                 "<button onclick='ok()' class='normal'>NO</button>"+
                            "</div>"+
                        "</div>"
            $(this).append(result);
            $("#msmOK").visible(1);
            $("#msmOK").centrar();
            $("#msmOK button").focus();
            $(".background").visible(1);
        }
        ,
        by:function(options){
            var result="<div class='background' id='backgroundAux'></div>"+
                        "<div id='by'>"+
                            "<div class='centrar negrilla'>SISTEMA DE LABORATORIOS UNIDOS \"LABUN\"</div>"+
                            "<div  style='margin-right: 19px; width: 100px; padding-top: 13px; float: left;'>"+
                                "<img src='IMAGENES/logo.png' alt=''/>"+
                            "</div>"+
                            "<div style='width: 250px; float: left;'>"+
                                "<span class='negrillaenter'>Hecho Por:</span>"+
                                 "Ing. Williams Armando Montenegro Mansilla"+
                                "<span class='negrillaenter'>Telefono: </span>"+
                                 "3251551 - 75685675"+
                                 "<span class='negrillaenter'>Correo: </span>"+
                                  "WdigitalSolution02@gmail.com"+
                            "</div>"+
                            "<span class='negrilla point' style='position: absolute; top: 4px; right: 6px;' onclick='cerrarBy()'>(x)</span>"
                        "</div>";
            $(this).append(result);
            $("#by").visible(1);
            $("#by").centrar();
            $(".background").visible(1);
        }
        ,
        // validar: function () {
        //     this.each(function () {
        //         var $this = $(this);
        //         var typ = $this.attr("type");
        //         switch (typ) {
        //             case "text":
        //                 $this.focus(function () {
        //                     $this.keyup(function () {
        //                         var min=parseInt($this.data("min"));
        //                         var max=parseInt($this.data("max"));
        //                         var valor = $this.val().length;
        //                         if (valor>=min && valor<=max) {
        //                             $this.css({"background-color": "#00ff00"});
        //                             $this.next().text("");
        //                         } else {
        //                             $this.next().text($this.next().data("acro")+" debe tener como minimo "+min+" caracteres y maximo "+max);
        //                             $this.css({"background-color": "#e44e2d"});
        //                         }
        //                     });
        //                 });
        //                 break;
        //             case "number":
        //                 $this.focus(function () {
        //                     $this.keyup(function () {
        //                         var min=parseInt($this.data("min"));
        //                         var max=parseInt($this.data("max"));
        //                         var valor = $this.val().length;
        //                         if (valor>=min && valor<=max) {
        //                             $this.css({"background-color": "#00ff00"});
        //                             $this.next().text("");
        //                         } else {
        //                             $this.next().text($this.next().data("acro")+" debe tener como minimo "+min+" caracteres y maximo "+max);
        //                             $this.css({"background-color": "#e44e2d"});
        //                         }

        //                     });
        //                 });
        //                 break;
        //             case "email":
        //                 $this.focus(function () {
        //                     $this.keyup(function () {
        //                         var expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        //                         var valor = $this.val();
        //                         if (!expresion.test(valor)) {
        //                             $this.css({"background-color": "#e44e2d"});
        //                             $this.next().text($this.next().data("acro")+" electronico invalido");
        //                         } else {
        //                             $this.css({"background-color": "#00ff00"});
        //                             $this.next().text("");
        //                         }
        //                     });
        //                 });
        //                 break;
        //             case "password":
        //                 $this.focus(function () {
        //                     $this.keyup(function () {
        //                         var min=parseInt($this.data("min"));
        //                         var max=parseInt($this.data("max"));
        //                         var valor = $this.val().length;
        //                         if (valor>=min && valor<=max) {
        //                             $this.css({"background-color": "#00ff00"});
        //                             $this.next().text("");
        //                         } else {
        //                             $this.next().text($this.next().data("acro")+" debe tener como minimo "+min+" caracteres y maximo "+max);
        //                             $this.css({"background-color": "#e44e2d"});
        //                         }
        //                     });
        //                 });
        //                 break;
        //         }
        //     });
        // },
        validarActualizar: function () {
            this.each(function () {
                var $this = $(this);
                var typ = $this.attr("type");

                switch (typ) {
                    case "text":
                        var min=parseInt($this.data("min"));
                        var max=parseInt($this.data("max"));
                        var valor = $this.val().length;
                        if (valor>=min && valor<=max) {
                            $this.css({"background-color": "#00ff00"});
                            $this.next().text("");
                        } else {
                            $this.next().text($this.next().data("acro")+" debe tener como minimo "+min+" caracteres y maximo "+max);
                            $this.css({"background-color": "#e44e2d"});
                        }
                        break;
                    case "number":
                        var min=parseInt($this.data("min"));
                        var max=parseInt($this.data("max"));
                        var valor = $this.val().length;
                        if(isNaN($this.val())){
                            $this.next().text($this.next().data("acro")+" debe ser de tipo numerico");
                            $this.css({"background-color": "#e44e2d"});
                            return;
                        }
                        if (valor>=min && valor<=max) {
                            $this.css({"background-color": "#00ff00"});
                            $this.next().text("");
                        } else {
                            $this.next().text($this.next().data("acro")+" debe tener como minimo "+min+" caracteres y maximo "+max);
                            $this.css({"background-color": "#e44e2d"});
                        }
                        break;
                    case "email":
                        var expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
                        var valor = $this.val();
                        if (!expresion.test(valor)) {
                            $this.css({"background-color": "#e44e2d"});
                            $this.next().text($this.next().data("acro")+" electronico es invalido");
                        } else {
                            $this.css({"background-color": "#00ff00"});
                            $this.next().text("");
                        }
                        break;
                    case "password":
                        var min=parseInt($this.data("min"));
                        var max=parseInt($this.data("max"));
                        var valor = $this.val().length;
                        if (valor>=min && valor<=max) {
                            $this.css({"background-color": "#00ff00"});
                            $this.next().text("");
                        } else {
                            $this.next().text($this.next().data("acro")+" debe tener como minimo "+min+" caracteres y maximo "+max);
                            $this.css({"background-color": "#e44e2d"});
                        }
                        break;
                }
            });
        }
    });
})(jQuery);

// $(document).ready(function(){
//    $.datepicker.regional['es'] = {
//         closeText: 'Cerrar',
//         currentText: 'Hoy',
//         monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
//         'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
//         monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
//         'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
//         dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
//         dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié;', 'Juv', 'Vie', 'Sáb'],
//         dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
//         dateFormat: 'dd/mm/yy',
//         firstDay: 1,
//     };
//     $.datepicker.setDefaults($.datepicker.regional["es"]);
// });
function validar(tipo,texto){
        // texto=texto.trim();
    switch (tipo){
        case "texto":
            var expresion=/^[a-zA-Z\ñ\Ñ\.\,\s-_º()=?¿/%$@!:;{}óíáéúñÍÁÉÚÓ]+$/;
            if(!expresion.exec(texto+" ")){
                return true;

            }
            break;
        case "correo":
            var expresion=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!expresion.test(texto))
                return true;
            break;
        case "entero":
            var expresion=/^[0-9\s]+$/;
            if(!expresion.exec(texto)){
                return true;

            }
            break;
        case "decimal":
            // var expresion=/^\d+(\.\d{1,2})?/;
            var expresion=/^[0-9\s\.\,]+$/;
            if(!expresion.exec(texto)){
                return true;
            }

            break;
        case "texto y entero":
            // var expresion=/^[0-9a-zA-Z\s]+$/;
            var expresion=/^[0-9a-zA-Z\.\,\s-_º()=?¿/%$@!:;{}óíáéúñÍÁÉÚÓ]+$/;//valida con caracteres especiales
            if(!expresion.exec(texto+" ")){
                return true;

            }
            break;
    }
    return false;
}
function ok(){
    $("#backgroundAux").remove();
    $(".background").ocultar();
    $("#msmOK").remove();
}
function cerrarBy(){
    $("#backgroundAux").remove();
    $(".background").ocultar();
    $("#by").remove();
}
function horaActualSistemaOp(){
    var f = new Date();
    var hora=f.getHours();
    var min=f.getMinutes();
    var seg=f.getSeconds();
    hora=hora<10?"0"+hora:hora;
    min=min<10?"0"+min:min;
    seg=seg<10?"0"+seg:seg;
    return hora+":"+min;
}
function fechaActual(){

    var f = new Date();
    var dia=f.getDate();
    var mes=f.getMonth()+1;
    var ano=f.getFullYear();
    dia=dia<10?"0"+dia:dia;
    mes=mes<10?"0"+mes:mes;
    return dia+"/"+mes+"/"+ano;
}
function fechaActualReporte(){
    var f = new Date();
    var dia=f.getDate();
    var mes=f.getMonth()+1;
    var ano=f.getFullYear();
    dia=dia<10?"0"+dia:dia;
    mes=mes<10?"0"+mes:mes;
    return dia+"_"+mes+"_"+ano;
}
var imagenAModificar;
function cargarImagen(input, tipo) {
    if (tipo === 1 || tipo === "1") {
        imagenAModificar = $(input);
        // $("body").append("<input type='file' onchange='cargarImagen(this,2)' id='fotocargar' style='display: none;'/><canvas id='canvas' style='display: none;'></canvas>");
         $('#fotocargar').click();
        return;
    }
    if (input.files && input.files[0]) {
        // cargando(true);
        var reader = new FileReader();
        reader.onload = function (e) {
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.onload = function () {
                canvas.width = 300;
                canvas.height = 250;
                ctx.drawImage(img, 0, 0, 300, 250);
                imagenAModificar.attr("src", canvas.toDataURL(input.files[0].type));
                // cargando(false);
                // $("#fotocargar").remove();
                // $("#canvas").remove();
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function cargarImagen2(input, tipo) {
    if (tipo === 1 || tipo === "1") {
        imagenAModificar = $(input);
        // $("body").append("<input type='file' onchange='cargarImagen(this,2)' id='fotocargar' style='display: none;'/><canvas id='canvas' style='display: none;'></canvas>");
         $('#fotocargar2').click();
        return;
    }
    if (input.files && input.files[0]) {
        // cargando(true);
        var reader = new FileReader();
        reader.onload = function (e) {
            var canvas = document.getElementById("canvas2");
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.onload = function () {
                canvas.width = 300;
                canvas.height = 250;
                ctx.drawImage(img, 0, 0, 300, 250);
                imagenAModificar.attr("src", canvas.toDataURL(input.files[0].type));
                // cargando(false);
                // $("#fotocargar").remove();
                // $("#canvas").remove();
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function tuplaSeleccionada(tabla){
    var seleccionado = "";
    var lista = $("#"+tabla+" tbody tr");
    for (var i = 0; i < lista.length; i++) {
        if ($(lista[i]).css("background-color") === "rgb(23, 181, 102)") {
            $("#"+tabla+" tbody tr").css("background", "none");
            seleccionado = $(lista[i]);
            break;
        }
    }
    return seleccionado;
}
/*importa
 *
 * <script src="Script/Plugin/tableExport.min.js" type="text/javascript"></script>
   <script src="Script/Plugin/tableExport.min.js" type="text/javascript"></script>
 */
function exportarExcel(tabla,titulo) {
    // cargando(true);
    var lista = $("#"+tabla).find("tr");
    var elemento="<table id='tablaExcel'><thead>";
    for (var i = 0; i < lista.length; i++) {
        var tr=$(lista[i]).find("th");
        elemento+="<tr>";
        for (var j = 0; j < tr.length; j++) {

            var ele=$(tr[j]).children();

            var texto="";
            if(ele.is('input')){
                texto=ele.val();
            }
            if(ele.is('select')){
                texto=ele.find("option:selected").text();
            }
            if(texto===""){
                texto=$(tr[j]).text();
            }
            if(i===0){
               elemento+="<th>"+texto+"</th>";
            }else{
                elemento+="<td>"+texto+"</td>";
            }
        }
        elemento+="</tr>";
        if(i===0){
            elemento+="</thead><tboddy>";
        }
    }
    elemento+="</tboddy></table>";
    $("body").append(elemento);
    // cargando(false);
    $('#tablaExcel').tableExport({type:'xls',fileName: titulo});
    $("#tablaExcel").remove();
}
function cargando()
{
    $('#loading').css('display','block');
}
function cambiarFormulario(li){

    elemento=$(li);

    url=elemento.attr('url');

    iframe=$('#iframe');

    if (elemento.attr('class')==="active") {

    }else{
        //elemento.addClass('active');
          $('.active').removeClass();
        elemento.parent().attr('class','active');


         iframe.attr('src',url);
    }

}
function limpia(elemento){
    if (elemento.value==0)
    elemento.value="";
}

function verificar(elemento){
    if (elemento.value=="")
    elemento.value="0";
}

function  failErrors(  xhr, ajaxOptions, thrownError )
{
    var  error="";
    var status = xhr.status ;
    switch ( status )
    {
        case 0 :
            error="<span style='font-weight:bold'>* Error de conexión, verifica tu instalación de RED.</span><br>";
        break;
        case 302 :
            error="<span style='font-weight:bold'>* La página ha sido movida. error 302.</span><br>";
        break;
        case 404 :
            error="<span style='font-weight:bold'>* La página no ha sido encontrada. error 404.</span><br>";
        break;
        case 500 :
            error="<span style='font-weight:bold'>* Internal Server Error error 500.</span><br>";
        break;
    }
    switch ( thrownError )
    {
        case 'parsererror' :
            error="<span style='font-weight:bold'>* Error parse JSON.</span><br>";
        break;
        case 'timeout' :
            error="<span style='font-weight:bold'>* Exceso tiempo.</span><br>";
        break;
        case 'abort' :
            error="<span style='font-weight:bold'>* Petición post abortada.</span><br>";
        break;
        default :
            error ="<span style='font-weight:bold'>* ERROR desconocido:  "+ xhr.responseJSON.message+".</span><br>";
            error +="<span style='font-weight:bold'>* Linea:  "+ xhr.responseJSON.line+".</span><br>";
        break;
    }
    if (error!="") {
        alertify.alert('<span style="font-weight: bold;    color: red;">ERROR</span>', error, function () {
            alertify.message('OK');
        });
    }
cerrarCargando();
}
var typeSend = '';
var concatUrl = '';
function cerrarCargando()
{
    $('#loading').css('display','none');
}
function MessageAlerfify( status, message )
{
    switch (status)
    {
        case 'error':
            alertify.alert('<span style="font-weight: bold;    color: red;">ERROR</span>', message, function () {
                alertify.message('OK');
            });
        break;
        case 'warning':
        alertify.alert('<span style="font-weight: bold;    color: #e84f12;">ADVERTENCIA</span>', message, function () {
                alertify.message('OK');

            });
        break;
        case 'success':
         alertify.notify(message, 'success', 5, function(){  console.log('dismissed'); });
        break;
    }
    cerrarCargando();
}

function getDataByIdInputs( id )
{
    cargando();
    $.ajax({
        url : url+'/'+id+'/edit',
        type : 'GET',
        success : function( response )
        {
            if ( response.status )
            {
            $( FIELD_FORM.id_edit ).val( response.data[0]['id']  );
            for (var key in response.data[0])
            {
                $( FIELD_FORM[key] ).val( response.data[0][key] );
                concatUrl = '/'+response.data[0]['id'];
            }
            }else
            {
               MessageAlerfify('warning', response.message );
               $('input[id]').val("");
            }
        cerrarCargando();
        },
         error: function( xhr, ajaxOptions, thrownError )
        {
           failErrors( xhr, ajaxOptions, thrownError );
        }
    });
}
function closeModal()
{
    $('#myModal').modal('hide');
}
function cleanForm()
{
    $('#form-data')[0].reset();
    // $('texttarea[name]').val('');
}

function deleted(id)
{
    cargando();
    $.ajax({
        url: url+'/'+id,
        type: 'DELETE',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success : function(response)
        {
            if ( response.status )
            {
                 cerrarCargando();
                 MessageAlerfify( 'success' , response.message );
                 if ( !$( 'table' ).find( '#tbody' ).length ) 
                 {
                   tableReload();
                   return;
                 }
               getAll();
            }
            else
            {

               MessageAlerfify('warning', response.message );
            }
        },
        error: function( xhr, ajaxOptions, thrownError )
        {
           failErrors( xhr, ajaxOptions, thrownError );
        }
    });
}
function openModal( type )
{
    cleanForm();
    $('#myModal').modal('show');
    if(  type == 'save' )
    {
        $('#form-user').length ? $('#form-user').css('display','block') : '';
        typeSend = 'POST';
        concatUrl = '';
        $('#modal-title').text('Crear ' + title);
        return;
    }
   $('#form-user').length ? $('#form-user').css('display','none'): '';
    typeSend = 'PUT';
    $('#modal-title').text('Modificar ' + title);
}
function save()
{
    cargando();
    var formData = $('#form-data').serializeArray();
    if (  $('#form-data').parsley().validate() )
    {

        $.ajax({
            url : url+concatUrl,
             headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
             },
            type : typeSend,
            data : formData,
            success : function( response )
            {
               if ( response.status )
                {
                   MessageAlerfify('success', response.message );
                    getAll();
                    closeModal();
                }
                else
                {
                   MessageAlerfify('warning', response.message );
                }
                cerrarCargando();
            },
             error: function( xhr, ajaxOptions, thrownError )
            {
               failErrors( xhr, ajaxOptions, thrownError );
            }

        });
    }
    cerrarCargando();
}
function initDataTable()
{
dataTableDetail = $('#dataTable').DataTable(
// {
//         "pagingType": "full_numbers",
//         "destroy": true,
//         "order": [[0, "asc"]],
//         "scrollY": "418px",
//         "scrollCollapse": true,
//         "paging": false,
//         retrieve: true
//     }
    );
}
var orderDataTable =  [[0, "desc"]];
function initDataTableDinamic( urlDataTable )
{
    table = $( '#dataTable' ).DataTable( {
               "processing" : false ,
                "serverSide" : true ,
                "searchDelay" : 500 ,
                "responsive" : true ,
                "order": orderDataTable,
                "ajax" : {
                    url : urlDataTable,
                    type : 'GET',
                },
                "columns":columnDataTable,
                "drawCallback" : function ()
                {
                    // gn_helper.unlockPage();
                    // $( '.dataTables_filter input' ).addClass( 'form-control' ).attr( 'placeholder', 'Buscar' );
                    // $( '<div class="dataTables"></div>_length select' ).addClass( 'form-control' );
                },
                "initComplete" : function ()
                {
                    // $( "#datatable" ).addClass( 'bd-collapse' );
                    // $( "#datatable_info" ).css( 'white-space', 'inherit' );
                }
                // ,
                // "language" : {
                //  "url" : baseUrl( "app/modules/sec/assets/js/jquery.datatables/media/language/spanish.json" )
                // }

            }
        );
}


function getShiftAvailable( element,  type )
{
   var elementHoraIni = $(element).parents( "tr" ).find( 'select[type_select=horario]' );
   var elementSelectInstructor = $(element).parents( "tr" ).find( 'select[type_select=instructor]' );
   var instructorActual = elementSelectInstructor.val();
   switch(type)
   {
        case 0 :
            date = $(element).parents( "tr" ).find( 'input[type=date]').val();
            auto_id = $( element ).val();
        break;
        case 1 :
            auto_id = $(element).parents( "tr" ).find( 'select[type_select=vehiculo]' ).val();
            date = $( element ).val();
        break;
        case 2 :
            date = $(element).parents( "tr" ).find( 'input[type=date]').val();
            auto_id = $(element).parents( "tr" ).find( 'select[type_select=vehiculo]' ).val();
        break;

   }
  var cant_horas = $('#cant_horas').val();
  var data = {
    date : date, 
    hora_ini : elementHoraIni.val(),
    auto_id : auto_id ,
    cant_horas : cant_horas
  };
  cargando();
  $.ajax({
    url : concatUrl + 'getShiftAvailable',
    type : 'GET',
    data : data,
    success : function( res )
    {
      if ( res.status ) 
      {
        if ( res.data != "" ) 
        {
            if ( type == "2" ) 
            {
              var htmlSelectInstructor =  res.htmlSelectInstructor;
              elementSelectInstructor.empty();
              elementSelectInstructor.append( htmlSelectInstructor );
              elementSelectInstructor.val(instructorActual);
              if ( !elementSelectInstructor.val() ) 
              {
                MessageAlerfify('warning', 'El instructor seleccionado no esta disponible');
              }
            }else
            {
               elementHoraIni.empty();
              elementHoraIni.append( res.data );  
              
            }
        }  
      }
      cerrarCargando();
    },
    error: function( xhr, ajaxOptions, thrownError )
    {
       failErrors( xhr, ajaxOptions, thrownError );
    },
    complete: function()
    {
      cerrarCargando();
    }
  })
}
function tableReload()
{
    if ( $( '#dataTable' ).DataTable() ) 
    {
        var table = $( '#dataTable' ).DataTable();
        table.ajax.reload( null, false );
    }
}
function successAjax( response )
{
        if ( response.status )
        {
           MessageAlerfify('success', response.message );
            getAll();
            closeModal();
        }
        else
        {
           MessageAlerfify('warning', response.message );
        }
        cerrarCargando();
}