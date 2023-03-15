import express from "express";
import cors from "cors";
import morgan from "morgan";
import getPing from "./controllers/getPing/getPing.js";
import userRouter from "./routers/userRouter/userRouter.js";
import options from "../utils/corsOptions.js";
import structuresRouter from "./routers/structuresRouter/structuresRouter.js";
import { generalError, notFoundError } from "./middleware/errors/errors.js";

const app = express();

app.use(cors(options));
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.get("/", getPing);
app.use("/user", userRouter);
app.use("/structures", structuresRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
