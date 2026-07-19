import { Outlet } from "react-router";
import CartSidebar from "../components/CartSidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default MainLayout;
