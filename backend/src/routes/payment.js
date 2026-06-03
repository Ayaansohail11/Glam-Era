const router = require("express").Router();
const { createPaymentOrder, verifyPayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/auth");

router.use(protect);
router.post("/create-order", createPaymentOrder);
router.post("/verify", verifyPayment);

module.exports = router;
