import * as admin from "firebase-admin";
import { Handler } from "express";

const getAuthToken: Handler = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

export const checkIfAuthenticated: Handler = (req, res, next) => {
  getAuthToken(req, res, async () => {
    if (!req.authToken) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }

    try {
      const userInfo = await admin.auth().verifyIdToken(req.authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};
