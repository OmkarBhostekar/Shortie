const ApiError = require("./ApiError");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  //   console.log(bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new ApiError(401, "Unauthorized", false, err.message);
      }
      req.user = decoded;
      next();
    });
  } else {
    throw new ApiError(401, "Unauthorized", false, "No token provided");
  }
};

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };
  const options = { expiresIn: "30d" };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};

module.exports = { verifyToken, generateToken };
