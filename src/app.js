const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index.routes");

// const createConnection = require("./config/mysqlConnection");

dotenv.config();

const app = express();
// const connection = createConnection();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", indexRouter);

app.listen(process.env.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT}`);
});
