const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const { validateOTP, sendOTP} = require("../controllers/otps");

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
});

// router.use(limiter);

router.use("/send", limiter, sendOTP);
router.use("/val", validateOTP);
// router.use("/check", checkOTP);

module.exports = router;
