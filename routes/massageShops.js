const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

const {
    getMassageShops,
    getMassageShop,
    createMassageShop,
    updateMassageShop,
    deleteMassageShop,
} = require("../controllers/massageShops");

// Re-route into other resource routers
router.use("/:shopId/reservations", require("./reservations"));

router
    .route("/")
    .get(protect, authorize("admin", "user"), getMassageShops)
    .post(protect, authorize("admin"), createMassageShop);
router
    .route("/:id")
    .get(protect, authorize("admin", "user"), getMassageShop)
    .put(protect, authorize("admin"), updateMassageShop)
    .delete(protect, authorize("admin"), deleteMassageShop);

module.exports = router;
