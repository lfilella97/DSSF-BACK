import createDebug from "debug";
import mongoose from "mongoose";

const debug = createDebug("DSSF:database");

mongoose.set("strictQuery", false);

const connectDatabase = async (url: string) => {
  debug("Database conected");

  await mongoose.connect(url);
};

export default connectDatabase;
