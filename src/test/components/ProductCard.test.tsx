import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ProductCard from '../../components/ProductCard';
import { MemoryRouter } from 'react-router-dom';

const product = {
  id: '1',
  name: 'Product 1',
  price: 100,
  image: 'https://via.placeholder.com/150',
  description: 'Product 1 description',
  brand: 'Brand 1',
  model: 'Model 1',
  createdAt: '2022-01-01',
};

describe('ProductCard Component', () => {
  beforeEach(() => {
    store.dispatch({ type: 'cart/reset' });
  });

  it('renders product card', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={product} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Product 1/i)).not.toBeNull();
    expect(screen.getByText(/100 ₺/i)).not.toBeNull();
    expect(screen.getByRole('img', { name: /Product 1/i })).not.toBeNull();
    expect(screen.getByRole('img', { name: /Product 1/i }).getAttribute('src')).toBe('https://via.placeholder.com/150');
  });

  it('adds product to cart when "Add to Cart" is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={product} />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));

    const cartItems = store.getState().cart.items;
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].name).toBe('Product 1');
  });

  it('navigates to product detail page when the image is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={product} />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('img', { name: /Product 1/i }));

  });
});
