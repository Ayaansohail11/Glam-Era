import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { SlidersHorizontal, Grid3X3, List, X, ChevronDown } from "lucide-react";
import { products, categories } from "../data/products";
import { ProductCard } from "../components/ProductCard";

const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Newest", "Bestsellers", "Highest Rated"];
const priceRanges = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
  { label: "Above ₹2,000", min: 2000, max: Infinity },
];

export default function CollectionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("Relevance");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedPrice, setSelectedPrice] = useState<{ min: number; max: number } | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterExpanded, setFilterExpanded] = useState({ category: true, price: true });

  const search = searchParams.get("search") || "";
  const filterParam = searchParams.get("filter") || "";

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategory) list = list.filter(p => p.category === selectedCategory);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    if (filterParam === "bestseller") list = list.filter(p => p.isBestseller);
    if (selectedPrice) list = list.filter(p => p.price >= selectedPrice.min && p.price <= selectedPrice.max);
    switch (sort) {
      case "Price: Low to High": list.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": list.sort((a, b) => b.price - a.price); break;
      case "Newest": list = list.filter(p => p.isNew).concat(list.filter(p => !p.isNew)); break;
      case "Bestsellers": list = list.filter(p => p.isBestseller).concat(list.filter(p => !p.isBestseller)); break;
      case "Highest Rated": list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [selectedCategory, search, filterParam, selectedPrice, sort]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-secondary/30 border-b border-border py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }}>
            {selectedCategory || (filterParam === "bestseller" ? "Bestsellers" : search ? `Results for "${search}"` : "All Collections")}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">{filtered.length} products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all ${selectedCategory === cat.name ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
              >
                {cat.name}
              </button>
            ))}
            {selectedCategory && (
              <button onClick={() => setSelectedCategory("")} className="px-3 py-1.5 rounded-full text-sm border border-primary/30 text-primary flex items-center gap-1">
                <X size={12} /> Clear
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-sm border border-border rounded-full px-4 py-1.5 focus:outline-none focus:border-primary bg-white"
            >
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-1.5 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            <div className="flex border border-border rounded-full overflow-hidden">
              <button
                onClick={() => setView("grid")}
                className={`p-2 ${view === "grid" ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 ${view === "list" ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {filterOpen && (
            <aside className="w-56 shrink-0">
              {/* Category */}
              <div className="mb-6 border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 font-semibold text-sm text-foreground bg-secondary/30"
                  onClick={() => setFilterExpanded(e => ({ ...e, category: !e.category }))}
                >
                  Category <ChevronDown size={14} className={filterExpanded.category ? "rotate-180" : ""} />
                </button>
                {filterExpanded.category && (
                  <div className="p-3 space-y-2">
                    {categories.map(cat => (
                      <label key={cat.name} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat.name}
                          onChange={() => setSelectedCategory(cat.name)}
                          className="accent-primary"
                        />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-6 border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 font-semibold text-sm text-foreground bg-secondary/30"
                  onClick={() => setFilterExpanded(e => ({ ...e, price: !e.price }))}
                >
                  Price Range <ChevronDown size={14} className={filterExpanded.price ? "rotate-180" : ""} />
                </button>
                {filterExpanded.price && (
                  <div className="p-3 space-y-2">
                    {priceRanges.map(pr => (
                      <label key={pr.label} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="price"
                          checked={selectedPrice?.min === pr.min && selectedPrice?.max === pr.max}
                          onChange={() => setSelectedPrice({ min: pr.min, max: pr.max })}
                          className="accent-primary"
                        />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">{pr.label}</span>
                      </label>
                    ))}
                    {selectedPrice && (
                      <button onClick={() => setSelectedPrice(null)} className="text-xs text-primary mt-1">Clear price</button>
                    )}
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* Products */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground text-sm">Try adjusting your filters or search term.</p>
              </div>
            ) : (
              <div className={`grid gap-4 ${view === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}>
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
