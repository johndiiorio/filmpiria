import * as actions from './actions';

const initialState = {
	fetching: false,
	error: '',
	results: {},
};

export default function find(state = initialState, action) {
	switch (action.type) {
		case actions.FIND_PENDING:
			return {
				...state,
				fetching: true,
				error: '',
			};
		case actions.FIND_SUCCESS:
			return {
				...state,
				fetching: false,
				results: action.payload,
				error: '',
			};
		case actions.FIND_ERROR:
			return {
				...state,
				fetching: false,
				error: action.error,
			};
		default:
			return state;
	}
}