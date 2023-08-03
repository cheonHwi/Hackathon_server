import "dotenv/config";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import express, { Request, Response, Router } from "express";

import {
  allUserFind,
  findOneUser,
  userDataSave,
  userDataUpdate,
} from "../controllers/user.controller";
import { UserData } from "../types/physicalData";
import { userRepository } from "../repository";

const indexRouter: Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) =>
  res.status(200).send("Hello World")
);

indexRouter.post("/addDataLogin", async (req: Request, res: Response) => {
  const { id } = req.body;
  console.log(id);
  findOneUser(id).then((result) => {
    if (!result) {
      res.sendStatus(503);
    }
    console.log(result);
    res.status(201).json(result);
  });
});

indexRouter.post("/login", async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  try {
    const userDataRes = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const googleUserData = userDataRes.data;

    const tokenUserData: UserData = {
      id: googleUserData.id,
      name: googleUserData.name,
      affiliation: null,
      army_unit: null,
      enlistment_date: null,
      is_verified: false,
    };

    findOneUser(googleUserData.id).then((result) => {
      if (!result) {
        userDataSave(googleUserData.id, googleUserData.name);
      }
      if (result?.affiliation && result.army_unit && result.enlistment_date) {
        tokenUserData.affiliation = result?.affiliation;
        tokenUserData.army_unit = result?.army_unit;
        tokenUserData.enlistment_date = new Date(result?.enlistment_date);
        tokenUserData.is_verified = result?.is_verified;
      }

      console.log(tokenUserData);

      const accessToken = jwt.sign(
        tokenUserData,
        process.env.ACCESS_SECRET as string, // 일종의 salt
        { expiresIn: "1h" } // 옵션 중에서 만료기간
      );

      const refreshToken = jwt.sign(
        tokenUserData,
        process.env.REFRESH_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      // 토큰 전달하기
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
        })
        .status(200)
        .json({ data: { accessToken }, message: "ok" });
    });
  } catch (err) {
    console.log(err);
    res.status(503).send("Unknown Error");
  }
});

indexRouter.post("/verify", async (req: Request, res: Response) => {
  const { id, name, unit, belong, date } = req.body;
  if (!name || !id) return res.sendStatus(400);
  userDataSave(id, name, unit, belong, date)
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((err: any) => res.sendStatus(503));
});

indexRouter.post("/addAdditionalData", async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) return res.sendStatus(402);
  await userDataUpdate(id, { ...req.body })
    .then(async (result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(503);
    });
});

indexRouter.get("/accessTokenRequest", async (req: Request, res: Response) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res
      .status(400)
      .json({ data: null, message: "invalid access token" });
  }

  const token = authorization.split(" ")[1]; // accessToken만 추출하기 위한 문법
  const tokenData = jwt.verify(token, process.env.ACCESS_SECRET as string);
  try {
    const { id } = tokenData as JwtPayload;
    findOneUser(id).then((result) => {
      if (!result)
        return res.json({
          data: null,
          message: "access token has been tempered",
        });
      return res.status(200).json(result);
    });
  } catch (err) {
    res.sendStatus(500);
  }
});

indexRouter.get("/find", async (req: Request, res: Response) => {
  allUserFind()
    .then((result: Array<object>) => {
      if (!result.length) return res.sendStatus(404);
      return res.status(200).json(result);
    })
    .catch((err: any) => res.sendStatus(503));
});

export default indexRouter;
