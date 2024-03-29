const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth_controller");
const isAuth = require("../middlewares/is_auth");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../middlewares/verifytoken");


router.post("/register", controller.register);
router.post("/login", controller.logIn);
router.post("/deactivate", isAuth, controller.deactivateAcc);
router.post("/sendCode", controller.sendEmail);
router.post("/confirmCode", controller.confirmCode);
router.post("/forgotPassword", controller.forgotPassword);
router.post("/changePassword", isAuth, controller.changePassword);
router.get("/profile", isAuth, controller.getProfile);

module.exports = router;
