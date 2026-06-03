const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const options = {
      amount: order.total * 100, // paise
      currency: "INR",
      receipt: `receipt_${orderId}`,
    };

    const paymentOrder = await razorpay.orders.create(options);
    order.razorpayOrderId = paymentOrder.id;
    await order.save();

    res.json({
      razorpayOrderId: paymentOrder.id,
      amount: paymentOrder.amount,
      currency: paymentOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature)
      return res.status(400).json({ message: "Payment verification failed" });

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      razorpayPaymentId,
      status: "confirmed",
    });

    res.json({ message: "Payment verified", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
