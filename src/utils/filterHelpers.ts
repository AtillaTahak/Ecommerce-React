import { Product, Filters } from '../types';

export const filterProducts = (products: Product[], filters: Filters): Product[] => {
  return products.filter(product => {
    const brandMatch = filters.brand.length === 0 || filters.brand.includes(product.brand);
    const modelMatch = filters.model.length === 0 || filters.model.includes(product.model);
	const nameMatch = filters.name === '' || product.name.toLowerCase().includes(filters.name.toLowerCase());

    return brandMatch && modelMatch && nameMatch;
  });
};
