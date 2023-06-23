const catchAsync = require("../utils/catchAsync");
var base62 = require("base62-random");
const Url = require("../model/Url");

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
  res.status(201).json({
    status: "success",
    data: {
      url,
    },
  });
});
const deleteUrl = (req, res, next) => {};
const fetchUrl = catchAsync(async (req, res, next) => {
  const shortUrl = req.params.id;
  console.log(shortUrl);
  const url = await Url.findOne({ shortUrl: shortUrl });
  if (!url) throw new Error("Url not found");
  res.status(200).json({
    status: "success",
    data: url.longUrl,
  });
});

module.exports = { createUrl, deleteUrl, fetchUrl };
