const mongoose = require("mongoose");
const dotenv = require("dotenv");

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

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to application termination.");
    process.exit(0);
  });
});

module.exports = mongoose;
