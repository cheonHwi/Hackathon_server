import express, { Request, Response, Router } from "express";
import { gymRepository } from "../repository";

const mapRouter: Router = express.Router();

mapRouter.get("/query", (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  gymRepository.find({}).then((result) => res.status(200).send(result));
});

export default mapRouter;
