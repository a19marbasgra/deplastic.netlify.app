function get(req, res) {
  var database = require("../lib/db");
  database.query("SELECT * FROM Productes", function (err, result) {
    res.json(result);
  });
}

function post(req, res) {
  var database = require("../lib/db");
  database.query(
    `INSERT INTO Productes (nom, url, id, description, price) VALUES ("${req.body.nom}","${req.body.url}",NULL,"${req.body.description}","${req.body.price}")`,
    function (err, result) {
      if (err) {
        logging(res);

        res.send(JSON.stringify({ success: false }));
        res.end();
      } else {
        res.send(JSON.stringify({ success: true }));
        res.end();
      }
    }
  );
}

function put(req, res) {
  var database = require("../lib/db");
  database.query(
    `UPDATE Productes SET url='${req.body.url}',description='${req.body.description}', nom='${req.body.nom}', 
    price=${req.body.price} WHERE id='${req.body.id}'`,
    function (err, result) {
      if (err) {
        logging(res);

        res.send(JSON.stringify({ success: false }));
      } else {
        res.send(JSON.stringify({ success: true }));
      }
      res.end();
    }
  );
}

function remove(req, res) {
  var database = require("../lib/db");
  database.query(
    `DELETE FROM Productes WHERE id = "${req.body.id}" `,
    function (err) {
      if (err) {
        logging(res);

        res.send(JSON.stringify({ success: false }));
      } else {
        res.send(JSON.stringify({ success: true }));
      }
      res.end();
    }
  );
}

module.exports = { put, get, remove, post };
function logging(text) {
  fs.writeFile(
    "Log.txt",
    text,
    {
      flag: "a",
    },
    (err) => {
      if (err) console.log(err);
    }
  );
}
