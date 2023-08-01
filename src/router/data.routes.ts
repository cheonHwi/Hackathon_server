import axios from "axios";
import multer from "multer";
import express, { Request, Response, Router } from "express";

import { physicalRepository, userRepository } from "../repository";
import { multerConfig } from "../config/multer-config";

const dataRouter: Router = express.Router();
const upload = multer(multerConfig);

dataRouter.get("/", (req: Request, res: Response) =>
  res.status(200).send("Hello World")
);

// 전체 랭킹 조회 api
dataRouter.get("/rank", async (req: Request, res: Response) => {
  try {
    const queryResult = await userRepository
      .createQueryBuilder("user")
      .innerJoin("physical_data", "data", "user.id = data.id")
      .select(["user.id", "user.name", "data.inbody_score"])
      .getRawMany();

    res.json(queryResult);
  } catch (error) {
    console.error("Error while joining tables:", error);
    res.status(503).send("Unknown Error");
  }
});

// OCR 서버 중개 api
dataRouter.post(
  "/upload",
  upload.single("image"),
  (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    console.log(req.file?.filename);
    axios
      .post("http://127.0.0.1:8000/ocr_file", {
        file_name: req.file?.filename,
      })
      .then((result) => {
        console.log(result);
        res.send(result.data);
      });
    // res.json({ message: "File uploaded successfully." });
  }
);

export default dataRouter;
