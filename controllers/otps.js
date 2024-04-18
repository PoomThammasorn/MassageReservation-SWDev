const User = require("../models/User");
const OTP = require("../models/OTP");
const { generateToken } = require("../utils/utils");
const { mailSender } = require("../utils/mailService");
const otpGenerator = require("otp-generator");

// @desc    Send OTP
// @route   POST /api/v1/auth/otp/send
// @access  Public
exports.sendOTP = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, msg: "User not found" });
        }

        const email = req.body.email;

        const otpCode = otpGenerator.generate(6, {
            upperCaseAlphabets: true,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // check if OTP already exists
        const existingOtp = await OTP.findOne({ email: email });
        if (existingOtp) {
            console.log("Over writing existing OTP");
            await OTP.deleteOne({ email: email });
        }

        const otp = await OTP.create({
            email: email,
            otp: otpCode,
        });

        // console.log("OTP: ", otp.otp);

        // send OTP to email
        const status = await mailSender(email, otpCode);
        if (!status) {
            return res
                .status(500)
                .json({ success: false, msg: "Cannot send OTP" });
        }
        return res
            .status(200)
            .json({ success: true, msg: `OTP sent to ${email}` });
    } catch (err) {
        console.log(err.stack);
        return res.status(500).json({ success: false, msg: "Cannot send OTP" });
    }
};

// @desc    Validate OTP
// @route   POST /api/v1/auth/otp/val
// @access  Public
exports.validateOTP = async (req, res, next) => {
    // generate token with short expiry time
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, msg: "Invalid email or OTP" });
        }

        const valOtp = await user.validateOTP(req.body.otp);
        if (!valOtp) {
            return res
                .status(400)
                .json({ success: false, msg: "Invalid email or OTP" });
        }

        const { token, options } = generateToken(user, "15m", "15m");

        // remove OTP from db
        await OTP.deleteOne({ email: req.body.email });

        return res
            .status(200)
            .cookie("token", token, options)
            .json({ success: true, msg: "OTP validated", token: token });
    } catch (err) {
        console.log(err.stack);
        return res
            .status(500)
            .json({ success: false, msg: "Cannot validate OTP" });
    }
};
