const mongoose = require("mongoose");
const timecompare = require("../utils/time");

const MassageShopSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a massage shop name"],
			unique: true,
			trim: true,
			maxlength: [50, "Name can not be more than 50 characters"],
		},
		address: {
			type: String,
			required: [true, "Please add an address"],
		},
		district: {
			type: String,
			required: [true, "Please add a district"],
		},
		province: {
			type: String,
			required: [true, "Please add a province"],
		},
		postalcode: {
			type: String,
			required: [true, "Please add a postal code"],
			maxlength: [5, "Postal code can not be more than 5 digits"],
		},
		tel: {
			type: String,
		},
		open: {
			type: String,
			match: [
				/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
				"Please add a valid opening time",
			],
			validate: {
				validator: function (value) {
					// Check if close time is after open time
					if (!this.close) return true; // Skip validation if close time is not set
					return timecompare(value, this.close, true);
				},
				message: "Opening time must be before closing time",
			},
			required: [true, "Please add an opening time"],
		},
		close: {
			type: String,
			match: [
				/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
				"Please add a valid closing time",
			],
			required: [true, "Please add a closing time"],
			validate: {
				validator: function (value) {
					// Check if close time is after open time
					if (!this.open) return true; // Skip validation if open time is not set
					return timecompare(this.open, value, false);
				},
				message: "Closing time must be after opening time",
			},
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Cascade delete reservations when a MassageShop is deleted
MassageShopSchema.pre(
	"deleteOne",
	{ document: true, query: false },
	async function (next) {
		console.log(`Reservations being removed from massage shop ${this._id}`);
		await this.model("Reservation").deleteMany({ massageShop: this._id });
		next();
	}
);

// Reverse populate with virtuals
MassageShopSchema.virtual("reservations", {
	ref: "Reservation",
	localField: "_id",
	foreignField: "massageShop",
	justOne: false,
});

module.exports = mongoose.model("MassageShop", MassageShopSchema);
