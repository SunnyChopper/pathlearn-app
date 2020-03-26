import {
	// 1. CRUD
	CREATE_ENROLLMENT,
	DELETE_ENROLLMENT,

	// 2. Directional
	ENROLLMENT_DIRECTION,

	// 3. Status
	ENROLLMENT_LOADING,
	ENROLLMENT_SUCCESS,
	ENROLLMENT_ERROR,

	// 4. Helper
	GET_ENROLLMENTS,
	GET_ENROLLMENTS_FOR_USER,
	GET_ENROLLMENTS_FOR_ROADMAP
} from '../types.js';

const initialState = {
	enrollments: [],
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
		case CREATE_ENROLLMENT:
			const newEnrollments = state.enrollments;
			newEnrollments.push(action.payload);

			return {
				...state,
				enrollments: newEnrollments
			};
		case DELETE_ENROLLMENT:
			const newEnrollments = [];
			const oldEnrollments = state.enrollment;

			oldEnrollments.forEach((enrollment) => {
				if (enrollment['id'] != action.payload) {
					newEnrollments.push(enrollment);
				}
			});

			return {
				...state,
				enrollment: newEnrollments
			};
		// 2. Directional Actions
		case ENROLLMENT_DIRECTION:
			return {
				...state,
				direction: action.payload
			};
		// 3. Status Actions
		case ENROLLMENT_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case ENROLLMENT_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case ENROLLMENT_ERROR:
			return {
				...state,
				error: action.payload
			};
		// 4. Helper Actions
		case GET_ENROLLMENTS:
			return {
				...state,
				enrollments: action.payload
			};
		case GET_ENROLLMENTS_FOR_USER:
			return {
				...state,
				enrollments: action.payload
			};
		case GET_ENROLLMENTS_FOR_ROADMAP:
			return {
				...state,
				enrollments: action.payload
			};
		default:
			return state;
	}	
};