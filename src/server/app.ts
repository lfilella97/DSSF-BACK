import express from "express";
import getPing from "./controllers/getPing/getPing.js";
import generalError from "./middleware/generalError/generalError.js";
import notFoundError from "./middleware/notFoundError/notFoundError.js";

const app = express();

app.disable("x-powered-by");

app.use("/", getPing);

app.use(notFoundError);

app.use(generalError);
export default app;
