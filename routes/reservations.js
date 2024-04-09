const express = require("express");

const { addReservation } = require("../controllers/reservations");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router.route("/").post(protect, authorize("user", "admin"), addReservation);

module.exports = router;
