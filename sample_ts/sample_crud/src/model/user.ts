import { Schema, model } from "mongoose";
import { IUser } from "../utils/types";

const userSchema = new Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  aceNo: {
    type: String,
  },
});

export default model<IUser>("User", userSchema);
