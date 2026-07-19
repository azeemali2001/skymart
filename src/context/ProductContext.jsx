import axios from "axios";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");

      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,

        isSidebarOpen,
        setIsSidebarOpen,

      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
