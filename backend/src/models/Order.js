const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  image: String,
  price: Number,
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    address: {
      name: String,
      phone: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
    },
    paymentMethod: { type: String, enum: ["card", "upi", "netbanking", "cod"], required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    status: {
      type: String,
      enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
    subtotal: Number,
    deliveryFee: Number,
    discount: { type: Number, default: 0 },
    total: Number,
    couponCode: String,
    estimatedDelivery: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
