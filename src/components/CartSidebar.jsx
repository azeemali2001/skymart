import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { MoveRight, ShoppingBag, X } from "lucide-react";
import CartItem from "./CartItem";

const CartSidebar = () => {
  const { setIsSidebarOpen, isSidebarOpen, cartItem } =
    useContext(ProductContext);

  const totalAmount = cartItem.reduce((acc, item) => {
    return item.quantity * item.price + acc;
  }, 0);

  return (
    <>
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 
        ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <div
        className={`flex flex-col fixed top-0 right-0 h-screen w-105 bg-[#111] border-l border-gray-700 z-50 transition-transform duration-700
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className="px-5 border-y py-7 flex items-center justify-between gap text-white">
          <div className="flex items-center justify-around gap-5">
            <ShoppingBag color="#f6e05e" />
            <h1 className="text-2xl">Cart</h1>
            <p className="px-2 py-0.5 rounded-4xl text-yellow-800 bg-amber-100">
              {cartItem.length} Items
            </p>
          </div>
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="cursor-pointer"
          >
            <X />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItem.map((item) => {
            return <CartItem key={item.id} product={item} />;
          })}
        </main>

        <div className="px-5 py-7 border-y text-white flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="cursor-pointer flex gap-5 justify-center items-center bg-yellow-400 px-5 py-3 text-black rounded-3xl hover:bg-amber-200"
          >
            <p className="text-2xl">
              {cartItem.length > 0 ? "CheckOut" : "Browse More Porduct"}
            </p>
            <MoveRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
