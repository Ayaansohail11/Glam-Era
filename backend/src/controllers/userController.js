const User = require("../models/User");

exports.getProfile = async (req, res) => {
  res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, avatar },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!(await user.matchPassword(currentPassword)))
      return res.status(400).json({ message: "Current password is incorrect" });

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (req.body.isDefault) user.addresses.forEach((a) => (a.isDefault = false));
    user.addresses.push(req.body);
    await user.save();
    res.status(201).json(user.addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses = user.addresses.filter((a) => a._id.toString() !== req.params.id);
    await user.save();
    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { productId } = req.body;
    const index = user.wishlist.indexOf(productId);
    if (index > -1) user.wishlist.splice(index, 1);
    else user.wishlist.push(productId);
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
