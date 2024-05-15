import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { Product } from '../types/';
import { CartItem } from '../types/';
import styles from '../styles/product-detail.module.css';
import CartItemsList from '../components/CartItemsList';
import Checkout from '../components/Checkout';

const ProductDetail = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const { data: product, loading, error } = useFetch<Product>(`https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`);

	if (loading) return <p>Loading...</p>;
	if (error || !product) return <p>Error loading product details.</p>;

	const handleAddToCart = () => {
		const cartItem: CartItem = {
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: 1,
		};
		dispatch(addToCart(cartItem));
	};

	return (
		<div className={styles.productDetailsContainer}>
			<div className={styles.productDetailsContent}>
				<div>
					<img className={styles.productDetailsImage} src={product.image} alt={product.name} />
				</div>
				<div>
					<h1 className={styles.productDetailsName}>{product.name}</h1>
					<p className={styles.productDetailsPrice}>${product.price} ₺</p>
					<button className={styles.productDetailsButton} onClick={handleAddToCart}>Add to Cart</button>
					<p className={styles.productDetailsDescription}>{product.description}</p>

				</div>
			</div>
			<div className={styles.productDetailsWidget}>
				<CartItemsList />
				<Checkout />
			</div>
		</div>

	);
};

export default ProductDetail;
