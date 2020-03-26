import {
	// 1. CRUD
	READ_CATEGORY,

	// 2. Directional
	CATEGORY_DIRECTION,

	// 3. Status
	CATEGORY_LOADING,
	CATEGORY_SUCCESS,
	CATEGORY_ERROR,

	// 4. Helper
	GET_CATEGORIES
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
		case READ_CATEGORY:
			return {
				...state,
				current_id: action.payload
			};
		// 2. Directional Actions
		case CATEGORY_DIRECTION:
			return {
				...state,
				direction: action.payload
			};
		// 3. Status Actions
		case CATEGORY_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case CATEGORY_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case CATEGORY_ERROR:
			return {
				...state,
				error: action.payload
			};
		// 4. Helper Actions
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload
			};
		default:
			return state;
	}	
};