const Order = require("../models/Order");
const Cart = require("../models/Cart");

const COUPONS = { GLAM20: 20, SAVE10: 10, FIRST15: 15 };

exports.createOrder = async (req, res) => {
  try {
    const { address, paymentMethod, couponCode } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const subtotal = cart.items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const deliveryFee = subtotal >= 999 ? 0 : 99;
    const discountPct = couponCode ? COUPONS[couponCode.toUpperCase()] || 0 : 0;
    const discount = Math.round((subtotal * discountPct) / 100);
    const total = subtotal + deliveryFee - discount;

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((i) => ({
        product: i.product._id,
        name: i.product.name,
        image: i.product.image,
        price: i.product.price,
        quantity: i.quantity,
      })),
      address,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
      subtotal,
      deliveryFee,
      discount,
      total,
      couponCode: couponCode?.toUpperCase(),
      estimatedDelivery,
    });

    // Clear cart after order
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product", "name image");
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    if (!["placed", "confirmed"].includes(order.status))
      return res.status(400).json({ message: "Order cannot be cancelled" });

    order.status = "cancelled";
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
