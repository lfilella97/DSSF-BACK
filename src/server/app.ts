import express from "express";
import getPing from "./controllers/getPing/getPing";

const app = express();

app.disable("x-powered-by");

app.use("/", getPing);

export default app;
