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

import { app_uri } from '../../constants/env.js';
import axios from 'axios';

/* ----------------------- *\
|  Action File              |
|---------------------------|
|  1. CRUD Actions          |
|  2. Directional Actions   |
|  3. Status Actions        |
|  4. Helper Actions        |
\* ----------------------- */

/* ----------------------- *\
|  1. CRUD Actions          |
\* ----------------------- */

export const createEnrollment = (user_id, roadmap_id) => {
	return (dispatch) => {
		const postVariables = {
			user_id: user_id,
			roadmap_id: roadmap_id
		};

		axios.post(app_uri + '/api/roadmaps/enrollments/create', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: CREATE_ENROLLMENT, payload: response.data['enrollment'] });

				dispatch({ type: ENROLLMENT_DIRECTION, payload: 'create_enrollment' });
				dispatch({ type: ENROLLMENT_SUCCESS, payload: true });
				dispatch({ type: ENROLLMENT_LOADING, payload: false });
			} else {
				dispatch({ type: ENROLLMENT_ERROR, payload: repsonse.data['error'] });
				dispatch({ type: ENROLLMENT_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ENROLLMENT_ERROR, payload: error });
			dispatch({ type: ENROLLMENT_LOADING, payload: false });
		});
	};
};

export const deleteEnrollment = (enrollment_id) => {
	return (dispatch) => {
		const postVariables = {
			enrollment_id: enrollment_id
		};

		axios.post(app_uri + '/api/roadmaps/enrollments/delete', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: DELETE_ENROLLMENT, payload: enrollment_id });

				dispatch({ type: ENROLLMENT_DIRECTION, payload: 'delete_enrollment' });
				dispatch({ type: ENROLLMENT_SUCCESS, payload: true });
				dispatch({ type: ENROLLMENT_LOADING, payload: false });
			} else {
				dispatch({ type: ENROLLMENT_ERROR, payload: repsonse.data['error'] });
				dispatch({ type: ENROLLMENT_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ENROLLMENT_ERROR, payload: error });
			dispatch({ type: ENROLLMENT_LOADING, payload: false });
		});
	};
};

/* ----------------------- *\
|  2. Directional Actions   |
\* ----------------------- */

export const enrollmentDirection = (direction) => {
	return {
		type: ENROLLMENT_DIRECTION,
		payload: direction
	};
};

/* ----------------------- *\
|  3. Status Actions        |
\* ----------------------- */

export const enrollmentLoading = (loading) => {
	return {
		type: ENROLLMENT_LOADING,
		payload: loading
	};
};

export const enrollmentSuccess = (success) => {
	return {
		type: ENROLLMENT_SUCCESS,
		payload: success
	};
};

export const enrollmentError = (error) => {
	return {
		type: ENROLLMENT_ERROR,
		payload: error
	};
};

/* ----------------------- *\
|  4. Helper Actions        |
\* ----------------------- */

export const getEnrollments = () => {
	return (dispatch) => {
		axios.get(app_uri + '/api/roadmaps/enrollments/get').then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_ENROLLMENTS, payload: response.data['enrollments'] });

				dispatch({ type: ENROLLMENT_DIRECTION, payload: 'get_enrollments' });
				dispatch({ type: ENROLLMENT_SUCCESS, payload: true });
				dispatch({ type: ENROLLMENT_LOADING, payload: false });
			} else {
				dispatch({ type: ENROLLMENT_ERROR, payload: response.data['error'] });
				dispatch({ type: ENROLLMENT_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ENROLLMENT_ERROR, payload: error });
			dispatch({ type: ENROLLMENT_LOADING, payload: false });
		});
	};
};

export const getEnrollmentsForUser = (user_id) => {
	return (dispatch) => {
		axios.get(app_uri + '/api/roadmaps/enrollments/get?user_id=' + user_id).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_ENROLLMENTS, payload: response.data['enrollments'] });

				dispatch({ type: ENROLLMENT_DIRECTION, payload: 'get_enrollments_for_user' });
				dispatch({ type: ENROLLMENT_SUCCESS, payload: true });
				dispatch({ type: ENROLLMENT_LOADING, payload: false });
			} else {
				dispatch({ type: ENROLLMENT_ERROR, payload: response.data['error'] });
				dispatch({ type: ENROLLMENT_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ENROLLMENT_ERROR, payload: error });
			dispatch({ type: ENROLLMENT_LOADING, payload: false });
		});
	};
};

export const getEnrollmentsForRoadmap = (roadmap_id) => {
	return (dispatch) => {
		axios.get(app_uri + '/api/roadmaps/enrollments/get?roadmap_id=' + roadmap_id).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_ENROLLMENTS, payload: response.data['enrollments'] });

				dispatch({ type: ENROLLMENT_DIRECTION, payload: 'get_enrollments_for_roadmap' });
				dispatch({ type: ENROLLMENT_SUCCESS, payload: true });
				dispatch({ type: ENROLLMENT_LOADING, payload: false });
			} else {
				dispatch({ type: ENROLLMENT_ERROR, payload: response.data['error'] });
				dispatch({ type: ENROLLMENT_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ENROLLMENT_ERROR, payload: error });
			dispatch({ type: ENROLLMENT_LOADING, payload: false });
		});
	};
};