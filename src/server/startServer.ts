import createDebug from "debug";
import type CustomError from "../CustomError/CustomError.js";
import app from "./app.js";

const debugg = createDebug("DSSF:server");

const startServer = async (port: number) => {
  await new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      if (error.code === "EADDRINUSE") {
        debugg(`${error.code}: port ${port} already in use`);
      }

      reject(error);
    });
  });

  debugg(`Server started at http://localhost:${port}`);
};

export default startServer;
