import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import CartSummary from '../../components/CartSummary';
import '@testing-library/jest-dom'

describe('CartSummary Component', () => {
  it('renders empty cart message when no items are present', () => {
    render(
      <Provider store={store}>
        <CartSummary />
      </Provider>
    );
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });

  it('renders cart items and total amount correctly', () => {
    store.dispatch({
      type: 'cart/addToCart',
      payload: { id: '1', name: 'Product 1', price: 10, quantity: 2 },
    });

    render(
      <Provider store={store}>
        <CartSummary />
      </Provider>
    );

    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$20.00/i)).toBeInTheDocument();
  });
});
