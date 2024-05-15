import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import styles from '../styles/check-out.module.css';


const CartItemBasket = () => {
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
	<div className={styles.checkOut}>
		<div>
			<span className={styles.checkOutTitle}>Checkout</span>
		</div>
		<div className={styles.checkOutContent}>
			<div className={styles.checkOutContentItems}>
				<span>Total Price: </span>
				<p>{totalAmount} ₺</p>
			</div>
			<button className={styles.checkOutButton}>Checkout</button>
		</div>
	</div>
  )
}

export default CartItemBasket
