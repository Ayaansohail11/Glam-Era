const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const { category, brand, search, filter, sort, page = 1, limit = 12 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (filter === "bestseller") query.isBestseller = true;
    if (filter === "new") query.isNew = true;
    if (search) query.name = { $regex: search, $options: "i" };

    const sortObj = sort === "price-asc" ? { price: 1 }
      : sort === "price-desc" ? { price: -1 }
      : sort === "rating" ? { rating: -1 }
      : { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(query).sort(sortObj).skip(skip).limit(Number(limit)),
      Product.countDocuments(query),
    ]);

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews.user", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) return res.status(400).json({ message: "Already reviewed" });

    product.reviews.push({ user: req.user._id, name: req.user.name, ...req.body });
    product.updateRating();
    await product.save();
    res.status(201).json({ message: "Review added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
