import express from "express";
import getPing from "./controllers/getPing/getPing.js";

const app = express();

app.disable("x-powered-by");

app.use("/", getPing);

export default app;
