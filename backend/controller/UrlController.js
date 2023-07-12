const catchAsync = require("../utils/catchAsync");
var base62 = require("base62-random");
const Url = require("../model/Url");
const User = require("../model/User");
const bcrypt = require("bcryptjs");

const getUserUrls = catchAsync(async (req, res, next) => {
  const uid = req.user.id;
  const user = await User.findById(uid).populate("urls");
  console.log(uid);
  const urls = user.urls;
  // console.log(urls);
  urls.sort(function (a, b) {
    var keyA = new Date(a.created),
      keyB = new Date(b.created);
    // Compare the 2 dates
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });
  res.status(200).json({
    status: "success",
    data: urls,
  });
});

const checkTiny = async (tiny) => {
  const urls = await Url.find({ shortUrl: tiny });
  if (urls.length > 0) {
    return false;
  }
  return true;
};

const checkShortieExists = catchAsync(async (req, res, next) => {
  const shortie = req.body.shortie;
  const exists = await checkTiny(shortie);
  res.status(200).json({
    status: "success",
    data: exists ? "Available" : "Not Available",
  });
});

const createUrl = catchAsync(async (req, res, next) => {
  const { longUrl, shortie, pass } = req.body;
  const uid = req.user.id;
  console.log(uid, longUrl, shortie, pass);
  let tiny = base62(7);
  if (shortie) tiny = shortie;
  while (!(await checkTiny(tiny))) {
    tiny = base62(7);
  }
  let hashed = null;
  if (pass) {
    hashed = await bcrypt.hash(pass, 12);
  }
  const url = await Url.create({
    shortUrl: tiny,
    longUrl: longUrl,
    user: uid,
    password: hashed,
  });
  const user = await User.findById(uid);
  user.urls.push(url._id);
  await user.save();
  res.status(201).json({
    status: "success",
    data: {
      url,
    },
  });
});

const checkUrlPassword = catchAsync(async (req, res, next) => {
  const shortie = req.body.shortie;
  const pass = req.body.pass;
  const url = await Url.findOne({ shortUrl: shortie });
  console.log(url);
  if (!url || !url.password) {
    throw new Error("Url not found");
  }
  const match = await bcrypt.compare(pass, url.password);
  if (!match) {
    res.status(200).json({
      status: "success",
      data: false,
    });
  } else {
    res.status(200).json({
      status: "success",
      data: true,
    });
  }
});

const deleteUrl = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const url = await Url.find({ _id: id });
  if (url.length > 0 && url[0].user == req.user.id) {
    await Url.findByIdAndDelete(id);
    const user = await User.findById(url[0].user);
    user.urls.pull(url[0]._id);
    await user.save();
  } else {
    throw new Error("Url not found");
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
const toggleUrlStatus = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const url = await Url.findById(id);
  if (!url || !url.user.equals(req.user.id)) throw new Error("Url not found");
  url.isActive = url.isActive != true;
  await url.save();
  res.status(200).json({
    status: "success",
    data: url,
  });
});
const fetchUrl = catchAsync(async (req, res, next) => {
  const shortUrl = req.params.id;
  console.log(shortUrl);
  const url = await Url.findOne({ shortUrl: shortUrl });
  if (!url) throw new Error("Url not found");
  if (!url.isActive) throw new Error("Url is not active");
  url.clicks += 1;
  await url.save();
  res.status(200).json({
    status: "success",
    data: {
      url: url.longUrl,
      pass: url.password ? true : false,
    },
  });
});

module.exports = {
  createUrl,
  deleteUrl,
  fetchUrl,
  getUserUrls,
  toggleUrlStatus,
  checkShortieExists,
  checkUrlPassword,
};
