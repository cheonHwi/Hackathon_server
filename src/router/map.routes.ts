import express, { Request, Response, Router } from "express";

const mapRouter: Router = express.Router();

mapRouter.get("/", (req: Request, res: Response) => {
  res.send("map");
});

export default mapRouter;
