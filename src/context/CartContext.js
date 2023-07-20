import { useReducer } from "react";
import { createContext, useContext } from "react";
import { cartReducer } from "../reducer/cartReducer";

const initialState = {
  cartlist: [],
  total: 0,
};

const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    const updatedCart = state.cartlist.concat(product);
    updateTotal(updatedCart);
    dispatch({
      type: "ADD_TO_CART",
      payload: { products: updatedCart },
    });
  };

  const removeFromCart = (product) => {
    const updatedCart = state.cartlist.filter(
      (current) => current.id !== product.id
    );
    updateTotal(updatedCart);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { products: updatedCart },
    });
  };

  const updateTotal = (products) => {
    let total = 0;
    products.forEach((product) => (total = total + product.price));
    dispatch({
      type: "UPDATE_TOTAL",
      payload: { total },
    });
  };

  const value = {
    cartlist: state.cartlist,
    total: state.total,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
