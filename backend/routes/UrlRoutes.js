const {
  createUrl,
  deleteUrl,
  fetchUrl,
  getUserUrls,
  toggleUrlStatus,
  checkShortieExists,
  checkUrlPassword,
} = require("../controller/UrlController");

const router = require("express").Router();

router.route("/").post(createUrl).get(getUserUrls);
router.route("/:id").get(fetchUrl).delete(deleteUrl).patch(toggleUrlStatus);
router.route("/check/shortie").post(checkShortieExists);
router.route("/check/pass").post(checkUrlPassword);

module.exports = router;
