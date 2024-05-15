import { useSelector } from "react-redux"
import styles from '../styles/cart-items-list.module.css'
import { RootState } from "../app/store"
import CartItem from "./CartItem"


const CartItemsList = () => {
	const cartItems = useSelector((state: RootState) => state.cart.items);

	return (
		<div className={styles.cartList}>
			<div>
				<h3 className={styles.cartListTitle}>Cart</h3>
			</div>
			<div className={styles.cartListContent}>
				{cartItems.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<div className={styles.cartListContentItems}>
						{cartItems.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</div>
				)}
			</div>


		</div>
	)
}

export default CartItemsList
