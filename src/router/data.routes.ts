import express, { Request, Response, Router } from "express";
import { physicalRepository } from "../repository";

const dataRouter: Router = express.Router();

dataRouter.get("/", (req: Request, res: Response) =>
  res.status(200).send("Hello World")
);

dataRouter.get("/find", async (req: Request, res: Response) => {
  await physicalRepository
    .find({})
    .then((result) => res.json(result))
    .catch((err) => console.error(err));
});

export default dataRouter;
