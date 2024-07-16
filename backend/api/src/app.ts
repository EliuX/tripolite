import * as express from "express";
import {Express} from "express";
import AppRouter from "./routes";

const app: Express = express();

app.use(express.json());
app.use(AppRouter);


export default app;
