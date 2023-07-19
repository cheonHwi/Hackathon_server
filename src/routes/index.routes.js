const { authMiddleWare } = require("../middleware/database.middleware");

const db = require("../config/config");

const indexRouter = require("express").Router();

const User = db.users;

indexRouter.get("/", (req, res) => {
  res.send("asd");
});

indexRouter.post("/users", (req, res) => {
  const { firstName, lastName, hasCar } = req.body;

  const user = {
    firstName,
    lastName,
    hasCar,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "유저를 생성하는데 에러가 발생했습니다.",
      });
    });
});

indexRouter.get("/users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "유저 정보를 가져오는데 실패했습니다.",
      });
    });
});

module.exports = indexRouter;
