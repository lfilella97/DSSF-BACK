import debug from "debug";
import app from "./app";

const createDebug = debug("dryStoneStructureFinder:server");

const startServer = (port: number) => {
  app.listen(port);

  createDebug(`Server started at http://localhost:${port}`);
};

export default startServer;
