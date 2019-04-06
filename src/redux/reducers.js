import * as actions from './actions';

const initialState = {
	fetching: false,
	error: false,
	results: {},
};

export default function find(state = initialState, action) {
	switch (action.type) {
		case actions.FIND_PENDING:
			return {
				...state,
				fetching: true,
			};
		case actions.FIND_SUCCESS:
			return {
				...state,
				fetching: false,
				results: action.payload,
			};
		case actions.FIND_ERROR:
			return {
				...state,
				fetching: false,
			};
		default:
			return state;
	}
}