 function numerosmasdecimal(e){
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46))
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}

function limpia(elemento){
    if (elemento.value==0)
    elemento.value="";                    
}

function verificar(elemento){
    if (elemento.value=="")
    elemento.value="0";                    
}

function bloqueo_de_punto(e){
    var keynum = window.event ? window.event.keyCode : e.which;
    if (keynum == 8)
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}


function actualizar_pag(){
    location.reload();
}

$(function () {
  $('#datetimepicker10').datetimepicker({
      viewMode: 'days',
      format: 'YYYY/MM/DD'
  });
});
      
function limpiar(){
    $('input').val("");     
    $('textarea').val("");  
}

function ucultar_boton(){
  $('#btn_guardar').hide();
  $('#btn_eliminar').hide();  
}


function baseUrl( url )
{
  var getUrl = window.location+"/"+url;
  return getUrl;
}





///////////BLOQUER CLICK IZQUIERDO////////////////////////
// function clickIE4(){
// if (event.button==2){
// alert(message);
// return false;
// }
// }

// function clickNS4(e){
// if (document.layers||document.getElementById&&!document.all){
// if (e.which==2||e.which==3){
// alert(message);
// return false;
// }
// }
// }

// if (document.layers){
// document.captureEvents(Event.MOUSEDOWN);
// //document.onmousedown=clickNS4;
// }
// else if (document.all&&!document.getElementById){
// //document.onmousedown=clickIE4;
// }

// document.oncontextmenu=new Function("return false" ) 