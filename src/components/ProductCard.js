import "./ProductCard.css";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export const ProductCard = ({ product }) => {
  const { name, price, image, id } = product;
  const { addToCart, cartlist, removeFromCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  function handleAdd() {
    addToCart(product);
  }

  useEffect(() => {
    const productIsInCart = cartlist.find((cartItem) => cartItem.id === id);
    if (productIsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cartlist, id]);

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        {isInCart ? (
          <button
            onClick={() => removeFromCart(product)}
            style={{ backgroundColor: "red" }}
          >
            Remove
          </button>
        ) : (
          <button onClick={handleAdd}>Add To Cart</button>
        )}
      </div>
    </div>
  );
};
