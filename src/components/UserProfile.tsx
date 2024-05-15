import { ReactComponent as ProfileIcon } from '../assets/Profile.svg';
import styles from '../styles/profile.module.css';


const CartItemBasket = () => {
  return (
	<div className={styles.user}>
		<ProfileIcon className={styles.userIcon} />
		<span>Kerem</span>
	</div>
  )
}

export default CartItemBasket
