const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const DBConfig = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_DB,
};

const conn = mysql.createConnection(DBConfig);

const getConnection = () => {
  console.log("asdkjh");
  conn.connect(function (error) {
    if (error) {
      console.error("연결 중 에러 발생:", error.message);
      // setTimeout(getConnection);
      return null;
    } else {
      console.log("연결 완료!");
      return conn;
    }
  });
};

module.exports = { getConnection };
