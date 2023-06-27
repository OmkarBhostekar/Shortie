const { createUserIfNotExists } = require("../controller/userController");

const router = require("express").Router();

router.route("/login").post(createUserIfNotExists);

module.exports = router;
