import {
	// 1. CRUD
	CREATE_USER,
	UPDATE_USER,
	DELETE_USER,

	// 2. Directional
	USER_DIRECTION,

	// 3. Status
	USER_LOADING,
	USER_SUCCESS,
	USER_ERROR,

	// 4. Helper
	LOGIN_USER,
	IS_LOGGED_IN,
	SET_USER,
	LOGOUT_USER,
	INITIAL_CATEGORIES
} from '../types.js';

const initialState = {
	user: [],
	current_id: 0,
	direction: '',
	loading: false,
	success: false,
	error: '',
	logged_in: false,
	initial_categories: false
};

/* ----------------------- *\
|  Reducer File             |
|---------------------------|
|  1. CRUD Actions          |
|  2. Directional Actions   |
|  3. Status Actions        |
|  4. Helper Actions        |
\* ----------------------- */

export default (state = initialState, action) => {
	switch(action.type) {
		// 1. CRUD Actions
		case CREATE_USER:
			return {
				...state,
				user: action.payload,
				current_id: action.payload['id'],
				logged_in: true,
				initial_categories: false
			};
		case UPDATE_USER:
			return {
				...state,
				user: action.payload
			};
		case DELETE_USER:
			return {
				...state,
				user: [],
				current_id: 0,
				logged_in: false
			};
		// 2. Directional Actions
		case USER_DIRECTION:
			return {
				...state,
				direction: action.payload
			};
		// 3. Status Actions
		case USER_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case USER_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case USER_ERROR:
			return {
				...state,
				error: action.payload
			};
		// 4. Helper Actions
		case LOGIN_USER:
			var initial_categories = false;
			if (action.payload['initial_categories'] == 1) {
				initial_categories = true;
			}

			return {
				...state,
				user: action.payload,
				current_id: action.payload['id'],
				logged_in: true,
				initial_categories: initial_categories
			};
		case IS_LOGGED_IN:
			return {
				...state,
				logged_in: action.payload
			};
		case SET_USER:
			var initial_categories = false;
			if (action.payload['initial_categories'] == 1) {
				initial_categories = true;
			}

			return {
				...state,
				user: action.payload,
				current_id: action.payload['id']
			};
		case LOGOUT_USER:
			return {
				...state,
				logged_in: false,
				user: []
			};
		case INITIAL_CATEGORIES:
			return {
				...state,
				initial_categories: action.payload
			};
		default:
			return state;
	}	
};