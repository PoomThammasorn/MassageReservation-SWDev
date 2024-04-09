const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Please add an email"],
		unique: true,
		match: [
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please add a valid email",
		],
	},
	otp: {
		type: String,
		unique: true,
		required: true,
		length: 6,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: "5m", // 5 minutes
	},
});

module.exports = mongoose.model("OTP", OTPSchema);
