import { all } from 'redux-saga/effects';
import cartSaga from '../features/cart/cartSaga.ts';
import productsSaga from '../features/products/productsSaga.ts';

export default function* rootSaga() {
  yield all([cartSaga(), productsSaga()]);
}
