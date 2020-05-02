import {
	// 1. CRUD
	CREATE_SECTION,
	READ_SECTION,
	UPDATE_SECTION,
	DELETE_SECTION,

	// 2. Directional
	SECTION_DIRECTION,

	// 3. Status
	SECTION_LOADING,
	SECTION_SUCCESS,
	SECTION_ERROR,

	// 4. Helper
	GET_SECTIONS_FOR_ROADMAP
} from '../types.js';

const initialState = {
	sections: [],
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
		case CREATE_SECTION:
			var newSections = state.sections;
			newSections.push(action.payload);

			return {
				...state,
				sections: newSections
			};
		case READ_SECTION:
			return {
				...state,
				current_id: action.payload
			};
		case UPDATE_SECTION:
			var newSections = state.sections;
			newSections.forEach((section) => {
				if (section['id'] == action.payload['id']) {
					section = action.payload;
				}
			});

			return {
				...state,
				sections: newSections
			};
		case DELETE_SECTION:
			var newSections = [];
			var oldSections = state.sections;

			oldSections.forEach((section) => {
				if (section['id'] != action.payload) {
					newSections.push(section);
				}
			});

			return {
				...state,
				sections: newSections
			};
		// 2. Directional Actions
		case SECTION_DIRECTION:
			return {
				...state,
				direction: action.payload
			};
		// 3. Status Actions
		case SECTION_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case SECTION_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case SECTION_ERROR:
			return {
				...state,
				error: action.payload
			};
		// 4. Helper Actions
		case GET_SECTIONS_FOR_ROADMAP:
			return {
				...state,
				sections: action.payload
			};
		default:
			return state;
	}	
};