import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import morgan from "morgan";
import express from "express";

import { AppDataSource } from "./config/data-source";

import dataRouter from "./router/data.routes";
import indexRouter from "./router/index.routes";
import googleRouter from "./router/google.routes";

const app: express.Application = express();
const PORT: string = process.env.PORT || "3000";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/data", dataRouter);
app.use("/user", indexRouter);
app.use("/GoogleLogin", googleRouter);

AppDataSource.initialize().then(() => console.log("☘️ DB Connection")); // 추가

app.listen(PORT, () => {
  console.log(`server is opened at http://localhost:${PORT}`);
});
