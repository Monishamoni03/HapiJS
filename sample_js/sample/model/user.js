const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const userSchema = new mongoose.Schema({
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
        type: String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
