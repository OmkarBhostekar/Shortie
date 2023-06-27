const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  shortUrl: { type: String, required: true },
  longUrl: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  password: { type: String },
  clicks: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Url", urlSchema);
