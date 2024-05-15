import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from '../../types/';
import { filterProducts } from '../../utils/filterHelpers';

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  loading: false,
  filters: {
    brand: [],
    model: [],
    name: '',
  },
};

type Strategy = (products: Product[]) => Product[];

const strategies: Record<string, Strategy> = {
  sortOldest: (products) => [...products].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
  sortNewest: (products) => [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  priceLow: (products) => [...products].sort((a, b) => a.price - b.price),
  priceHigh: (products) => [...products].sort((a, b) => b.price - a.price),
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
	  fetchSortProductsStart(state, action: PayloadAction<{ type: string }>) {
		state.loading = false;
		const strategy = strategies[action.payload.type];
		if (strategy) {
		  state.filteredProducts = strategy(state.products);
		}
	  },
	  fetchProductsStart(state) {
		state.loading = true;
	  },
	  fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
		state.products = action.payload;
		state.filteredProducts = filterProducts(action.payload, {...state.filters});
		state.loading = false;
	  },
	  fetchProductsFailure(state) {
		state.loading = false;
	  },
	  addFilter(state, action: PayloadAction<{ filterType: keyof typeof state.filters; value: string }>) {
		const { filterType, value } = action.payload;

		if (filterType === 'brand' || filterType === 'model') {
		  if (!state.filters[filterType].includes(value)) {
			state.filters[filterType] = [...state.filters[filterType], value];
		  }
		} else if (filterType === 'name') {
		  state.filters[filterType] = value;
		}

		state.filteredProducts = filterProducts(state.products, {...state.filters});
	  },
	  removeFilter(state, action: PayloadAction<{ filterType: keyof typeof state.filters; value: string }>) {
		const { filterType, value } = action.payload;

		if (filterType === 'brand' || filterType === 'model') {
		  state.filters[filterType] = state.filters[filterType].filter(item => item !== value);
		} else if (filterType === 'name') {
		  state.filters[filterType] = '';
		}

		state.filteredProducts = filterProducts(state.products, {...state.filters});
	  },
	  clearFilters(state) {
		state.filters = {
		  brand: [],
		  model: [],
		  name: 'null',
		};
		state.filteredProducts = state.products;
	  },
	},
  });
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchSortProductsStart,
  addFilter,
  removeFilter,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
