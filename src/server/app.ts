import express from "express";
import cors from "cors";
import morgan from "morgan";
import getPing from "./controllers/getPing/getPing.js";
import generalError from "./middleware/generalError/generalError.js";
import notFoundError from "./middleware/notFoundError/notFoundError.js";
import userRouter from "./routers/userRouter/userRouter.js";

const app = express();

const allowedOrigins = [
  process.env.CORS_ALLOWED_ORIGIN_LOCAL!,
  process.env.CORS_ALLOWED_ORIGIN_PRODUCTION!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use("/", getPing);

app.use("/user", userRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
