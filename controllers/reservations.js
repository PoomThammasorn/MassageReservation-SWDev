const Reservation = require("../models/Reservation");
const MassageShop = require("../models/MassageShop");

// @desc	Add new reservation
// @route	POST /api/v1/shops/:shopId/reservations
// @access	Private
exports.addReservation = async (req, res, next) => {
	try {
		req.body.massageShop = req.params.shopId;

		const massageShop = await MassageShop.findById(req.params.shopId);

		if (!massageShop) {
			return res.status(400).json({
				success: false,
				message: `No massage shop with the id of ${req.params.shopId}`,
			});
		}
		console.log(req.body);

		if (req.user.role !== "admin") {
			// add user Id to the request body
			req.body.user = req.user.id;
		} else if (!req.body.user) {
			// check if is an admin and user ID is not provided
			return res.status(400).json({
				success: false,
				message: `Please provide a user ID`,
			});
		}

		// check for existed appointment
		const existedReservation = await Reservation.find({
			user: req.body.user,
		});

		// if the user is not an admin, they can only add 3 appointments
		if (req.user.role !== "admin" && existedReservation.length >= 3) {
			return res.status(400).json({
				success: false,
				message: `The user with ID ${req.body.user} has already made 3 reservations`,
			});
		}

		const reservation = await Reservation.create(req.body);

		res.status(201).json({
			success: true,
			data: reservation,
		});
	} catch (err) {
		console.log(err.stack);
		return res
			.status(500)
			.json({ success: false, message: "Cannot create reservation" });
	}
};
