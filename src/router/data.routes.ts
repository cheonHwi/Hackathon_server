import fs from "fs";
import path from "path";
import axios from "axios";
import multer from "multer";
import express, { Request, Response, Router } from "express";

import { multerConfig } from "../config/multer-config";
import { PhysicalData } from "../entity";
import { physicalDataSave } from "../controllers/data.controller";
import { physicalRepository, userRepository } from "../repository";
import { Between } from "typeorm";

const dataRouter: Router = express.Router();
const upload = multer(multerConfig);

dataRouter.get("/", (req: Request, res: Response) =>
  res.status(200).send("Hello World")
);

dataRouter.get("/variation", (req: Request, res: Response) => {
  async function getInBodyScoreRangesWithAverage() {
    const scoreRanges = [];
    const minScore = 30;
    const maxScore = 129;
    const interval = 20;

    // Loop through the score ranges and perform calculations for each range
    for (let i = minScore; i <= maxScore; i += interval) {
      const inbodyScores = await physicalRepository.find({
        where: { inbody_score: Between(i, i + interval - 1) },
      });

      const count = inbodyScores.length;
      scoreRanges.push({ range: `${i}-${i + interval - 1}`, count });
    }

    return scoreRanges;
  }
  async function getInBodyScoreAverage() {
    const average = await physicalRepository
      .createQueryBuilder("physicalData")
      .select("AVG(physicalData.inbody_score)", "average")
      .getRawOne();

    return average.average;
  }

  // Example usage:
  getInBodyScoreRangesWithAverage()
    .then(async (scoreRanges) => {
      console.log(scoreRanges);
      getInBodyScoreAverage().then((result) => {
        res.status(200).json({ dataArray: scoreRanges, avg: result });
      });
      // res.send(scoreRanges);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

dataRouter.post("/getLineData", async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) return res.sendStatus(402);
  try {
    const inbodyScores = await physicalRepository
      .createQueryBuilder("physicalData")
      .select("physicalData.inbody_score", "inbody_score")
      .where("physicalData.id = :id", { id })
      .orderBy("physicalData.inspection_date", "DESC")
      .limit(5)
      .getRawMany();

    res.json(inbodyScores);
  } catch (error) {
    console.error("Error while joining tables:", error);
    res.status(503).send("Unknown Error");
  }
});

dataRouter.post("/getCurrentInfo", async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) return res.sendStatus(405);
  physicalRepository
    .findOne({ where: { id }, order: { idx: "DESC" } })
    .then((result) => res.json(result));
});

dataRouter.post("/squareChartData", async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) return res.sendStatus(405);
  physicalRepository
    .findOne({ where: { id }, order: { idx: "DESC" } })
    .then((result) => {
      console.log(result);
      res.json(result);
    });
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
      .limit(3)
      .orderBy("max_inbody_score", "DESC")
      .getRawMany();

    res.json(rankings);
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
    if (id == "null") {
      return res.sendStatus(402);
    }
    console.log(req.file?.filename);
    axios
      .post("http://127.0.0.1:8000/ocr_file", {
        file_name,
      })
      .then((result) => {
        if (result.status !== 200) return res.sendStatus(500);
        // console.log(result.data);
        result.data["id"] = id;
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
        // console.log(err);
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
