export const UPLOAD = 'UPLOAD';
export const UPLOAD_PENDING = 'UPLOAD_PENDING';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_ERROR = 'UPLOAD_ERROR';
export const FIND = 'FIND';
export const FIND_PENDING = 'FIND_PENDING';
export const FIND_SUCCESS = 'FIND_SUCCESS';
export const FIND_ERROR = 'FIND_ERROR';

export const upload = (payload, history) => ({
	type: UPLOAD,
	payload,
	history,
});

export const uploadPending = () => ({
	type: UPLOAD_PENDING,
});

export const uploadSuccess = payload => ({
	type: UPLOAD_SUCCESS,
	payload,
});

export const uploadError = error => ({
	type: UPLOAD_ERROR,
	error,
});

export const find = (payload, history) => ({
	type: FIND,
	payload,
	history,
});

export const findPending = () => ({
	type: FIND_PENDING,
});

export const findSuccess = payload => ({
	type: FIND_SUCCESS,
	payload,
});

export const findError = error => ({
	type: FIND_ERROR,
	error,
});
