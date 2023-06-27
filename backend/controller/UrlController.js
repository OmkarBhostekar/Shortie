const catchAsync = require("../utils/catchAsync");
var base62 = require("base62-random");
const Url = require("../model/Url");
const User = require("../model/User");

const getUserUrls = catchAsync(async (req, res, next) => {
  const uid = req.query.id;
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

const createUrl = catchAsync(async (req, res, next) => {
  const { uid, longUrl } = req.body;
  console.log(uid, longUrl);
  let tiny = base62(7);
  while (!(await checkTiny(tiny))) {
    tiny = base62(7);
  }
  const url = await Url.create({
    shortUrl: tiny,
    longUrl: longUrl,
    user: uid,
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
const deleteUrl = async (req, res, next) => {
  const id = req.params.id;
  const url = await Url.find({ _id: id });
  if (url.length > 0) {
    await Url.findByIdAndDelete(id);
    const user = await User.findById(url[0].user);
    user.urls.pull(url[0]._id);
    await user.save();
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
};
const toggleUrlStatus = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const url = await Url.findById(id);
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
    data: url.longUrl,
  });
});

module.exports = {
  createUrl,
  deleteUrl,
  fetchUrl,
  getUserUrls,
  toggleUrlStatus,
};
