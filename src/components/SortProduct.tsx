import { useDispatch } from "react-redux"
import { fetchSortProductsStart } from "../features/products/productsSlice"
import styles from '../styles/sort.module.css'


const SortProduct = () => {

	const dispatch = useDispatch()
	const onHandleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(fetchSortProductsStart({type: e.target.value}))
	}
  return (
	<div className={styles.sort}>
		<div>
			<h3 className={styles.sortTitle}>Sort By</h3>
		</div>
		<div className={styles.sortContent}>
			<div className={styles.sortItems}>
				<div className={styles.sortItem}>
					<input type="radio" value="sortOldest" name="sort" id="sortOldest" onChange={onHandleSort}/>
					<label htmlFor="sortOldest">Old to new</label>
				</div>
				<div className={styles.sortItem}>
					<input type="radio" value="sortNewest" name="sort" id="sortNewest" onChange={onHandleSort}/>
					<label htmlFor="sortNewest">New to old</label>
				</div>
				<div className={styles.sortItem}>
					<input type="radio" value="priceHigh" name="sort" id="priceHigh" onChange={onHandleSort}/>
					<label htmlFor="priceHigh">Price hight to low</label>
				</div>
				<div className={styles.sortItem}>
					<input type="radio" value="priceLow" name="sort" id="priceLow" onChange={onHandleSort}/>
					<label htmlFor="priceLow">Price low to hight</label>
				</div>
			</div>
		</div>
	</div>
  )
}

export default SortProduct
