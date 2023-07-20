import { useTitle } from "../hooks/useTitle";
import { CartCard } from "../components";
import { useCart } from "../context/CartContext";

export const Cart = () => {
  useTitle("Cart");
  const { total, cartlist } = useCart();

  return (
    <main>
      <section className="cart">
        <h1>
          Cart Items: {cartlist.length} / ${total}
        </h1>
        {cartlist.map((product) => (
          <CartCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};
