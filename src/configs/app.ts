import {connect} from '../database/connection';
import express from 'express';

const app: express.Application = express();
connect();

app.get("/", (req, res) => {
    res.send("Hello World!");
  });



export default app;