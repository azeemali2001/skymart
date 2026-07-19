import { LogOut, ShoppingCart, TruckElectric } from "lucide-react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { setIsSidebarOpen, cartItem } = useContext(ProductContext);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const openCart = () => {
    setIsSidebarOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <div className="border-y bg-black text-gray-400 flex justify-between items-center px-5 py-2 sticky top-0 z-30">
      <div className="flex justify-center items-center gap-5">
        <div className="flex justify-center items-center bg-yellow-400 text-black p-3 rounded-2xl">
          <TruckElectric />
        </div>
        <h2 className="text-2xl">
          Sky<span className="text-yellow-400">Mart</span>
        </h2>
      </div>
      <div className="flex justify-between items-center w-100">
        <NavLink
          to={"/"}
          style={({ isActive }) => ({
            color: isActive ? "#facc15" : "#9ca3af",
          })}
          className="font-semibold text-xl cursor-pointer hover:text-white"
        >
          Home
        </NavLink>
        <NavLink
          to={"/products"}
          style={({ isActive }) => ({
            color: isActive ? "#facc15" : "#9ca3af",
          })}
          className="font-semibold text-xl cursor-pointer hover:text-white"
        >
          Shop
        </NavLink>
        <NavLink
          to={"/about"}
          style={({ isActive }) => ({
            color: isActive ? "#facc15" : "#9ca3af",
          })}
          className="font-semibold text-xl cursor-pointer hover:text-white"
        >
          About
        </NavLink>
      </div>
      <div className="flex justify-center items-center gap-3 ">
        <div className="h-10 flex justify-center items-center border border-gray-500 px-2 py-1 rounded-xl gap-2 bg-[#1a1a1a] ">
          <p className="h-full w-8 flex justify-center items-center bg-yellow-400 text-black rounded-xl">
            {loggedInUser?.name?.slice(0, 1)}
          </p>
          <p>{loggedInUser?.name}</p>
        </div>
        <div
          onClick={openCart}
          className="relative h-10 w-12 flex justify-center items-center cursor-pointer border border-gray-500 rounded-xl text-lg hover:bg-amber-900/30 hover:border-amber-600 hover:text-amber-300"
        >
          {cartItem.length > 0 && (
            <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[11px] font-bold">
              {cartItem.length}
            </span>
          )}

          <ShoppingCart size={19} />
        </div>
        <div
          onClick={handleLogout}
          className=" h-10 w-12 flex items-center justify-center rounded-xl border border-gray-500  cursor-pointer hover:bg-red-900/30 hover:border-red-600 hover:text-red-300"
        >
          <LogOut size={20} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
