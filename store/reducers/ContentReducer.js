import {
	// 1. CRUD
	CREATE_CONTENT,
	READ_CONTENT,
	UPDATE_CONTENT,
	DELETE_CONTENT,

	// 2. Directional
	CONTENT_DIRECTION,

	// 3. Status
	CONTENT_LOADING,
	CONTENT_SUCCESS,
	CONTENT_ERROR,

	// 4. Helper
	GET_CONTENT_FOR_SECTION,
	GET_CONTENT_FOR_ROADMAP
} from '../types.js';

const initialState = {
	contents: [],
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
		case CREATE_CONTENT:
			var newContent = state.contents;
			newContent.push(action.payload);

			return {
				...state,
				contents: newContent
			};
		case READ_CONTENT:
			return {
				...state,
				current_id: action.payload
			};
		case UPDATE_CONTENT:
			var updateContent = state.contents;
			updateContent.forEach((content) => {
				if (content['id'] == action.payload['id']) {
					content = action.payload;
				}
			});

			return {
				...state,
				contents: updateContent
			};
		case DELETE_CONTENT:
			var newContent = [];
			var oldContent = state.contents;

			oldContent.forEach((content) => {
				if (content['id'] != action.payload) {
					newSections.push(content);
				}
			});

			return {
				...state,
				contents: newContent
			};
		// 2. Directional Actions
		case CONTENT_DIRECTION:
			return {
				...state,
				direction: action.payload
			};
		// 3. Status Actions
		case CONTENT_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case CONTENT_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case CONTENT_ERROR:
			return {
				...state,
				error: action.payload
			};
		// 4. Helper Actions
		case GET_CONTENT_FOR_SECTION:
			return {
				...state,
				contents: action.payload
			};
		case GET_CONTENT_FOR_ROADMAP:
			return {
				...state,
				contents: action.payload
			}
		default:
			return state;
	}	
};