const fs   = require("fs"),
      path = require("path");


      module.exports = {
        getData: ()=> {
          let dataruta = __dirname + path.join ("/data/data.json");
          return new Promise ((req, res)=> {
            fs.readFile(dataruta, 'utf8', (err, readData) => {
                  if (err) res(err)
                  req(JSON.parse(readData));
              }
          )}
          )}
      };
