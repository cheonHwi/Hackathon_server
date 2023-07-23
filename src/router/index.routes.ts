import express, { Request, Response, Router } from "express";

import { inbody_result_OCR } from "../controllers/ocr.controller";
import { allUserFind, userDataSave } from "../controllers/user.controller";

const indexRouter: Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) =>
  res.status(200).send("Hello World")
);

indexRouter.get("/save", async (req: Request, res: Response) => {
  const { username } = req.body;
  if (!username) return res.sendStatus(400);
  userDataSave(username)
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((err: any) => res.sendStatus(503));
});

indexRouter.get("/find", async (req: Request, res: Response) => {
  allUserFind()
    .then((result: Array<object>) => {
      if (!result.length) return res.sendStatus(404);
      return res.status(200).json(result);
    })
    .catch((err: any) => res.sendStatus(503));
});

// indexRouter.get("/update", async (req: Request, res: Response) => {
//   const user = await userRepository.update(
//     { id: "ryuwoong" },
//     { id: "ryuwoong1" }
//   );
//   return res.status(200).json(user);
// });

indexRouter.get("/ocr", async (req: Request, res: Response) => {
  inbody_result_OCR().then((labels: any) =>
    // labels.forEach((label: any) => console.log(label.description))
    res.status(200).send(labels[0].description)
  );
});

export default indexRouter;
