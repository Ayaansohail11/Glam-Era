require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./src/models/User");
const Product = require("./src/models/Product");
const Cart = require("./src/models/Cart");
const Order = require("./src/models/Order");

const users = [
  {
    name: "Admin User",
    email: "admin@glaméra.com",
    password: "admin123",
    role: "admin",
    phone: "9876543210",
  },
  {
    name: "Ayaan Sohail",
    email: "ayaan@gmail.com",
    password: "test123",
    role: "user",
    phone: "9123456789",
  },
];

const products = [
  {
    name: "Matte Liquid Lipstick - Ruby Red",
    brand: "LuxeBeauty",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.5,
    reviewCount: 2847,
    image: "https://images.unsplash.com/photo-1586495777744-4e6b23aced2b?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4e6b23aced2b?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop&auto=format",
    ],
    category: "Makeup",
    subcategory: "Lips",
    tags: ["lipstick", "matte", "long-lasting"],
    description: "A bold, intensely pigmented matte liquid lipstick that stays put all day. Formulated with vitamin E for comfort.",
    isNew: false,
    isBestseller: true,
    inStock: true,
    stock: 150,
  },
  {
    name: "Rose Gold Highlighter Palette",
    brand: "GlowLab",
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    rating: 4.7,
    reviewCount: 1523,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop&auto=format"],
    category: "Makeup",
    subcategory: "Face",
    tags: ["highlighter", "palette", "shimmer"],
    description: "Six stunning shades from champagne to deep bronze. Buildable glow for every skin tone.",
    isNew: true,
    isBestseller: false,
    inStock: true,
    stock: 80,
  },
  {
    name: "Hyaluronic Acid Serum 2%",
    brand: "DermActiv",
    price: 649,
    originalPrice: 999,
    discount: 35,
    rating: 4.6,
    reviewCount: 4211,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format"],
    category: "Skincare",
    subcategory: "Serums",
    tags: ["serum", "hydration", "anti-aging"],
    description: "Deep hydration serum with 2% hyaluronic acid complex. Plumps and smooths skin in just 7 days.",
    isNew: false,
    isBestseller: true,
    inStock: true,
    stock: 200,
  },
  {
    name: "Vitamin C Brightening Cream",
    brand: "LumiSkin",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.4,
    reviewCount: 987,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format"],
    category: "Skincare",
    subcategory: "Moisturizers",
    tags: ["vitamin-c", "brightening", "moisturizer"],
    description: "Powerful brightening cream with 15% Vitamin C. Fades dark spots and evens skin tone overnight.",
    isNew: true,
    isBestseller: false,
    inStock: true,
    stock: 120,
  },
  {
    name: "Argan Oil Hair Mask",
    brand: "HairLux",
    price: 549,
    originalPrice: 799,
    discount: 31,
    rating: 4.3,
    reviewCount: 763,
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400&h=400&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&h=600&fit=crop&auto=format"],
    category: "Hair",
    subcategory: "Treatments",
    tags: ["hair-mask", "argan-oil", "repair"],
    description: "Intensive repair hair mask with pure Moroccan argan oil. Transforms dry, damaged hair to silky smooth.",
    isNew: false,
    isBestseller: false,
    inStock: true,
    stock: 90,
  },
  {
    name: "Floral Eau de Parfum",
    brand: "MaisonScent",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.8,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=400&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&h=600&fit=crop&auto=format"],
    category: "Fragrance",
    subcategory: "Perfumes",
    tags: ["perfume", "floral", "luxury"],
    description: "An opulent floral fragrance with notes of rose, jasmine and white musk. Long-lasting 8-10 hour wear.",
    isNew: true,
    isBestseller: true,
    inStock: true,
    stock: 50,
  },
  {
    name: "HD Foundation SPF 30",
    brand: "CoverGlow",
    price: 1099,
    originalPrice: 1499,
    discount: 27,
    rating: 4.5,
    reviewCount: 2134,
    image: "https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400&h=400&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=600&h=600&fit=crop&auto=format"],
    category: "Makeup",
    subcategory: "Face",
    tags: ["foundation", "SPF", "coverage"],
    description: "Full-coverage HD foundation with SPF 30. Available in 40 shades for seamless skin matching.",
    isNew: false,
    isBestseller: true,
    inStock: true,
    stock: 175,
  },
  {
    name: "Retinol Night Repair Serum",
    brand: "DermActiv",
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.6,
    reviewCount: 891,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&h=400&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&h=600&fit=crop&auto=format"],
    category: "Skincare",
    subcategory: "Serums",
    tags: ["retinol", "anti-aging", "night"],
    description: "Advanced retinol formula for overnight skin renewal. Reduces fine lines and wrinkles in 4 weeks.",
    isNew: true,
    isBestseller: false,
    inStock: true,
    stock: 110,
  },
  {
    name: "Volumizing Mascara",
    brand: "LuxeBeauty",
    price: 599,
    originalPrice: 899,
    discount: 33,
    rating: 4.4,
    reviewCount: 1876,
    image: "https://images.unsplash.com/photo-1631214524020-3c69b3b6e2e4?w=400&h=400&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1631214524020-3c69b3b6e2e4?w=600&h=600&fit=crop&auto=format"],
    category: "Makeup",
    subcategory: "Eyes",
    tags: ["mascara", "volumizing", "lengthening"],
    description: "Dramatic volume and length in one coat. Smudge-proof formula lasts all day.",
    isNew: true,
    isBestseller: true,
    inStock: true,
    stock: 200,
  },
  {
    name: "Niacinamide 10% + Zinc Serum",
    brand: "DermActiv",
    price: 499,
    originalPrice: 799,
    discount: 38,
    rating: 4.7,
    reviewCount: 5320,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop&auto=format"],
    category: "Skincare",
    subcategory: "Serums",
    tags: ["niacinamide", "pores", "oily-skin"],
    description: "Reduces pore appearance and controls excess sebum. Ideal for oily and combination skin.",
    isNew: false,
    isBestseller: true,
    inStock: true,
    stock: 300,
  },
  {
    name: "Keratin Smooth Shampoo",
    brand: "HairLux",
    price: 449,
    originalPrice: 649,
    discount: 31,
    rating: 4.2,
    reviewCount: 634,
    image: "https://images.unsplash.com/photo-1585232350544-7737eb83ad7a?w=400&h=400&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1585232350544-7737eb83ad7a?w=600&h=600&fit=crop&auto=format"],
    category: "Hair",
    subcategory: "Shampoo",
    tags: ["keratin", "smooth", "frizz-control"],
    description: "Keratin-infused shampoo that tames frizz and adds brilliant shine. Sulfate-free formula.",
    isNew: false,
    isBestseller: false,
    inStock: true,
    stock: 140,
  },
  {
    name: "Rose Body Butter",
    brand: "PureGlow",
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.5,
    reviewCount: 892,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop&auto=format"],
    category: "Bath & Body",
    subcategory: "Moisturizers",
    tags: ["body-butter", "rose", "moisturizing"],
    description: "Rich, luxurious body butter infused with rose extract and shea butter. 24-hour deep moisture.",
    isNew: true,
    isBestseller: false,
    inStock: true,
    stock: 95,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Cart.deleteMany({}),
      Order.deleteMany({}),
    ]);
    console.log("🗑️  Cleared existing data");

    // Seed users
    const createdUsers = await User.insertMany(
      await Promise.all(users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10),
      })))
    );
    console.log(`👤 Created ${createdUsers.length} users`);

    // Seed products
    const createdProducts = await Product.insertMany(products);
    console.log(`🛍️  Created ${createdProducts.length} products`);

    console.log("\n✅ Seed complete!");
    console.log("─────────────────────────────");
    console.log("Test accounts:");
    console.log("  Admin  → admin@glaméra.com  / admin123");
    console.log("  User   → ayaan@gmail.com    / test123");
    console.log("─────────────────────────────");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
