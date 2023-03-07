import debug from "debug";
import type CustomError from "../CustomError/CustomError.js";
import app from "./app.js";

const createDebug = debug("DSSF:server");

const startServer = async (port: number) => {
  await new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      if (error.code === "EADDRINUSE") {
        createDebug(`${error.code}: port ${port} already in use`);
      }

      reject(new Error(error.code));
    });
  });

  createDebug(`Server started at http://localhost:${port}`);
};

export default startServer;
