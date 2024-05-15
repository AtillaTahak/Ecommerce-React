import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addFilter,removeFilter } from '../features/products/productsSlice';
import { filtersEnum } from '../utils/enums';
import styles from '../styles/search-bar.module.css';
import { ReactComponent as SearchIcon } from '../assets/Search.svg';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isMobileInputVisible, setIsMobileInputVisible] = useState(false);
  const dispatch = useDispatch();
  const searchBarRef = useRef<HTMLDivElement>(null);


  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
	setQuery(e.target.value);
	if(e.target.value === ""){
		dispatch(removeFilter({ filterType: filtersEnum.name, value: query }));
	}else {
		dispatch(addFilter({ filterType: filtersEnum.name, value: query }));
	}
  };
  const handleIconClick = () => {
    setIsMobileInputVisible(!isMobileInputVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setIsMobileInputVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchBarRef}
      className={`${styles.searchBar} ${isMobileInputVisible ? styles.expanded : ''}`}
    >
      <div className={`${styles.iconWrapper} ${styles.iconInside}`} onClick={handleIconClick}>
        <SearchIcon className={styles.searchIcon} />
      </div>
      <input
        type="text"
        className={`${styles.searchInput} ${isMobileInputVisible ? styles.show : ''}`}
        placeholder="Search..."
        value={query}
        onChange={handleOnchange}
      />
    </div>
  );
};

export default SearchBar;
