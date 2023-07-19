const { selectTest } = require("../sql/query");
const { getConnection } = require("../config/mysqlConnection");
const { authMiddleWare } = require("../middleware/database.middleware");

const indexRouter = require("express").Router();

const connection = getConnection();

indexRouter.use(authMiddleWare(connection));

indexRouter.get("/", (req, res) => {
  console.log("main routes");
  res.send(connection);
});

// inde;

module.exports = indexRouter;
