const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const connectDB = require("./configs/db");

const app = express();

// Connect to database
connectDB();

// Load env vars
dotenv.config({ path: "./configs/config.env" });

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());

// Prevent NoSQL injection by sanitizing data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 mins
	max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Cookie parser
app.use(cookieParser());

app.get("/", (req, res) => {
	res.status(200).json({ success: true, data: "server is running" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
