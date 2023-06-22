const {
  createUrl,
  deleteUrl,
  fetchUrl,
} = require("../controller/UrlController");

const router = require("express").Router();

router.route("/").post(createUrl);
router.route("/:id").get(fetchUrl).delete(deleteUrl);

module.exports = router;
