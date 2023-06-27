const catchAsync = require("../utils/catchAsync");
const User = require("../model/User");

const createUserIfNotExists = catchAsync(async (req, res, next) => {
  const { image, name, email } = req.body;
  const user = await User.find({ email: email });
  if (user.length > 0) {
    return res.status(200).json({
      status: "success",
      data: {
        name: user[0].name,
        email: user[0].email,
        image: user[0].image,
        id: user[0]._id,
      },
    });
  }
  const newUser = await User.create({
    image: image,
    name: name,
    email: email,
  });
  res.status(201).json({
    status: "success",
    data: {
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      id: newUser._id,
    },
  });
});

module.exports = { createUserIfNotExists };
