import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const addToCart = (product) => {
    if (!loggedInUser) return;
    const alreadyExist = loggedInUser?.cartItems?.some(
      (item) => item.id === product.id,
    );

    let updatedCart;

    if (alreadyExist) {
      updatedCart = loggedInUser?.cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      updatedCart = [
        ...(loggedInUser.cartItems || []),
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    updateUser({
      ...loggedInUser,
      cartItems: updatedCart,
    });
  };

  const updateUser = (updatedUser) => {
    if (!loggedInUser) return;
    setLoggedInUser(updatedUser);

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    const db = JSON.parse(localStorage.getItem("dataDb")) || [];

    const updatedDb = db.map((user) =>
      user.email === updatedUser.email ? updatedUser : user,
    );

    localStorage.setItem("dataDb", JSON.stringify(updatedDb));
  };

  const increaseQuantity = (productId) => {
    if (!loggedInUser) return;
    const updatedCart = loggedInUser.cartItems.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    updateUser({
      ...loggedInUser,
      cartItems: updatedCart,
    });
  };

  const decreaseQuantity = (productId) => {
    if (!loggedInUser) return;
    const updatedCart = loggedInUser.cartItems
      .map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    updateUser({
      ...loggedInUser,
      cartItems: updatedCart,
    });
  };

  const removeFromCart = (productId) => {
    if (!loggedInUser) return;
    const updatedCart = loggedInUser.cartItems.filter(
      (item) => item.id !== productId,
    );

    updateUser({
      ...loggedInUser,
      cartItems: updatedCart,
    });
  };

  const clearCart = () => {
    if (!loggedInUser) return;
    updateUser({
      ...loggedInUser,
      cartItems: [],
    });
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoggedInUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
