const { createConnection } = require("../config/mysqlConnection");
const { selectTest } = require("../sql/query");

const indexRouter = require("express").Router();

const connection = createConnection();

indexRouter.get("/", (req, res) => {
  if (connection.connected) {
    res.sendStatus(400);
    return;
  }
  connection.query(selectTest, function (err, results, fields) {
    // console.log(results);
    if (results.length !== 0) {
      res.status(200).json(results);
    } else {
      res.status(400).json(false);
    }
  });
});

// inde;

module.exports = indexRouter;
