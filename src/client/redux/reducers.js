import * as actions from './actions';

const initialState = {
	uploadFetching: false,
	uploadError: '',
	findFetching: false,
	findError: '',
	results: null,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actions.UPLOAD_PENDING:
			return {
				...state,
				uploadFetching: true,
				uploadError: '',
			};
		case actions.UPLOAD_SUCCESS:
			return {
				...state,
				uploadFetching: false,
				uploadError: '',
				results: action.payload,
			};
		case actions.UPLOAD_ERROR:
			return {
				...state,
				uploadFetching: false,
				uploadError: action.error,
			};
		case actions.FIND_PENDING:
			return {
				...state,
				findFetching: true,
				findError: '',
			};
		case actions.FIND_SUCCESS:
			return {
				...state,
				findFetching: false,
				findError: '',
				results: action.payload,
			};
		case actions.FIND_ERROR:
			return {
				...state,
				findFetching: false,
				findError: action.error,
			};
		default:
			return state;
	}
}