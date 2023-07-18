const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_DB,
});

const getConnection = async () => {
  try {
    conn = await pool.getConnection();
    return conn;
  } catch (err) {
    console.error(`connection error : ${err.message}`);
    return null;
  }
};

const releasesConnection = async (conn) => {
  try {
    await conn.release();
  } catch (error) {
    console.error(`release error : ${error.message}`);
  }
};
