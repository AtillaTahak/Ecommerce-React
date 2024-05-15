import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsStart } from '../features/products/productsSlice';
import { RootState } from '../app/store';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination.tsx';
import Filter from '../components/Filter.tsx';
import { filtersEnum } from '../utils/enums.ts';
import style from '../styles/product-list.module.css';
import SortProduct from '../components/SortProduct.tsx';
import CartItemsList from '../components/CartItemsList.tsx';
import Checkout from '../components/Checkout.tsx';

const ProductList = () => {
	const dispatch = useDispatch();
	const { filteredProducts, products, filters, loading } = useSelector((state: RootState) => state.products);
	const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 12 });

	useEffect(() => {
		dispatch(fetchProductsStart());
	}, [dispatch]);

	if (loading) return <p>Loading...</p>;

	return (
		<div className={style.content}>
			<div className={style.left}>
				<SortProduct />
				<Filter type={filtersEnum.brand} title={"Brands"} fields={products.map(product => product.brand)} filters={filters} />
				<Filter type={filtersEnum.model} title={"Models"} fields={products.map(product => product.model)} filters={filters} />
			</div>
			<div className={style.center}>
				<div className={style.productsList}>
					{filteredProducts
						.slice((pagination.currentPage - 1) * pagination.itemsPerPage, pagination.currentPage * pagination.itemsPerPage)
						.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</div>
				<div className={style.pagination}>
					<Pagination totalItems={filteredProducts.length} itemsPerPage={12} setPagination={setPagination} />
				</div>
			</div>
			<div className={style.right}>
				<CartItemsList />
				<Checkout />
			</div>
		</div>
	);
};

export default ProductList;
