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

export const createRoadmap = (user_id, cover, title, description) => {
	return (dispatch) => {
		const postVariables = {
			user_id: user_id,
			cover: cover,
			title: title,
			description: description
		};

		axios.post(app_uri + '/api/roadmaps/create', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: CREATE_ROADMAP, payload: response.data['roadmap'] });

				dispatch({ type: ROADMAP_DIRECTION, payload: 'create_roadmap' });
				dispatch({ type: ROADMAP_SUCCESS, payload: true });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			} else {
				dispatch({ type: ROADMAP_ERROR, payload: response.data['error'] });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ROADMAP_ERROR, payload: error });
			dispatch({ type: ROADMAP_LOADING, payload: false });
		});
	};
};

export const readRoadmap = (roadmap_id) => {
	return {
		type: READ_ROADMAP,
		payload: roadmap_id
	};
};

export const updateRoadmap = (roadmap_id, cover, title, description) => {
	return (dispatch) => {
		const postVariables = {
			roadmap_id: roadmap_id,
			cover: cover,
			title: title,
			description: description
		};

		axios.post(app_uri + '/api/roadmaps/update', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: UPDATE_ROADMAP, payload: response.data['roadmap'] });

				dispatch({ type: ROADMAP_DIRECTION, payload: 'update_roadmap' });
				dispatch({ type: ROADMAP_SUCCESS, payload: true });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			} else {
				dispatch({ type: ROADMAP_ERROR, payload: response.data['error'] });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ROADMAP_ERROR, payload: error });
			dispatch({ type: ROADMAP_LOADING, payload: false });
		});
	};
};

export const deleteRoadmap = (roadmap_id) => {
	return (dispatch) => {
		const postVariables = {
			roadmap_id: roadmap_id
		};

		axios.post(app_uri + '/api/roadmaps/delete', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: DELETE_ROADMAP, payload: roadmap_id });

				dispatch({ type: ROADMAP_DIRECTION, payload: 'delete_roadmap' });
				dispatch({ type: ROADMAP_SUCCESS, payload: true });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			} else {
				dispatch({ type: ROADMAP_ERROR, payload: response.data['error'] });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ROADMAP_ERROR, payload: error });
			dispatch({ type: ROADMAP_LOADING, payload: false });
		});
	};
};

/* ----------------------- *\
|  2. Directional Actions   |
\* ----------------------- */

export const roadmapDirection = (direction) => {
	return {
		type: ROADMAP_DIRECTION,
		payload: direction
	};
};

/* ----------------------- *\
|  3. Status Actions        |
\* ----------------------- */

export const roadmapLoading = (loading) => {
	return {
		type: ROADMAP_LOADING,
		payload: loading
	};
};

export const roadmapSuccess = (success) => {
	return {
		type: ROADMAP_SUCCESS,
		payload: success
	};
};

export const roadmapError = (error) => {
	return {
		type: ROADMAP_ERROR,
		payload: error
	};
};

/* ----------------------- *\
|  4. Helper Actions        |
\* ----------------------- */

export const getRoadmaps = () => {
	return (dispatch) => {
		axios.get(app_uri + '/api/roadmaps/get').then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_ROADMAPS, payload: response.data['roadmaps'] });

				dispatch({ type: ROADMAP_DIRECTION, payload: 'get_roadmaps' });
				dispatch({ type: ROADMAP_SUCCESS, payload: true });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			} else {
				dispatch({ type: ROADMAP_ERROR, payload: response.data['error'] });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ROADMAP_ERROR, payload: error });
			dispatch({ type: ROADMAP_LOADING, payload: false });
		});
	};
};

export const getRoadmapsForCategory = (category_id) => {
	return (dispatch) => {
		axios.get(app_uri + '/api/roadmaps/get?category_id=' + category_id).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_ROADMAPS, payload: response.data['roadmaps'] });

				dispatch({ type: ROADMAP_DIRECTION, payload: 'get_roadmaps_for_category' });
				dispatch({ type: ROADMAP_SUCCESS, payload: true });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			} else {
				dispatch({ type: ROADMAP_ERROR, payload: response.data['error'] });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ROADMAP_ERROR, payload: error });
			dispatch({ type: ROADMAP_LOADING, payload: false });
		});
	};
};

export const getRoadmapsForTopic = (topic_id) => {
	return (dispatch) => {
		axios.get(app_uri + '/api/roadmaps/get?topic_id=' + topic_id).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_ROADMAPS, payload: response.data['roadmaps'] });

				dispatch({ type: ROADMAP_DIRECTION, payload: 'get_roadmaps_for_topic' });
				dispatch({ type: ROADMAP_SUCCESS, payload: true });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			} else {
				dispatch({ type: ROADMAP_ERROR, payload: response.data['error'] });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ROADMAP_ERROR, payload: error });
			dispatch({ type: ROADMAP_LOADING, payload: false });
		});
	};
};

export const getRoadmapsForUser = (user_id) => {
	return (dispatch) => {
		axios.get(app_uri + '/api/roadmaps/get?user_id=' + user_id).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_ROADMAPS, payload: response.data['roadmaps'] });

				dispatch({ type: ROADMAP_DIRECTION, payload: 'get_roadmaps_for_user' });
				dispatch({ type: ROADMAP_SUCCESS, payload: true });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			} else {
				dispatch({ type: ROADMAP_ERROR, payload: response.data['error'] });
				dispatch({ type: ROADMAP_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: ROADMAP_ERROR, payload: error });
			dispatch({ type: ROADMAP_LOADING, payload: false });
		});
	};
};