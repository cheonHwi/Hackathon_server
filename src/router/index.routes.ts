import path from "path";
import express, { Request, Response, Router } from "express";

import { inbody_result_OCR } from "../controllers/ocr.controller";
import { save } from "../controllers/user.controller";

const indexRouter: Router = express.Router();
// const rootPath = path.resolve(__dirname, "../../");

indexRouter.get("/", (req: Request, res: Response) =>
  res.status(200).send("Hello World")
);

indexRouter.get("/save", async (req: Request, res: Response) => {
  save().then((result) => res.status(200).send(result));
});

// indexRouter.get("/update", async (req: Request, res: Response) => {
//   const user = await userRepository.update(
//     { id: "ryuwoong" },
//     { id: "ryuwoong1" }
//   );
//   return res.status(200).json(user);
// });

// indexRouter.get("/find", async (req: Request, res: Response) => {
//   const user1 = await userRepository.find({ where: { id: "ryuwoong1" } });

//   return res.status(200).json(user1);
// });

indexRouter.get("/test", async (req: Request, res: Response) => {
  inbody_result_OCR().then((labels: any) =>
    // labels.forEach((label: any) => console.log(label.description))
    res.status(200).send(labels[0].description)
  );
});

export default indexRouter;
