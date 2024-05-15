import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, addToCart } from '../features/cart/cartSlice';
import { CartItem } from '../types';
import style from '../styles/cart-item.module.css';

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    dispatch(updateQuantity({ id: item.id, quantity }));
  };
  const addToCartItem = () => {
	const cartItem: CartItem = {
		id: item.id,
		name: item.name,
		price: item.price,
		quantity: 1,
	  };
	  dispatch(addToCart(cartItem));
  }
  const removeFromCartItem = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1}));
  }

  return (
    <div className={style.cartItem}>
		<div className={style.cartContentText}>
			<span>{item.name}</span>
			<p>{item.price} ₺</p>
		</div>
		<div className={style.cartContent}>
			<button onClick={addToCartItem}>+</button>
			<input type="number" value={item.quantity} onChange={handleQuantityChange} min="1" />
			<button onClick={removeFromCartItem}>-</button>
		</div>
    </div>
  );
};

export default CartItemComponent
