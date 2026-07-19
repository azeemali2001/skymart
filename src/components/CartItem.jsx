import { Minus, Plus, Trash2 } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const CartItem = ({ product }) => {

  const { removeFromCart, decreaseQuantity, increaseQuantity} = useContext(AuthContext);


  return (
    <div className="flex gap-4 bg-[#1a1a1a] border border-gray-700 rounded-2xl p-4">
      {/* Product Image */}
      <div className="w-24 h-24 bg-white rounded-xl flex justify-center items-center p-2 shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-white font-semibold line-clamp-2">
            {product.title}
          </h2>

          <p className="text-xs text-yellow-400 uppercase mt-1">
            {product.category}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-xl font-bold text-yellow-400">
            ${product.price}
          </p>

          <button className="text-red-400 hover:text-red-300 cursor-pointer" onClick={() => removeFromCart(product.id)}>
            <Trash2 size={18} />
          </button>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-600 rounded-xl overflow-hidden">
            <button className="px-3 py-2 text-white hover:bg-gray-700" onClick={() => decreaseQuantity(product.id)}>
              <Minus size={16} />
            </button>

            <span className="px-4 text-white">{product.quantity}</span>

            <button className="px-3 py-2 text-white hover:bg-gray-700" onClick={() => increaseQuantity(product.id)}>
              <Plus size={16} />
            </button>
          </div>

          <p className="text-sm text-gray-400">
            Total:{" "}
            <span className="text-white font-semibold">
              ${(product.quantity * product.price).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;