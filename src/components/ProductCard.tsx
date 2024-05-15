import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { CartItem , Product } from '../types/';
import style from '../styles/product-card.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className={style.productCart}>
      <img src={product.image} alt={product.name} onClick={() => navigate(`/products/${product.id}`)} />
	  <p className={style.productPrice}>{product.price}  ₺</p>
      <h3 className={style.productTitle}>{product.name}</h3>
      <button className={style.productButton} onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
