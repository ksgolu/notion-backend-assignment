import express, { Request, Response, Express } from "express";
import routes from "./routes";

const app: Express = express();

app.use(express.json());
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
