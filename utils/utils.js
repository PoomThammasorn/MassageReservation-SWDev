const ms = require("ms");

exports.timecompare = (time1, time2, isLess) => {
    const [hour1, minute1] = time1.split(":").map(Number);
    const [hour2, minute2] = time2.split(":").map(Number);

    const totalMinutes1 = hour1 * 60 + minute1;
    const totalMinutes2 = hour2 * 60 + minute2;

    if (isLess) {
        console.log("from timecompare", totalMinutes1 < totalMinutes2);
        return totalMinutes1 < totalMinutes2;
    } else {
        console.log("from timecompare", totalMinutes1 > totalMinutes2);
        return totalMinutes1 > totalMinutes2;
    }
};

exports.generateToken = (
    user,
    jwtTTL = process.env.JWT_EXPIRE,
    cookieTTL = process.env.JWT_COOKIE_EXPIRE
) => {
    const token = user.getSignedJwtToken(jwtTTL);

    cookieTTL = ms(cookieTTL); // convert to milliseconds
    // console.log("cookieTTL: ", cookieTTL);

    const options = {
        expires: new Date(Date.now() + cookieTTL),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    return { token, options };
};
