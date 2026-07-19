import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import Product from "../components/Product";
import { X, Search } from "lucide-react";
import { useSearchParams } from "react-router";

const Shop = () => {
  const { products } = useContext(ProductContext);

  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("Featured");

  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategory = searchParams.get("category") || "All Categories";
 
  const isFilterApplied =
    searchText !== "" || paramCategory !== "All Categories" || sortBy !== "Featured";

  const handleClearFilters = () => {
    setSearchText("");
    setSortBy("Featured");
    setSearchParams({});
  };

  let visibleProducts = [...products];

  visibleProducts = visibleProducts.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (paramCategory  !== "All Categories") {
    visibleProducts = visibleProducts.filter(
      (product) => product.category === paramCategory ,
    );
  }

  if (sortBy === "Price: Low to High") {
    visibleProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "Price: High to Low") {
    visibleProducts.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "Highest Rated") {
    visibleProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  return (
    <>
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-white text-5xl">All Products</h1>
        <p className="text-gray-400">{visibleProducts.length} product found</p>

        <div className="border border-gray-600 rounded-3xl p-5 flex flex-col items-center lg:flex-row gap-5">
          {/* Search */}
          <div className="flex-1 flex items-center bg-[rgb(26,26,26)] border border-gray-700 focus-within:border-lime-400 rounded-2xl px-5 h-14 transition-colors">
            <Search size={20} className="text-gray-500" />

            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent outline-none text-white px-4"
            />
          </div>

          {/* Category */}
          <select
            value={paramCategory}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "All Categories") {
                setSearchParams({});
              } else {
                setSearchParams({ category: value });
              }
            }}
            className="bg-[#1a1a1a] focus:border-lime-400 border border-gray-700 rounded-2xl px-5 h-14 text-white min-w-55 outline-none"
          >
            <option value="All Categories">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1a1a1a] border focus:border-lime-400 rounded-2xl px-5 h-14 text-white min-w-55 outline-none"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Highest Rated</option>
          </select>
          {isFilterApplied && (
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 flex items-center justify-center gap-2 rounded-2xl border border-red-600 bg-red-900/20 text-red-300 hover:bg-red-900/40 hover:border-red-500 hover:text-red-200 transition-all duration-200 cursor-pointer"
            >
              <X size={10} /> Clear
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-5">
        {visibleProducts.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};

export default Shop;
