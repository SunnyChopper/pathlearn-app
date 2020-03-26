import {
	// 1. CRUD
	CREATE_ROADMAP,
	READ_ROADMAP,
	UPDATE_ROADMAP,
	DELETE_ROADMAP,

	// 2. Directional
	ROADMAP_DIRECTION,

	// 3. Status
	ROADMAP_LOADING,
	ROADMAP_SUCCESS,
	ROADMAP_ERROR,

	// 4. Helper
	GET_ROADMAPS,
	GET_ROADMAPS_FOR_CATEGORY,
	GET_ROADMAPS_FOR_TOPIC,
	GET_ROADMAPS_FOR_USER
} from '../types.js';

const initialState = {
	roadmaps: [],
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
		case CREATE_ROADMAP:
			const newRoadmaps = state.roadmaps;
			newRoadmaps.push(action.payload);

			return {
				...state,
				roadmaps: newRoadmaps
			};
		case READ_ROADMAP:
			return {
				...state,
				current_id: action.payload
			};
		case UPDATE_ROADMAP:
			const newRoadmaps = state.roadmaps;
			newRoadmaps.forEach((roadmap) => {
				if (roadmap['id'] == action.payload['id']) {
					roadmap = action.payload;
				}
			});

			return {
				...state,
				roadmaps: newRoadmaps
			};
		case DELETE_ROADMAP:
			const newRoadmaps = [];
			const oldRoadmaps = state.roadmaps;

			oldRoadmaps.forEach((roadmap) => {
				if (roadmap['id'] != action.payload) {
					newRoadmaps.push(roadmap);
				}
			});

			return {
				...state,
				roadmaps: newRoadmaps
			};
		// 2. Directional Actions
		case ROADMAP_DIRECTION:
			return {
				...state,
				direction: action.payload
			};
		// 3. Status Actions
		case ROADMAP_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case ROADMAP_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case ROADMAP_ERROR:
			return {
				...state,
				error: action.payload
			};
		// 4. Helper Actions
		case GET_ROADMAPS:
			return {
				...state,
				roadmaps: action.payload
			};
		case GET_ROADMAPS_FOR_CATEGORY:
			const newRoadmaps = state.roadmaps;
			newRoadmaps.concat(action.payload);

			return {
				...state,
				roadmaps: newRoadmaps
			};
		case GET_ROADMAPS_FOR_TOPIC:
			const newRoadmaps = state.roadmaps;
			newRoadmaps.concat(action.payload);

			return {
				...state,
				roadmaps: newRoadmaps
			};
		case GET_TOPICS_FOR_USER:
			const newRoadmaps = state.roadmaps;
			newRoadmaps.concat(action.payload);

			return {
				...state,
				roadmaps: newRoadmaps
			}
		default:
			return state;
	}	
};