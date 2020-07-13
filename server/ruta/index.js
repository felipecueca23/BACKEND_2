const filtro = require ("../filtro");


const ruta = (app) => {
    app.get("/search",(req, res)=> {
      filtro.getData().then((data) => {
          res.json({"error":false, "datos": data});
      }).catch((error)=>{
          res.json({"error":true, "datos": err});
          console.log("/search");
      })
    })

    app.get("/filtro", (req, res) => {
      filtro.getData().then((datos) => {
        let ciudades = [];
        let tipos     = [];
        datos.forEach((item, i) => {
          if (ciudades.indexOf(item.Ciudad)<0){
              ciudades.push(item.Ciudad);
          }
          if (tipos.indexOf(item.Tipo)<0){
              tipos.push(item.Tipo);
          }

        });
        res.json({"error":false, "ciudades":ciudades, "tipos":tipos})

      }).catch((err)=>{
        res.jon({"error":true, "err":err})
      })
    })

    app.get('/ciudad/:ciudadId/tipo/:tipoId/desde/:desdeVal/hasta/:hastaVal', (req, res)=>{
      let parametros = req.params;
      let data       = [];
      filtro.getData().then((datos)=>{
        var tmp = [];
        var tmp2 = [];
        var data = [];

        tmp = datos.slice();

        if(parametros.ciudadId!="todas"){
          tmp.forEach((item, i) => {
            if(item.Ciudad==parametros.ciudadId){
              tmp2.push(item);
            }
          });

        }else{
          tmp2 =tmp.slice();
        }

        tmp = [];
        tmp = tmp2.slice();
        tmp2 = [];

        if(parametros.tipoId!="todos"){
          tmp.forEach((item, i) => {
            if(item.Tipo==parametros.tipoId){
              tmp2.push(item);
            }
          });

        }else{
          tmp2 =tmp.slice();
        }

        tmp2.forEach((item, i) => {
          let valor = parseInt(item.Precio.replace("$", "").replace(",", ""));
          if (valor >= parseInt(parametros.desdeVal) && valor <= parseInt(parametros.hastaVal)) {
                    data.push(item);
          }
        });
        res.json({data, parametros})
      }).catch((err)=>{
        res.json({ "error": true, "err": err });
      })
    })
}
module.exports = ruta;
