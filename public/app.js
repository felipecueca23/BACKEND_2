$(document).ready(function() {
//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 0,
  to: 20000,
  prefix: "$"
})

init();
setSearch();


function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}



function init (){
  $.ajax({
    url:'http://localhost:8002/filtro',
    type: 'get',
    datatype:'json'
  }).done(function (datos){
    if(!datos.error){
      console.log(datos);
      $('#ciudad').append(render(datos.ciudades));
      $('#tipo').append(render(datos.tipos));
      $('#ciudad').material_select();
      $('#tipo').material_select();

    }
  })
}

function render(datos){
  var html="";
  datos.forEach((item, i) => {
    html +="<option value='"+item+"'>"+item+"</option>";
  });
  return html;
}




})

$("#buscar").click(function(){
  if ($("#checkPersonalizada")[0].checked){
    var valor = $("#rangoPrecio").val().split(";");
    var url   = 'http://localhost:8002/ciudad/'+$("#ciudad").val()+'/tipo/'+$("#tipo").val()+'/desde/'+valor[0]+'/hasta/'+valor[1];
  }else {
    var url   = 'http://localhost:8002/search';
  }
 $.ajax({
   url: url,
   type: 'get',
   datatype: 'json'
 }).done(function(datos){
   if(!datos.error){
     if ($("#checkPersonalizada")[0].checked){
       $(".lista").html(renderLista(datos.data));
     }else{
       $(".lista").html(renderLista(datos.datos));
     }
   }
 })

})

function renderLista(datos){
  var html ="";


  datos.forEach( (item, i)=> {
    html += "<div class='card horizontal'>"+
                       "<div class='card-image'>"+
                        "<img src='http://localhost:8002/img/home.jpg'>"+
                        "</div>"+
                    "<div class='card-stacked'>"+
                        "<div class='card-content'>"+
                            "<div> <p><strong>Direccion: </strong>" + item.Direccion + "</p> </div>"+
                            "<div> <p><strong>Ciudad: </strong>"+ item.Ciudad+"</p> </div>"+
                            "<div> <p><strong>Telefono: </strong>"+item.Telefono+"</p> </div>"+
                            "<div> <p><strong>Código postal: </strong>"+item.Codigo_Postal+"</p> </div>"+
                            "<div> <p><strong>Precio: </strong>"+item.Precio +"</p> </div>"+
                            "<div> <p><strong>Tipo: </strong>"+item.Tipo+"</p> </div>"+
                        "</div>"+
                    "</div>"+
                "</div>";
  });

return html;
}
