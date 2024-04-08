import express, { Request, Response, Express } from "express";
import taskRoute from "./routes/taksRoute";
import authRoute from "./routes/authRoute";

const app: Express = express();

app.use(express.json());
app.use("/task", taskRoute);
app.use("/auth", authRoute);

export default app;
