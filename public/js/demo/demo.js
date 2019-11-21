
 $(document).ready(function(){

 });




 function ReporteVentaTotal(){
   var total = 0;
  var etiquetas = [];
  var ret = [];
$('#line-chart2').empty();

  porcentaje=0;
  fechainicio=$('#fechainicio').val();
  fechafin=$('#fechafin').val();
  idTipo=$('#idtipoCaja').val();
  $.get('ReporteVentaTotal/'+fechainicio+'/'+fechafin+'/'+idTipo,function(res){

// for (var i = 0; i < res.length; i++) {
//   total=total +parseInt(res[i].precio);
// }
   $(res).each(function(key,value){
      // porcentaje=(value.precio/total*100).toFixed(2);

         ret.push({
       y: value.fecha, item1:value.precio,item2:value.precio
  
     });
    });
 var linea =  new Morris.Line({
    element: 'line-chart2',
    resize: true,
    data: ret,
    xkey: 'y',
    ykeys: ['item1'],
    labels: ['Importe'],
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


 function ReporteProduccion(){
   var valores = [];
  var etiquetas = [];
  var ret2 = [];
$('#line-chart').empty();

  fechainicio=$('#fecha_inicio').val();
  fechafin=$('#fecha_fin').val();
  id_edad=$('#id_edad').val();

  $.get('ReporteProduccionGrafico2/'+fechainicio+'/'+fechafin+'/'+id_edad,function(res){

    $(res).each(function(key,value){
         ret2.push({
       y: value.fechacompleta, item1:value.porcentaje,item2:value.precio
  
     });
    });

  var line = new Morris.Line({
    element: 'line-chart',
    resize: true,
    data: ret2,
    xkey: 'y',
    ykeys: ['item1'],
    labels: ['Porcentaje'],
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
var data = [
      { y: '2014', a: 50, b: 90, c: 50,e:70},
      { y: '2015', a: 65,  b: 75, c: 50,e:70},
      { y: '2016', a: 50,  b: 50, c: 50,e:70},
      { y: '2017', a: 75,  b: 60, c: 50,e:70},
      { y: '2018', a: 80,  b: 65, c: 50,e:70},
      { y: '2019', a: 90,  b: 70, c: 50,e:70},
      { y: '2020', a: 100, b: 75, c: 50,e:70},
      { y: '2021', a: 115, b: 75, c: 50,e:70},
      { y: '2022', a: 120, b: 85, c: 50,e:70},
      { y: '2023', a: 145, b: 85, c: 50,e:70},
      { y: '2024', a: 160, b: 95, c: 50,e:70}
    ],
    config = {
      data: data,
      xkey: 'y',
      ykeys: ['a', 'b', 'c','e'],
      labels: ['EXTRA', 'PRIMERA', 'SEGUNDA','TERCERA','CUARTA','QUINTA'],
      fillOpacity: 0.6,
      hideHover: 'auto',
      behaveLikeLine: true,
      resize: true,
      pointFillColors:['#ffffff'],
      pointStrokeColors: ['black'],
      lineColors:['gray','green','red','blue','white','yellow']
  };
 config.element = 'line-chart3';
Morris.Line(config);
type = ['','info','success','warning','danger'];
      


dataSales= "";



  tito={ 
    initChartist: function(){ 
    var id_edad=$('#id_edad').val();

       $.get('Rgrafico_postura/'+id_edad,function(res){


 // var dataSales = {
 //          labels: ['ENERO', 'FEBRERO', 'MARZO', '4', '5', '6', '7', '8','9','10','11','12'],
 //          series: [
 //             [40, 20, 40, 42, 54, 86, 98, 95, 52, 88, 46, 44, 44, 44, 44, 44, 44, 44, 44],
           
 //          ]
 //        };
      
       
        
   
  








  //Donut Chart
 

  //Fix for charts under tabs
  

});

    
        // var data = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
        //     [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        //   ]
        // };
        
        // var options = {
        //     seriesBarDistance: 10,
        //     axisX: {
        //         showGrid: false
        //     },
        //     height: "245px"
        // };
        
        // var responsiveOptions = [
        //   ['screen and (max-width: 640px)', {
        //     seriesBarDistance: 5,
        //     axisX: {
        //       labelInterpolationFnc: function (value) {
        //         return value[0];
        //       }
        //     }
        //   }]
        // ];
        
        // Chartist.Bar('#chartActivity', data, options, responsiveOptions);
    
      
    },
    





}





// var nReloads = 0;
// function data(offset) {
//   var ret = [];
//   for (var x = 0; x <= 360; x += 10) {
//     var v = (offset + x) % 360;
//     ret.push({
//       x: x,
//       y: Math.sin(Math.PI * v / 180).toFixed(4),
//       z: Math.cos(Math.PI * v / 180).toFixed(4)
//     });
//   }
//   return ret;
// }
// var graph = Morris.Line({
//     element: 'graph',
//     data: data(0),
//     xkey: 'x',
//     ykeys: ['y', 'z'],
//     labels: ['sin()', 'cos()'],
//     parseTime: false,
//     ymin: -1.0,
//     ymax: 1.0,
//     hideHover: true
// });
// function update() {
//   nReloads++;
//   graph.setData(data(5 * nReloads));
//   $('#reloadStatus').text(nReloads + ' reloads');
// }
// setInterval(update, 100);


function ejecutarmorris(){
// var graph = Morris.Line({
//     element: 'graph',
//     data: data(0),
//     xkey: 'x',
//     ykeys: ['y', 'z'],
//     labels: ['sin()', 'cos()'],
//     parseTime: false,
//     ymin: -1.0,
//     ymax: 1.0,
//     hideHover: true
// });
 // var linea =  Morris.Line({
 //    element: 'line-chart2',
 //    resize: true,
 //    data: ReporteVentaTotal(),
 //    xkey: 'y',
 //    ykeys: ['item1'],
 //    labels: ['Porcentaje'],
 //    lineColors: ['#efefef'],
 //    lineWidth: 2,
 //    hideHover: 'auto',
 //    gridTextColor: "#fff",
 //    gridStrokeWidth: 0.4,
 //    pointSize: 4,
 //    pointStrokeColors: ["#efefef"],
 //    gridLineColor: "#efefef",
 //    gridTextFamily: "Open Sans",
 //    gridTextSize: 10
 //  });
 }
// function update() {
 
//   linea.setData(ReporteVentaTotal());

// }