import { put, call, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios';
import {
	FIND,
	findPending,
	findError,
	findSuccess,
	UPLOAD,
	uploadPending,
	uploadError,
	uploadSuccess,
 } from './actions';

export function* upload({ payload, history }) {
	yield put(uploadPending());
	try {
		const response = yield call(axios.post, '/api/upload', payload);
		yield put(uploadSuccess(response.data));
		history.push('/results');
	} catch (err) {
		const errorMessage = err.response && err.response.data ? err.response.data : 'Unknown Error';
		yield put(uploadError(errorMessage));
	}
}

export function* find({ payload, history }) {
	yield put(findPending());
	try {
		const response = yield call(axios.post, '/api/find', payload);
		yield put(findSuccess(response.data));
		history.push('/results');
	} catch (err) {
		const errorMessage = err.response && err.response.data ? err.response.data : 'Unknown Error';
		yield put(findError(errorMessage));
	}
}

export default function* rootSaga() {
	yield all([
		yield takeLatest(UPLOAD, upload),
		yield takeLatest(FIND, find)
	])
}