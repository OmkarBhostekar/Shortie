const {
  createUrl,
  deleteUrl,
  fetchUrl,
  getUserUrls,
  toggleUrlStatus,
} = require("../controller/UrlController");

const router = require("express").Router();

router.route("/").post(createUrl).get(getUserUrls);
router.route("/:id").get(fetchUrl).delete(deleteUrl).patch(toggleUrlStatus);

module.exports = router;
