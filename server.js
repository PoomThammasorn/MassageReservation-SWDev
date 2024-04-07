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
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();

const auth = require("./routes/auth");

// Load env vars
dotenv.config({ path: "./configs/config.env" });

// Connect to database
connectDB();

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

// Mount routers
app.use("/api/v1/auth", auth);

// Port
const PORT = process.env.PORT || 8080;

// Import Swagger file
const swaggerDocument = YAML.load("./swagger/swagger.yaml"); // For YAML format

// Set up Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`);
	// Close server & exit process
	server.close(() => process.exit(1));
});
