import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import { AppDataSource } from "./config/data-source";

import mapRouter from "./router/map.routes";
import dataRouter from "./router/data.routes";
import indexRouter from "./router/index.routes";
import googleRouter from "./router/google.routes";

const app: express.Application = express();
const PORT: string = process.env.PORT || "3000";

app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/map", mapRouter);
app.use("/data", dataRouter);
app.use("/user", indexRouter);
app.use("/GoogleLogin", googleRouter);

AppDataSource.initialize().then(() => console.log("☘️ DB Connection")); // 추가

app.listen(PORT, () => {
  console.log(`server is opened at http://localhost:${PORT}`);
});
