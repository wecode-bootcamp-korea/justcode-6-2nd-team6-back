const express = require("express");
const validateToken = require("../middlewares/user");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/send", userController.send);
router.post("/verify", userController.userVerification);
router.get("/signup", userController.userExisted);
router.post("/login", userController.userLogin);
router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});
router.patch("/like/:id", userController.likeSong);

module.exports = router;
