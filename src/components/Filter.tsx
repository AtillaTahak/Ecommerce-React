import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../features/products/productsSlice";
import { Filters } from "../types";
import { filtersEnum } from "../utils/enums";
import { removeDuplicate } from "../utils/duplicateHelpers";
import styles from '../styles/filter.module.css';
import { ReactComponent as SearchIcon } from '../assets/Search.svg';

type Props = {
	type: filtersEnum;
	title: string;
	fields : string[];
	filters: Filters;
}

const Filter = (props: Props) => {
	let [newFields, setNewFields] = useState<string[]>(removeDuplicate(props.fields))
	const dispatch = useDispatch();

	const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputQuery = e.target.value;
		setNewFields(removeDuplicate(props.fields).filter((field) => field.toLowerCase().includes(inputQuery.toLowerCase())));
		if(inputQuery === ""){
			setNewFields(removeDuplicate(props.fields))
		}
	}

	const onHandleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target.value;
		if (e.target.checked) {
			dispatch(addFilter({ filterType: props.type, value: field }))
		} else {
			dispatch(removeFilter({ filterType: props.type, value: field }))
		}
	}
	return (
		<div className={styles.filter}>
			<h3 className={styles.filterTitle}>{props.title}</h3>
			<div className={styles.filterContent}>
				<div className={styles.filterSearch}>
					<div className={styles.iconWrapper}>
						<SearchIcon className={styles.searchIcon}/>
					</div>
					<input className={styles.searchInput} type="text" placeholder="Search" onChange={onHandleChange}/>
				</div>
				<div className={styles.filterItems}>
					{newFields.map((field, index) =>{
						if(props.filters[props.type].includes(field)){
							return <div className={styles.filterItem} key={index}>
								<input type="checkbox" value={field} checked onChange={onHandleCheckBox}/>
								<label>{field}</label>
							</div>
						}else{
							return <div className={styles.filterItem} key={index}>
								<input type="checkbox" value={field} onChange={onHandleCheckBox}/>
								<label>{field}</label>
							</div>
						}
					})}
				</div>
			</div>
		</div>
	)
}

export default Filter
