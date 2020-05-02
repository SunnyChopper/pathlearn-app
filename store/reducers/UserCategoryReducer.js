import {
	// 1. CRUD
	CREATE_USER_CATEGORIES,

	// 2. Directional
	USER_CATEGORIES_DIRECTION,

	// 3. Status
	USER_CATEGORIES_LOADING,
	USER_CATEGORIES_SUCCESS,
	USER_CATEGORIES_ERROR,

	// 4. Helper
	GET_USER_CATEGORIES
} from '../types.js';

const initialState = {
	categories: [],
	current_id: 0,
	direction: '',
	loading: false,
	success: false,
	error: ''
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
		case CREATE_USER_CATEGORIES:
			return {
				...state,
				categories: action.payload
			};
		// 2. Directional Actions
		case USER_CATEGORIES_DIRECTION:
			return {
				...state,
				direction: action.payload
			};
		// 3. Status Actions
		case USER_CATEGORIES_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case USER_CATEGORIES_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case USER_CATEGORIES_ERROR:
			return {
				...state,
				error: action.payload
			};
		// 4. Helper Actions
		case GET_USER_CATEGORIES:
			return {
				...state,
				categories: action.payload
			};
		default:
			return state;
	}	
};