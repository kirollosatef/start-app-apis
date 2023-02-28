import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import { connect } from "../database/connection";
import { Routes } from "../routes";

const app: express.Application = express();
connect();

app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
Routes(app);

export default app;
