import { ShoppingCart, Star, Check } from "lucide-react";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router";

const Product = ({ product }) => {
  const { cartItem, setIsSidebarOpen, setCartItem } =
    useContext(ProductContext);

  const handleAddToCart = () => {
    setIsSidebarOpen(true);
    const already = cartItem.some((item) => {
      return item.id === product.id;
    });

    if (!already) {
      setCartItem((pre) => [...pre, { ...product, quantity: 1 }]);
    } else {
      setCartItem((pre) =>
        pre.map((obj) =>
          obj.id === product.id ? { ...obj, quantity: obj.quantity + 1 } : obj,
        ),
      );
    }

    console.log(cartItem);
  };

  const isAddedInCart = cartItem.some((item) => item.id === product.id);

  return (
    <div className="w-72 bg-[#1a1a1a] border border-gray-700 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10">
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="h-60 bg-white p-6 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category */}
        <span className="text-xs uppercase tracking-wide text-yellow-400 font-semibold">
          {product.category}
        </span>

        {/* Title */}
        <h2 className="text-white font-semibold text-lg mt-2 line-clamp-2">
          {product.title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm mt-2 line-clamp-3 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1">
            <Star size={18} className="fill-yellow-400 text-yellow-400" />
            <span className="text-white font-medium">
              {product.rating.rate}
            </span>

            <span className="text-gray-500 text-sm">
              ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <h3 className="text-2xl font-bold text-yellow-400">
            ${product.price}
          </h3>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          className={`mt-5 flex items-center justify-center gap-2  text-black font-semibold py-3 rounded-xl ${isAddedInCart ? "bg-lime-400 hover:bg-lime-300" : "bg-yellow-400 hover:bg-yellow-300"} transition-colors cursor-pointer`}
        >
          {isAddedInCart ? (
            <>
              <Check size={18} />
              Item Added{" "}
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Product;
