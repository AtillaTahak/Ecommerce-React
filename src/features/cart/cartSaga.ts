import { takeEvery, select } from 'redux-saga/effects';
import { addToCart, removeFromCart, updateQuantity } from './cartSlice';

function* syncCartWithLocalStorage(): Generator {
	const cartItems = yield select((state) => state.cart.items);
	localStorage.setItem('cart', JSON.stringify(cartItems));
}

export default function* cartSaga() {
  yield takeEvery([addToCart.type, removeFromCart.type, updateQuantity.type], syncCartWithLocalStorage);
}
