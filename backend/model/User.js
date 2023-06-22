const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String },
  name: { type: String, required: true },
  image: { type: String, required: true },
  urls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Url" }],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
