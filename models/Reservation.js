const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
	{
		apptDate: {
			type: Date,
			required: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		massageShop: {
			type: mongoose.Schema.ObjectId,
			ref: "MassageShop",
			required: true,
		},
		createAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: {
			virtuals: true,
			transform: function (doc, ret) {
				// Remove _id and __v fields from the JSON representation
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

module.exports = mongoose.model("Reservation", ReservationSchema);
