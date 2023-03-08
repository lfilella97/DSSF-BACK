import "./loadEnvironment.js";
import createDebug from "debug";
import connectDatabase from "./database/connectDatabase.js";
import startServer from "./server/startServer.js";

const debug = createDebug("DSSF:root");

const port = process.env.PORT ?? 4001;
const databaseUrl: string = process.env.DATABASE_URL!;

try {
  await connectDatabase(databaseUrl);

  await startServer(+port);
} catch (error) {
  debug(error.message);
}
