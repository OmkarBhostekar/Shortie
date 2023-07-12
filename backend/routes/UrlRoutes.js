const {
  createUrl,
  deleteUrl,
  fetchUrl,
  getUserUrls,
  toggleUrlStatus,
  checkShortieExists,
  checkUrlPassword,
} = require("../controller/UrlController");
const { verifyToken } = require("../utils/verify");

const router = require("express").Router();

router.route("/").post(verifyToken, createUrl).get(verifyToken, getUserUrls);
router
  .route("/:id")
  .get(fetchUrl)
  .delete(verifyToken, deleteUrl)
  .patch(verifyToken, toggleUrlStatus);
router.route("/check/shortie").post(checkShortieExists);
router.route("/check/pass").post(checkUrlPassword);

module.exports = router;
