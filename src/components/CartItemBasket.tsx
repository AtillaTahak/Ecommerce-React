import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ReactComponent as BagIcon } from '../assets/Bag.svg';
import styles from '../styles/cart-item-basket.module.css';
import { useNavigate } from 'react-router-dom';


const CartItemBasket = () => {
	const navigate = useNavigate();
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
	<div className={styles.bag} onClick={()=>navigate('/cart')}>
		<BagIcon className={styles.bagIcon} />
		<span>{totalAmount} ₺</span>
	</div>
  )
}

export default CartItemBasket
