import express, { Request, Response, Express } from "express";
import routes from "./routes";

const app: Express = express();

app.use(express.json());
app.use("/task", routes);

export default app;
