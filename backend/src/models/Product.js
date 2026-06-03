const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: [reviewSchema],
    reviewCount: { type: Number, default: 0 },
    image: { type: String, required: true },
    images: [String],
    category: { type: String, required: true },
    subcategory: { type: String },
    tags: [String],
    description: { type: String },
    isNew: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    stock: { type: Number, default: 100 },
  },
  { timestamps: true }
);

// Recalculate rating on save
productSchema.methods.updateRating = function () {
  if (this.reviews.length === 0) { this.rating = 0; return; }
  this.rating = this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length;
  this.reviewCount = this.reviews.length;
};

module.exports = mongoose.model("Product", productSchema);
