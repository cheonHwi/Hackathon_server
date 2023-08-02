import axios from "axios";
import express, { Request, Response, Router } from "express";

import { allUserFind, userDataSave } from "../controllers/user.controller";

const indexRouter: Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) =>
  res.status(200).send("Hello World")
);

indexRouter.post("/getUserData", async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  try {
    const userDataRes = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { id, name } = userDataRes.data;
    res.send({ id, name });
  } catch (err) {
    console.log(err);
    res.status(503).send("Unknown Error");
  }
});

indexRouter.post("/save", async (req: Request, res: Response) => {
  const { id, name, email, picture } = req.body;
  if (!name || !id) return res.sendStatus(400);
  userDataSave(id, name, email, picture)
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

// indexRouter.get("/ocr", async (req: Request, res: Response) => {
//   inbody_result_OCR().then((labels: any) => {
//     labels.forEach((label: any) => console.log(label.description));
//     res.status(200).send(labels[0].description);
//   });
// });

export default indexRouter;
