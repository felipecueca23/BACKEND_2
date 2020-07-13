const bodyParser = require("body-parser"),
      http       = require("http"),
      express    = require("express"),
      ruta       = require("./ruta");

const port       = process.env.PORT || 8002,
      app        = express(),
      server     = http.createServer(app);

ruta(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

server.listen(port, () => {
  console.log("habilitado por el puerto:" + port);
})
