const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [{ product: productId, quantity }] });
    } else {
      const item = cart.items.find((i) => i.product.toString() === productId);
      if (item) item.quantity += quantity;
      else cart.items.push({ product: productId, quantity });
      await cart.save();
    }

    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === req.params.productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    else item.quantity = quantity;

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
