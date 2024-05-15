import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5fc9346b2af77700165ae514.mockapi.io',
});

export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id: string) => api.get(`/products/${id}`);
