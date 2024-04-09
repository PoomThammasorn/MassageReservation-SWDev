const express = require("express");
const { resetForgotPassword } = require("../controllers/users");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
	.route("/password/reset")
	.post(protect, authorize("user", "admin"), resetForgotPassword);

module.exports = router;
