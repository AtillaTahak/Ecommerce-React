import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import CartItem from './CartItem';
import { clearCart } from '../features/cart/cartSlice';

const CartSummary = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-summary">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <button onClick={handleClearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
