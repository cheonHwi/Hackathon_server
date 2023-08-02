import fs from "fs";
import path from "path";
import axios from "axios";
import multer from "multer";
import express, { Request, Response, Router } from "express";

import { multerConfig } from "../config/multer-config";
import { PhysicalData } from "../entity";
import { physicalDataSave } from "../controllers/data.controller";
import { physicalRepository, userRepository } from "../repository";

const dataRouter: Router = express.Router();
const upload = multer(multerConfig);

dataRouter.get("/", (req: Request, res: Response) =>
  res.status(200).send("Hello World")
);

dataRouter.post("/getCurrentInfo", async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) return res.sendStatus(405);
  physicalRepository
    .findOne({ where: { id }, order: { idx: "DESC" } })
    .then((result) => res.json(result));
});

// 전체 랭킹 조회 api
dataRouter.get("/rank", async (req: Request, res: Response) => {
  try {
    const rankings = await userRepository
      .createQueryBuilder("user")
      .select("user.id", "id")
      .select("user.name", "name")
      .addSelect("MAX(physicalData.inbody_score)", "max_inbody_score")
      .leftJoin("physical_data", "physicalData", "user.id = physicalData.id")
      .groupBy("user.id")
      .having("max_inbody_score IS NOT NULL")
      .orderBy("max_inbody_score", "DESC")
      .getRawMany();

    const rankedUsers = await userRepository
      .createQueryBuilder("u")
      .leftJoin(PhysicalData, "p", `p.id = u.id AND p.inbody_score IS NOT NULL`)
      .where(`p.idx IS NOT NULL`)
      .orderBy("p.inbody_score", "DESC")
      .addOrderBy("p.inspection_date", "DESC") // To handle ties with the same inbody_score
      .getMany();

    res.json(rankedUsers);
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
        // console.log(result.data);
        result.data["id"] = "110626999320798511586";
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
            res.status(201).send(response);
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
