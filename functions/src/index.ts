import * as express from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import rooms from "./routers/rooms";
import { userOnCreate, userOnDelete } from "./triggers/auth";

// eslint-disable-next-line @typescript-eslint/no-var-requires

admin.initializeApp();

export const dailyKey = functions.config().daily.key;

const app = express();

app.use("/api", rooms);

exports.api = functions.https.onRequest(app);
exports.userOnCreate = userOnCreate;
exports.userOnDelete = userOnDelete;
