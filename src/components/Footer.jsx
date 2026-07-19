import { Copyright } from "lucide-react";

const Footer = () => {
  return (
    <div className="h-35 border-y bg-black text-gray-400 py-9 flex flex-col items-center justify-center gap-2">
        <div className="logo">
            <h1 className="text-yellow-400 text-2xl">SkyMart</h1>
        </div>
        <div className="text flex justify-center items-center gap-1">
            <Copyright size={17}/>2025 SkyMart • Built with React + Redux + TanStack Query
        </div>
    </div>
  );
};

export default Footer;