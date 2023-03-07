import "./loadEnvironment.js";
import debug from "debug";
import connectDatabase from "./database/connectDatabase.js";
import startServer from "./server/startServer.js";

const createDebug = debug("dryStoneStructureFinder:root");

const port = process.env.PORT ?? 4001;
const databaseUrl: string = process.env.DATABASE_URL!;

try {
  await connectDatabase(databaseUrl);

  startServer(+port);
} catch (error) {
  const errorMessage = (error as Error).message;

  createDebug(
    errorMessage ? `${errorMessage}` : `Can't connect server or database`
  );
}
