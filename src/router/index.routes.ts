import express, { Request, Response, Router } from "express";
import { userRepository } from "../repository";

const indexRouter: Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) =>
  res.status(200).send("Hello, RyuWoong?")
);

indexRouter.get("/save", async (req: Request, res: Response) => {
  const user = await userRepository.save({ id: "ryuwoong" });
  return res.status(200).json(user);
});

indexRouter.get("/update", async (req: Request, res: Response) => {
  const user = await userRepository.update(
    { id: "ryuwoong" },
    { id: "ryuwoong1" }
  );
  return res.status(200).json(user);
});

indexRouter.get("/find", async (req: Request, res: Response) => {
  const user1 = await userRepository.find({ where: { id: "ryuwoong1" } });

  return res.status(200).json(user1);
});
export default indexRouter;
