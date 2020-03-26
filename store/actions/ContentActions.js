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

export const createContent = (title, description, section_id, link, category) => {
	return (dispatch) => {
		const postVariables = {
			title: title,
			description: description,
			section_id: section_id,
			link: link,
			category: category
		};

		axios.post(app_uri + '/api/roadmaps/sections/content/create', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: CREATE_CONTENT, payload: response.data['content'] });

				dispatch({ type: CONTENT_DIRECTION, payload: 'create_content' });
				dispatch({ type: CONTENT_SUCCESS, payload: true });
				dispatch({ type: CONTENT_LOADING, payload: false });
			} else {
				dispatch({ type: CONTENT_ERROR, payload: response.data['error'] });
				dispatch({ type: CONTENT_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: CONTENT_ERROR, payload: error });
			dispatch({ type: CONTENT_LOADING, payload: false });
		});
	};
};

export const readContent = (content_id) => {
	return {
		type: READ_CONTENT,
		payload: content_id
	};
};

export const updateContent = (content_id, title, description, section_id, link, category) => {
	return (dispatch) => {
		const postVariables = {
			content_id: content_id,
			title: title,
			description: description,
			section_id: section_id,
			link: link,
			category: category
		};

		axios.post(app_uri + '/api/roadmaps/sections/content/update', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: UPDATE_CONTENT, payload: response.data['content'] });

				dispatch({ type: CONTENT_DIRECTION, payload: 'update_content' });
				dispatch({ type: CONTENT_SUCCESS, payload: true });
				dispatch({ type: CONTENT_LOADING, payload: false });
			} else {
				dispatch({ type: CONTENT_ERROR, payload: response.data['error'] });
				dispatch({ type: CONTENT_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: CONTENT_ERROR, payload: error });
			dispatch({ type: CONTENT_LOADING, payload: false });
		});
	};
};

export const deleteContent = (content_id) => {
	return (dispatch) => {
		const postVariables = {
			content_id: content_id
		};

		axios.post(app_uri + '/api/roadmaps/sections/content/delete', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: DELETE_CONTENT, payload: response.data['content'] });

				dispatch({ type: CONTENT_DIRECTION, payload: 'delete_content' });
				dispatch({ type: CONTENT_SUCCESS, payload: true });
				dispatch({ type: CONTENT_LOADING, payload: false });
			} else {
				dispatch({ type: CONTENT_ERROR, payload: response.data['error'] });
				dispatch({ type: CONTENT_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: CONTENT_ERROR, payload: error });
			dispatch({ type: CONTENT_LOADING, payload: false });
		});
	};
};

/* ----------------------- *\
|  2. Directional Actions   |
\* ----------------------- */

export const contentDirection = (direction) => {
	return {
		type: CONTENT_DIRECTION,
		payload: direction
	};
};

/* ----------------------- *\
|  3. Status Actions        |
\* ----------------------- */

export const contentLoading = (loading) => {
	return {
		type: CONTENT_LOADING,
		payload: loading
	};
};

export const contentSuccess = (success) => {
	return {
		type: CONTENT_SUCCESS,
		payload: success
	};
};

export const contentError = (error) => {
	return {
		type: CONTENT_ERROR,
		payload: error
	};
};

/* ----------------------- *\
|  4. Helper Actions        |
\* ----------------------- */

export const getContentForSection = (section_id) => {
	return (dispatch) => {
		axios.get(app_uri + '/api/roadmaps/sections/content/get?section_id=' + section_id).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_CONTENT_FOR_SECTION, payload: response.data['content'] });

				dispatch({ type: CONTENT_DIRECTION, payload: 'get_content_for_section' });
				dispatch({ type: CONTENT_SUCCESS, payload: true });
				dispatch({ type: CONTENT_LOADING, payload: false });
			} else {
				dispatch({ type: CONTENT_ERROR, payload: response.data['error'] });
				dispatch({ type: CONTENT_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: CONTENT_ERROR, payload: error });
			dispatch({ type: CONTENT_LOADING, payload: false });
		});
	};
};

export const getContentForRoadmap = (roadmap_id) => {
	return (dispatch) => {
		axios.get(app_uri + '/api/roadmaps/sections/content/get?roadmap_id=' + roadmap_id).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_CONTENT_FOR_SECTION, payload: response.data['content'] });

				dispatch({ type: CONTENT_DIRECTION, payload: 'get_content_for_roadmap' });
				dispatch({ type: CONTENT_SUCCESS, payload: true });
				dispatch({ type: CONTENT_LOADING, payload: false });
			} else {
				dispatch({ type: CONTENT_ERROR, payload: response.data['error'] });
				dispatch({ type: CONTENT_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: CONTENT_ERROR, payload: error });
			dispatch({ type: CONTENT_LOADING, payload: false });
		});
	};
};