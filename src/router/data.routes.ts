import axios from "axios";
import fs from "fs";
import multer from "multer";
import express, { Request, Response, Router } from "express";

import { physicalRepository, userRepository } from "../repository";
import { multerConfig } from "../config/multer-config";
import path from "path";
import { physicalDataSave } from "../controllers/data.controller";

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
    const tmpFilePath = path.join(__dirname, "../../../tmp");
    const { id } = req.body;
    const file = req.file;
    const file_name = req.file?.filename;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    console.log(req.file?.filename);
    axios
      .post("http://127.0.0.1:8000/ocr_file", {
        file_name,
      })
      .then((result) => {
        if (result.status !== 200) return res.sendStatus(500);
        result.data["id"] = "1231412";
        console.log(result.data);
        // 파일 삭제
        if (file_name && fs.existsSync(path.join(tmpFilePath, file_name))) {
          try {
            fs.unlinkSync(path.join(tmpFilePath, file_name));
            console.log("image delete");
          } catch (error) {
            console.log(error);
          }
        }
        physicalDataSave(result.data)
          .then((response: any) => {
            res.status(200).send(response);
          })
          .catch((err: any) => res.sendStatus(503));

        // res.send(result.data);
      })
      .catch((err) => {
        console.log(err);
        if (file_name && fs.existsSync(path.join(tmpFilePath, file_name))) {
          try {
            fs.unlinkSync(path.join(tmpFilePath, file_name));
            console.log("image delete");
          } catch (error) {
            console.log(error);
          }
        }
        res.sendStatus(500);
      });
    // res.json({ message: "File uploaded successfully." });
  }
);

export default dataRouter;
