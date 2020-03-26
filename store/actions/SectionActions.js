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

export const createSection = (roadmap_id, title) => {
	return (dispatch) => {
		const postVariables = {
			roadmap_id: roadmap_id,
			title: title
		};

		axios.post(app_uri + '/api/roadmaps/sections/create', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: CREATE_SECTION, payload: response.data['section'] });

				dispatch({ type: SECTION_DIRECTION, payload: 'create_section' });
				dispatch({ type: SECTION_SUCCESS, payload: true });
				dispatch({ type: SECTION_LOADING, payload: false });
			} else {
				dispatch({ type: SECTION_ERROR, payload: response.data['error'] });
				dispatch({ type: SECTION_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: SECTION_ERROR, payload: error });
			dispatch({ type: SECTION_LOADING, payload: false });
		});
	};
};

export const readSection = (section_id) => {
	return {
		type: READ_SECTION,
		payload: section_id
	};
};

export const updateSection = (section_id, title) => {
	return (dispatch) => {
		const postVariables = {
			section_id: section_id,
			title: title
		};

		axios.post(app_uri + '/api/roadmaps/sections/update', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: UPDATE_SECTION, payload: response.data['section'] });

				dispatch({ type: SECTION_DIRECTION, payload: 'update_section' });
				dispatch({ type: SECTION_SUCCESS, payload: true });
				dispatch({ type: SECTION_LOADING, payload: false });
			} else {
				dispatch({ type: SECTION_ERROR, payload: response.data['error'] });
				dispatch({ type: SECTION_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: SECTION_ERROR, payload: error });
			dispatch({ type: SECTION_LOADING, payload: false });
		});
	};
};

export const deleteSection = (section_id) => {
	return (dispatch) => {
		const postVariables = {
			section_id: section_id
		};

		axios.post(app_uri + '/api/roadmaps/sections/delete', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: DELETE_SECTION, payload: section_id });

				dispatch({ type: SECTION_DIRECTION, payload: 'delete_section' });
				dispatch({ type: SECTION_SUCCESS, payload: true });
				dispatch({ type: SECTION_LOADING, payload: false });
			} else {
				dispatch({ type: SECTION_ERROR, payload: response.data['error'] });
				dispatch({ type: SECTION_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: SECTION_ERROR, payload: error });
			dispatch({ type: SECTION_LOADING, payload: false });
		});
	};
};

/* ----------------------- *\
|  2. Directional Actions   |
\* ----------------------- */

export const sectionDirection = (direction) => {
	return {
		type: SECTION_DIRECTION,
		payload: direction
	};
};

/* ----------------------- *\
|  3. Status Actions        |
\* ----------------------- */

export const sectionLoading = (loading) => {
	return {
		type: SECTION_LOADING,
		payload: loading
	};
};

export const sectionSuccess = (success) => {
	return {
		type: SECTION_SUCCESS,
		payload: success
	};
};

export const sectionError = (error) => {
	return {
		type: SECTION_ERROR,
		payload: error
	};
};

/* ----------------------- *\
|  4. Helper Actions        |
\* ----------------------- */

export const getSectionsForRoadmap = (roadmap_id) => {
	return (dispatch) => {
		axios.get(app_uri + '/api/roadmaps/sections/get?roadmap_id=' + roadmap_id).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_SECTIONS_FOR_ROADMAP, payload: section_id });

				dispatch({ type: SECTION_DIRECTION, payload: 'get_sections_for_roadmap' });
				dispatch({ type: SECTION_SUCCESS, payload: true });
				dispatch({ type: SECTION_LOADING, payload: false });
			} else {
				dispatch({ type: SECTION_ERROR, payload: response.data['error'] });
				dispatch({ type: SECTION_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: SECTION_ERROR, payload: error });
			dispatch({ type: SECTION_LOADING, payload: false });
		});
	};
};