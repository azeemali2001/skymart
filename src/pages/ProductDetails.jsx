import { useContext } from "react";
import { Link, useParams } from "react-router";
import {
  Star,
  ShoppingCart,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { ProductContext } from "../context/ProductContext";
import Product from "../components/Product";

const ProductDetails = () => {
  const { id } = useParams();

  const { products, cartItem, setCartItem, setIsSidebarOpen } =
    useContext(ProductContext);

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-white text-3xl">
        Product Not Found
      </div>
    );
  }

  const similarProducts = products.filter(
    (item) =>
      item.category === product.category && item.id !== product.id
  );

  const isAddedInCart = cartItem.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    setIsSidebarOpen(true);

    if (!isAddedInCart) {
      setCartItem((prev) => [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 text-white">

      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>

        <ChevronRight size={15} />

        <Link to="/products" className="hover:text-yellow-400">
          Shop
        </Link>

        <ChevronRight size={15} />

        <span className="text-yellow-400 capitalize">
          {product.category}
        </span>
      </div>

      {/* Product */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Image */}

        <div className="bg-white rounded-3xl flex justify-center items-center p-8 shadow-lg">
          <img
            src={product.image}
            alt={product.title}
            className="h-95 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details */}

        <div className="flex flex-col">

          <span className="text-sm uppercase tracking-wider text-yellow-400 font-semibold">
            {product.category}
          </span>

          <h1 className="text-3xl lg:text-4xl font-bold mt-3 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mt-5">
            <Star
              size={20}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="font-semibold text-lg">
              {product.rating.rate}
            </span>

            <span className="text-gray-400">
              • {product.rating.count} Reviews
            </span>
          </div>

          <h2 className="text-4xl font-bold text-yellow-400 mt-6">
            ${product.price}
          </h2>

          <p className="mt-6 text-gray-300 leading-7">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className={`mt-8 py-4 rounded-2xl flex justify-center items-center gap-3 text-lg font-semibold transition-colors cursor-pointer
            ${
              isAddedInCart
                ? "bg-lime-400 text-black hover:bg-lime-300"
                : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >
            {isAddedInCart ? (
              <>
                <Check size={20} />
                Item Added
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Add To Cart
              </>
            )}
          </button>

          {/* Features */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">

            <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-4">
              <Truck className="text-yellow-400 mb-3" />

              <h3 className="font-semibold">
                Free Delivery
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Orders above $100
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-4">
              <RotateCcw className="text-yellow-400 mb-3" />

              <h3 className="font-semibold">
                Easy Return
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                30 Days Return Policy
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-4">
              <ShieldCheck className="text-yellow-400 mb-3" />

              <h3 className="font-semibold">
                Secure Payment
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                100% Protected Checkout
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Similar Products */}

      {similarProducts.length > 0 && (
        <div className="mt-20">

          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Similar Products
            </h2>

            <p className="text-gray-400 mt-2">
              More products from{" "}
              <span className="text-yellow-400">
                {product.category}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {similarProducts.map((item) => (
              <Product
                key={item.id}
                product={item}
              />
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default ProductDetails;