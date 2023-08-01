import "dotenv/config";
import * as qs from "qs";
import axios from "axios";
import express, { Request, Response, Router } from "express";
import { NextFunction } from "express-serve-static-core";

const googleRouter: Router = express.Router();

const GoogleClientId = process.env.GoogleClientId;
const GoogleClientPw = process.env.GoogleClientPw;

googleRouter.get("/", (req: Request, res: Response) => {
  const queryParams = qs.stringify({
    client_id: GoogleClientId,
    redirect_uri: "http://localhost:5000/GoogleLogin/redirect",
    response_type: "code",
    scope: "email profile",
  });

  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`;
  res.redirect(redirectUrl);
});

googleRouter.get(
  "/redirect",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.query;
      const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: GoogleClientId,
        client_secret: GoogleClientPw,
        redirect_uri: "http://localhost:5000/GoogleLogin/redirect",
        grant_type: "authorization_code",
      });

      const access_token = tokenRes.data.access_token;
      console.log(access_token);
      const userDataRes = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      const googleUserData = userDataRes.data;
      console.log(googleUserData);
      const { id, email, name, picture } = googleUserData;

      res.cookie(
        "googleUserData",
        {
          id,
          email,
          name,
          picture,
        },
        {
          httpOnly: false,
          secure: true,
        }
      );

      res.json({ email, name, picture });
    } catch (error) {
      console.error(error);
      res.status(400).send("Bad request");
    }
  }
);

googleRouter.get("/oauth", (req: Request, res: Response) => {
  const token = req.query.data;
  res.send(token);
});

export default googleRouter;
