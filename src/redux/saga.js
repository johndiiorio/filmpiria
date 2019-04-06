import { put, call, takeLatest, all } from 'redux-saga/effects'
import { FIND, findPending, findError, findSuccess } from './actions';

export function* find({ payload }) {
	yield put(findPending());
	try {
		const response = yield call(fetch, '/api/find', {
			method: 'POST',
			body: JSON.stringify(payload),
		});
		if (!response.ok) {
			throw response;
		}
		yield put(findSuccess(response.body()));
	} catch (err) {
		yield put(findError());
	}
}

export default function* rootSaga() {
	yield all([
		yield takeLatest(FIND, find)
	])
}