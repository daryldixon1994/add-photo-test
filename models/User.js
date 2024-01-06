const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  userImg: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
  },
  audio: {
    type: String,
    default: "",
  },
});

module.exports = User = mongoose.model("users", userSchema);
