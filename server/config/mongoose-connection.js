import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected With Database");
  })
  .catch((err) => {
    console.log("Error Occurred: Database Connection", err);
  });

export default mongoose.connection;