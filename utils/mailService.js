const nodemailer = require("nodemailer");

exports.mailSender = async (email, otpCode) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "meassage.reserve.company@gmail.com",
            pass: "zixy ssqx eseo mehz",
        },
    });

    transporter.verify().catch(console.error);
    transporter
        .sendMail({
            from: '"Massage Reserve Service Company" <meassage.reserve.company@gmail.com>', // Sender address
            to: email, // Recipient
            subject: "Recover Your Massage Reserve Account Password", // Subject line
            html: mailHTMLBody(otpCode), // HTML body
        })
        .then((info) => {
            // console.log({ info });
        })
        .catch((error) => {
            console.log({ error });
            return false;
        });

    return true;
};

const mailHTMLBody = (otpCode) => {
    return `
    <style>
    body {
        font-family: Arial, sans-serif;
        color: #333;
        font-size: 14px;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }
    p {
        margin-bottom: 15px;
    }
    strong {
        color: #0066ff;
    }
    .OTP {
        color: #413a38;
        font-size: 20px;
        font-weight: bold;
    }
    .OTPText {
        font-size: 20px;
    }
    em {
        color: #0b8114;
        font-weight: bolder;
    }
    .warntxt {
        color: #ff0000;
    }
    .hello {
        font-size: 17px;
        font-weight: bold;
    }
</style>
<div class="container">
    <p class="hello">Hello,</p>
    <p>
        You have requested to <em>recover</em> your Massage Reserve account
        password. Please find your One Time Password (OTP) below:
    </p>
    <p class="OTPtext">
        <strong>OTP:</strong> <span class="OTP"> ${otpCode}</span>
    </p>
    <p class="warntxt">
        If you didn't request this, you can safely ignore this email.
    </p>
    <p>Best regards,<br />Massage Reserve Service Company</p>
</div>
        `;
};
