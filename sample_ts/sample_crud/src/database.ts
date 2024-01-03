import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
try {
  mongoose
    .connect(process.env.MONGO_DB || "mongodb://localhost:27017/hapi_sample")
    .then(() => console.log("Hey, Database connected"))
    .catch((err) => console.log("Errors", err));
} catch (error) {
  console.log("Catch errors in db:", error);
}

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});
// mongoose
//   .connect("mongodb://localhost:27017/hapi_sample")
//   .then((db) => console.log("Db is connected"))
//   .catch((err) => console.log(err));
