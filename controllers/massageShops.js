const MassageShop = require("../models/MassageShop");

// @desc	Get all massage shops
// @route	GET /api/v1/shops
// @access	Public
exports.getMassageShops = async (req, res, next) => {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // console.log(reqQuery);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    // Finding resource
    query = MassageShop.find(JSON.parse(queryStr)).populate("reservations");
    // query = MassageShop.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    if (limit < 1) {
        limit = 1;
    }
    if (page < 1) {
        page = 1;
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    try {
        const total = await MassageShop.countDocuments();

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const massageShops = await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }

        query = MassageShop.find(JSON.parse(queryStr));

        res.status(200).json({
            success: true,
            count: massageShops.length,
            pagination,
            data: massageShops,
        });
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({
            success: false,
            error: "cannot get massage shops",
        });
    }
};

// @desc	Get single massage shop
// @route	GET /api/v1/shops/:id
// @access	Public
exports.getMassageShop = async (req, res, next) => {
    try {
        const massageShop = await MassageShop.findById(req.params.id).populate(
            "reservations"
        );

        if (!massageShop) {
            return res
                .status(404)
                .json({ success: false, error: "massage shop not found" });
        }

        res.status(200).json({ success: true, data: massageShop });
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({
            success: false,
            error: "cannot get massage shop",
        });
    }
};

// @desc	Create new massage shop
// @route	POST /api/v1/shops
// @access	Private
exports.createMassageShop = async (req, res, next) => {
    try {
        const massageShop = await MassageShop.create(req.body);
        res.status(201).json({
            success: true,
            data: massageShop,
        });
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({
            success: false,
            error: "cannot create massage shop",
        });
    }
};

// @desc	Update massage shop
// @route	PUT /api/v1/shops/:id
// @access	Private
exports.updateMassageShop = async (req, res, next) => {
    try {
        const massageShop = await MassageShop.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!massageShop) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: massageShop });
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({
            success: false,
            error: "cannot update massage shop",
        });
    }
};

// @desc	Delete massage shop
// @route	DELETE /api/v1/shops/:id
// @access	Private
exports.deleteMassageShop = async (req, res, next) => {
    try {
        const massageShop = await MassageShop.findById(req.params.id);

        if (!massageShop) {
            return res
                .status(400)
                .json({ success: false, error: "massage shop not found" });
        }

        await massageShop.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({
            success: false,
            error: "cannot delete massage shop",
        });
    }
};
