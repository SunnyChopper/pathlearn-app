import {
	// 1. CRUD
	CREATE_TOPIC,
	READ_TOPIC,

	// 2. Directional
	TOPIC_DIRECTION,

	// 3. Status
	TOPIC_LOADING,
	TOPIC_SUCCESS,
	TOPIC_ERROR,

	// 4. Helper
	GET_TOPICS,
	GET_TOPICS_FOR_CATEGORY
} from '../types.js';

const initialState = {
	topics: [],
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
		case CREATE_TOPIC:
			const newTopics = state.topics;
			newTopics.push(action.payload);

			return {
				...state,
				topics: newTopics
			};
		case READ_TOPIC:
			return {
				...state,
				current_id: action.payload
			};
		// 2. Directional Actions
		case TOPIC_DIRECTION:
			return {
				...state,
				direction: action.payload
			};
		// 3. Status Actions
		case TOPIC_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case TOPIC_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case TOPIC_ERROR:
			return {
				...state,
				error: action.payload
			};
		// 4. Helper Actions
		case GET_TOPICS:
			return {
				...state,
				topics: action.payload
			};
		case GET_TOPICS_FOR_CATEGORY:
			const newTopics = state.topics;
			newTopics.concat(action.payload);
			return {
				...state,
				topics: newTopics
			}
		default:
			return state;
	}	
};