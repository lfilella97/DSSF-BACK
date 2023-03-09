import createDebug from "debug";
import mongoose from "mongoose";

const debug = createDebug("DSSF:database");

mongoose.set("strictQuery", false);
mongoose.set("debug", true);
mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});
const connectDatabase = async (url: string) => {
  debug("Database conected");

  await mongoose.connect(url);
};

export default connectDatabase;
