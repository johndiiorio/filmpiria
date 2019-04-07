export const FIND = 'FIND';
export const FIND_PENDING = 'FIND_PENDING';
export const FIND_SUCCESS = 'FIND_SUCCESS';
export const FIND_ERROR = 'FIND_ERROR';

export const find = payload => ({
	type: FIND,
	payload,
});

export const findPending = () => ({
	type: FIND_PENDING,
});

export const findSuccess = payload => ({
	type: FIND_SUCCESS,
	payload,
});

export const findError = () => ({
	type: FIND_ERROR,
});