const express = require("express");
const router = express.Router();

const { register, login, logout, getMe } = require("../controllers/auth.js");

const { protect } = require("../middleware/auth");

// re-route into other resource routers (OTPs)
router.use("/otp", require("./otps"));

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);

module.exports = router;
