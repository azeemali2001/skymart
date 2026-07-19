import {
  ArrowUp,
  Box,
  Cable,
  Gem,
  Lock,
  Mars,
  MoveRight,
  ShoppingBag,
  Star,
  StarIcon,
  Tag,
  Venus,
  Zap,
} from "lucide-react";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();

  const handleNaviagteWithFilter = (category) => {
    navigate(`/products/?category=${encodeURIComponent(category)}`);
  };

  const { cartItem, products } = useContext(ProductContext);
  const { loggedInUser } = useContext(AuthContext);

  const toalPrice = cartItem.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const categoryMapping = products.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const categoryIconMapping = {
    "men's clothing": Mars,
    "women's clothing": Venus,
    electronics: Cable,
    jewelery: Gem,
  };

  const topProduct = products
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 5);

  const lowestPriceProdcut = products
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);

  return (
    <div className="text-white flex flex-col gap-2 items-center justify-center p-10">
      {/* Main Hero */}
      <div
        style={{
          backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
        className="h-90 w-300 rounded-3xl flex items-center justify-between p-10 border-1 border-gray-400"
      >
        <div className="h-full flex flex-col gap-5">
          <p className="text-yellow-400">Good Afternoon</p>

          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-6xl">Welcome Back,</h1>
            <h1 className="font-bold text-5xl text-yellow-300">
              {loggedInUser.name}
            </h1>
          </div>

          <div className="flex-flex-col gap-1 text-gray-400 text-[15px]">
            <p>Discover today's picks — hand-curated products across</p>
            <p>electronics, fashion, and more.</p>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/products')} className="px-5 py-2 border bg-yellow-400 cursor-pointer rounded-2xl text-black hover:bg-yellow-900/30 hover:border-yellow-600 hover:text-yellow-300">
              Shop Now
            </button>
            <button onClick={() => navigate('/products')} className="px-5 py-2 rounded-2xl border">
              View All Product
            </button>
          </div>
        </div>
        <div className="h-full flex flex-col gap-8 items-center justify-center ">
          <div className="border-1 bg-yellow-900/30 border-yellow-600 px-5 py-2 flex flex-col gap-2 items-center justify-center rounded-2xl">
            <h2 className="text-yellow-600 text-4xl">20+</h2>
            <p className="tex-gray-900 text-[13px]">Products Available</p>
          </div>
          <div className="border-1 px-5 py-2 flex flex-col gap-2 items-center-justify-center rounded-2xl">
            <h1 className="text-4xl">Free</h1>
            <p className="tex-gray-900 text-[13px]">Delivery on 999+</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full px-8 py-2 flex justify-around items-center gap-4">
        <div className="p-5 w-[25%] h-[70%] flex items-start gap-4 border rounded-2xl">
          <div className="p-4 bg-yellow-900/40 flex items-center justify-center rounded-2xl">
            <Box color="#fffb06" />
          </div>
          <div className="content">
            <p className="text-bold text-2xl">{cartItem.length}</p>
            <p className="text-sm text-gray-400">Cart Items</p>
            <p className="text-xs text-gray-500">In your bag</p>
          </div>
        </div>
        <div className="p-5 w-[25%] h-[70%] flex items-start gap-4 border rounded-2xl">
          <div className="p-4 bg-blue-900/40 flex items-center justify-center rounded-2xl">
            <ArrowUp color="#061fff" />
          </div>
          <div className="content">
            <p className="text-bold text-2xl">${toalPrice}</p>
            <p className="text-sm text-gray-400">Cart Value</p>
            <p className="text-xs text-gray-500">Ready to checkout</p>
          </div>
        </div>
        <div className="p-5 w-[25%] h-[70%] flex items-start gap-4 border rounded-2xl">
          <div className="p-4 bg-orange-900/40 flex items-center justify-center rounded-2xl">
            <Star color="#ff8f06" />
          </div>
          <div className="content">
            <p className="text-bold text-2xl">5</p>
            <p className="text-sm text-gray-400">Top Products</p>
            <p className="text-xs text-gray-500">Highly rated</p>
          </div>
        </div>
        <div className="p-5 w-[25%] h-[70%] flex items-start gap-4 border rounded-2xl">
          <div className="p-4 bg-purple-900/40 flex items-center justify-center rounded-2xl">
            <Tag color="#6606ff" />
          </div>
          <div className="content">
            <p className="text-bold text-2xl">
              {Object.keys(categoryIconMapping).length}
            </p>
            <p className="text-sm text-gray-400">Categories</p>
            <p className="text-xs text-gray-500">To explore</p>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="w-full p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-bold text-xl">Shop by Category</h1>
          <p
            className="text-yellow-300 w-30 p-2 flex items-center justify-between cursor-pointer"
            onClick={() => navigate("/products")}
          >
            View All <MoveRight />
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-5">
          {Object.entries(categoryMapping).map((obj) => {
            const Icon = categoryIconMapping[obj[0]];

            return (
              <div
                key={obj[0]}
                onClick={() => handleNaviagteWithFilter(obj[0])}
                className="w-80 h-30 cursor-pointer hover:scale-105 bg-white flex flex-col items-center justify-center text-black rounded-2xl"
              >
                <Icon />

                <p className="text-xl">{obj[0]}</p>
                <p className="text-sm text-gray-600">{obj[1]} Items</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Rated */}
      <div className="flex w-full gap-20">
        <div className="border w-[50%] p-7 bg-white text-black rounded-3xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-28">
              <StarIcon fill="#ffe100" color="#ffe100" />
              <p className="font-bold">Top Rated</p>
            </div>
            <div className="flex items-center justify-between w-25 text-yellow-400 hover:text-yellow-200 cursor-pointer">
              <p>See All</p>
              <MoveRight />
            </div>
          </div>

          {topProduct.map((pro) => {
            return (
              <div
                key={pro.id}
                onClick={() => navigate(`/product/${pro.id}`)}
                className="cursor-pointer flex h-20 border border-gray-300 items-center justify-between p-3 rounded-xl hover:border-yellow-600"
              >
                <div className="flex gap-4">
                  <img width={20} src={pro.image} alt="" />
                  <p>${pro.price}</p>
                </div>
                <div className="p-2 rounded-3xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-300 transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:border-yellow-400">
                  <ShoppingBag size={20} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="border w-[50%] p-7 bg-white text-black rounded-3xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-33">
              <StarIcon fill="#ffe100" color="#ffe100" />
              <p className="font-bold">Lowest Price</p>
            </div>
            <div className="flex items-center justify-between w-25 text-yellow-400 hover:text-yellow-200 cursor-pointer">
              <p>See All</p>
              <MoveRight />
            </div>
          </div>

          {lowestPriceProdcut.map((pro) => {
            return (
              <div
                key={pro.id}
                onClick={() => navigate(`/product/${pro.id}`)}
                className="cursor-pointer flex h-20 border border-gray-300 items-center justify-between p-3 rounded-xl hover:border-yellow-600"
              >
                <div className="flex gap-4">
                  <img width={20} src={pro.image} alt="" />
                  <p>${pro.price}</p>
                </div>
                <div className="p-2 rounded-3xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-300 transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:border-yellow-400">
                  <ShoppingBag size={20} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tags */}

      <div className="flex gap-3 mt-4">
        <div className="border w-100 h-25 rounded-3xl p-5 flex items-center gap-3">
          <Zap color="#1f1ff5" />
          <div className="content">
            <p className="text-xl">Fast Delivery</p>
            <p className="text-xs text-gray-500">Same-day on select items</p>
          </div>
        </div>

        <div className="border w-100 h-25 rounded-3xl p-5 flex items-center gap-3">
          <Lock color="#f1f51f" />
          <div className="content">
            <p className="text-xl">Secure Payments</p>
            <p className="text-xs text-gray-500">100% encrypted checkout</p>
          </div>
        </div>

        <div className="border w-100 h-25 rounded-3xl p-5 flex items-center gap-3">
          <Tag color="#228e04" />
          <div className="content">
            <p className="text-xl">Best Prices</p>
            <p className="text-xs text-gray-500">Price-match guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
