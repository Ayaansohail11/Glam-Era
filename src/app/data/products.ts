export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  tags: string[];
  description: string;
  isNew: boolean;
  isBestseller: boolean;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Matte Liquid Lipstick - Ruby Red",
    brand: "LuxeBeauty",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.5,
    reviews: 2847,
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
  },
  {
    id: "p2",
    name: "Rose Gold Highlighter Palette",
    brand: "GlowLab",
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    rating: 4.7,
    reviews: 1523,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop&auto=format",
    ],
    category: "Makeup",
    subcategory: "Face",
    tags: ["highlighter", "palette", "shimmer"],
    description: "Six stunning shades from champagne to deep bronze. Buildable glow for every skin tone.",
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
  {
    id: "p3",
    name: "Hyaluronic Acid Serum 2%",
    brand: "DermActiv",
    price: 649,
    originalPrice: 999,
    discount: 35,
    rating: 4.6,
    reviews: 4211,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format",
    ],
    category: "Skincare",
    subcategory: "Serums",
    tags: ["serum", "hydration", "anti-aging"],
    description: "Deep hydration serum with 2% hyaluronic acid complex. Plumps and smooths skin in just 7 days.",
    isNew: false,
    isBestseller: true,
    inStock: true,
  },
  {
    id: "p4",
    name: "Vitamin C Brightening Cream",
    brand: "LumiSkin",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.4,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format",
    ],
    category: "Skincare",
    subcategory: "Moisturizers",
    tags: ["vitamin-c", "brightening", "moisturizer"],
    description: "Powerful brightening cream with 15% Vitamin C. Fades dark spots and evens skin tone overnight.",
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
  {
    id: "p5",
    name: "Argan Oil Hair Mask",
    brand: "HairLux",
    price: 549,
    originalPrice: 799,
    discount: 31,
    rating: 4.3,
    reviews: 763,
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&h=600&fit=crop&auto=format",
    ],
    category: "Hair",
    subcategory: "Treatments",
    tags: ["hair-mask", "argan-oil", "repair"],
    description: "Intensive repair hair mask with pure Moroccan argan oil. Transforms dry, damaged hair to silky smooth.",
    isNew: false,
    isBestseller: false,
    inStock: true,
  },
  {
    id: "p6",
    name: "Floral Eau de Parfum",
    brand: "MaisonScent",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.8,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&h=600&fit=crop&auto=format",
    ],
    category: "Fragrance",
    subcategory: "Perfumes",
    tags: ["perfume", "floral", "luxury"],
    description: "An opulent floral fragrance with notes of rose, jasmine and white musk. Long-lasting 8-10 hour wear.",
    isNew: true,
    isBestseller: true,
    inStock: true,
  },
  {
    id: "p7",
    name: "HD Foundation SPF 30",
    brand: "CoverGlow",
    price: 1099,
    originalPrice: 1499,
    discount: 27,
    rating: 4.5,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=600&h=600&fit=crop&auto=format",
    ],
    category: "Makeup",
    subcategory: "Face",
    tags: ["foundation", "SPF", "coverage"],
    description: "Full-coverage HD foundation with SPF 30. Available in 40 shades for seamless skin matching.",
    isNew: false,
    isBestseller: true,
    inStock: true,
  },
  {
    id: "p8",
    name: "Retinol Night Repair Serum",
    brand: "DermActiv",
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.6,
    reviews: 891,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&h=600&fit=crop&auto=format",
    ],
    category: "Skincare",
    subcategory: "Serums",
    tags: ["retinol", "anti-aging", "night"],
    description: "Advanced retinol formula for overnight skin renewal. Reduces fine lines and wrinkles in 4 weeks.",
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
];

export const categories = [
  { name: "Makeup", icon: "💄", count: 1240, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop&auto=format" },
  { name: "Skincare", icon: "✨", count: 890, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop&auto=format" },
  { name: "Hair", icon: "💇", count: 560, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop&auto=format" },
  { name: "Fragrance", icon: "🌸", count: 320, image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop&auto=format" },
  { name: "Bath & Body", icon: "🛁", count: 410, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&h=300&fit=crop&auto=format" },
  { name: "Wellness", icon: "🧘", count: 230, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop&auto=format" },
];
