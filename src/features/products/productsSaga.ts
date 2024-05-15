import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from './productsSlice';

function* fetchProductsSaga(): Generator {
	try {
		const response: any = yield call(axios.get, 'https://5fc9346b2af77700165ae514.mockapi.io/products');
		yield put(fetchProductsSuccess(response.data as any));
	} catch (error) {
		yield put(fetchProductsFailure());
	}
}

export default function* productsSaga() {
	yield takeLatest(fetchProductsStart.type, fetchProductsSaga);
}
