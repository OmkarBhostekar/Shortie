const {
  createUrl,
  deleteUrl,
  fetchUrl,
  getUserUrls,
} = require("../controller/UrlController");

const router = require("express").Router();

router.route("/").post(createUrl).get(getUserUrls);
router.route("/:id").get(fetchUrl).delete(deleteUrl);

module.exports = router;
