import "dotenv/config";
import "reflect-metadata";
import express from "express";
import morgan from "morgan";

import { AppDataSource } from "./config/data-source";

import indexRouter from "./router/index.routes";

const app: express.Application = express();
const PORT: string = process.env.PORT || "3000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/", indexRouter);

AppDataSource.initialize().then(() => console.log("☘️ DB Connection")); // 추가

app.listen(PORT, () => {
  console.log(`server is opened at http://localhost:${PORT}`);
});
