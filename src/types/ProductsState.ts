import { Product } from './Product';

export interface ProductsState {
	products: Product[];
	filteredProducts: Product[];
	loading: boolean;
	filters: {
	  brand: string[];
	  model: string[];
	  name: string;
	};
  }
