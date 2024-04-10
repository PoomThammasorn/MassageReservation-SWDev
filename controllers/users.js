const User = require("../models/User");
const Reservation = require("../models/Reservation");

// @desc    Reset password
// @route   POST /api/v1/users/password/reset
// @access  Private
exports.resetForgotPassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res
                .status(400)
                .json({ success: false, msg: "User not found" });
        }

        user.password = req.body.password;

        await user.save();

        // remove token from cookie
        res.cookie("token", "none", {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });

        return res
            .status(200)
            .json({ success: true, msg: "Password reset successful" });
    } catch (err) {
        console.log(err.stack);
        return res
            .status(500)
            .json({ success: false, msg: "Cannot reset password" });
    }
};

