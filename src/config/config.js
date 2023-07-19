const Sequelize = require("sequelize");

const dbConfig = {
  HOST: "121.130.215.41",
  USER: "projectm",
  PASSWORD: "7oml7UsTL$",
  PORT: "3306",
  DB: "hackathon",
  dialect: "mysql",
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model")(sequelize, Sequelize);

module.exports = db;
